import { prisma } from "../../lib/prisma";
import { IProperties, IUpdateProperty } from "./properties.interface";

const getAllProperties = async (query: Record<string, unknown>) => {
  const location =
    typeof query.location === "string" ? query.location : undefined;
  const category =
    typeof query.category === "string" ? query.category : undefined;
  const minPrice =
    typeof query.minPrice === "string" ? Number(query.minPrice) : undefined;
  const maxPrice =
    typeof query.maxPrice === "string" ? Number(query.maxPrice) : undefined;

  const filters: any = {};

  if (location) {
    filters.location = {
      contains: location,
      mode: "insensitive",
    };
  }

  if (!Number.isNaN(minPrice) && minPrice !== undefined) {
    filters.price = {
      ...filters.price,
      gte: minPrice,
    };
  }

  if (!Number.isNaN(maxPrice) && maxPrice !== undefined) {
    filters.price = {
      ...filters.price,
      lte: maxPrice,
    };
  }

  

  if (category) {
    filters.category = {
      slug: category,
    };
  }

  console.log("Filters:", filters);

  return prisma.property.findMany({
    where: filters,
    include: {
      landlord: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      category: true,
    },
  });
};

const getPropertyById = async (propertyId: string) => {
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
    include: {
      landlord: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      category: true,
      rentals: true,
      reviews: true,
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  return property;
};

const createProperty = async (landlordId: string, payload: IProperties) => {
  const {
    title,
    description,
    location,
    price,
    bedrooms,
    bathrooms,
    amenities,
    images,
  } = payload;

  // Resolve category identifier: categoryId || categorySlug || categoryName || type
  let resolvedCategoryId = payload.categoryId;

  if (!resolvedCategoryId) {
    const { categorySlug, categoryName, type } = payload;
    let where: any = undefined;
    if (categorySlug) where = { slug: categorySlug };
    else if (categoryName) where = { name: categoryName };
    else if (type) where = { slug: type };

    if (where) {
      const category = await prisma.category.findFirst({ where });
      if (!category) throw new Error("Category not found for provided identifier");
      resolvedCategoryId = category.id;
    }
  }

  if (
    !title ||
    !description ||
    !location ||
    !price ||
    !bedrooms ||
    !bathrooms ||
    !resolvedCategoryId
  ) {
    throw new Error("Missing required property fields");
  }

  return prisma.property.create({
    data: {
      title,
      description,
      location,
      price,
      bedrooms,
      bathrooms,
      amenities,
      images,
      landlordId,
      categoryId: resolvedCategoryId,
    },
  });
};

const updateProperty = async (
  propertyId: string,
  landlordId: string,
  payload: IUpdateProperty,
) => {
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.landlordId !== landlordId) {
    throw new Error("You are not allowed to update this property");
  }

  return prisma.property.update({
    where: { id: propertyId },
    data: payload,
  });
};

const deleteProperty = async (propertyId: string, landlordId: string) => {
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.landlordId !== landlordId) {
    throw new Error("You are not allowed to delete this property");
  }

  const [rentalRequestCount, reviewCount] = await Promise.all([
    prisma.rentalRequest.count({ where: { propertyId } }),
    prisma.review.count({ where: { propertyId } }),
  ]);

  if (rentalRequestCount > 0 || reviewCount > 0) {
    throw new Error(
      "This property has rental request or review history and cannot be deleted. Mark it unavailable instead."
    );
  }

  await prisma.property.delete({
    where: { id: propertyId },
  });
};

export const propertiesService = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
