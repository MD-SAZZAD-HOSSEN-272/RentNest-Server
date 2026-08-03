import { prisma } from "../../lib/prisma";
const createPayment = async (tenantId, payload) => {
    const { rentalRequestId, amount, provider } = payload;
    const transactionId = `txn_${Date.now()}`;
    const rentalRequest = await prisma.rentalRequest.findUnique({
        where: { id: rentalRequestId },
        include: { property: true, payment: true }
    });
    if (!rentalRequest) {
        throw new Error("Rental request not found");
    }
    if (rentalRequest.tenantId !== tenantId) {
        throw new Error("You are not allowed to pay for this rental request");
    }
    if (rentalRequest.payment?.status === "COMPLETED") {
        throw new Error("This rental request has already been paid for");
    }
    const paymentData = {
        store_id: process.env.SSL_COMMERZ_STORE_ID,
        store_passwd: process.env.SSL_COMMERZ_STORE_PASSWORD,
        total_amount: amount,
        currency: 'BDT',
        tran_id: transactionId, // use unique tran_id for each api call
        success_url: 'http://localhost:5000/api/v1/payments/confirm',
        fail_url: 'http://localhost:5000/api/v1/payments/fail',
        cancel_url: 'http://localhost:5000/api/v1/payments/cancel',
        ipn_url: 'http://localhost:5000/api/v1/payments/ipn',
        shipping_method: 'Courier',
        product_profile: 'general',
        cus_name: 'John Doe',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'John Doe',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const formData = new URLSearchParams();
    Object.entries(paymentData).forEach(([key, value]) => {
        formData.append(key, String(value));
    });
    const paymentInitiationResponse = await fetch('https://sandbox.sslcommerz.com/gwprocess/v4/api.php', {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
    });
    const paymentResult = await paymentInitiationResponse.json();
    const gatewayPageURL = paymentResult?.GatewayPageURL;
    console.log("Payment initiation response:", gatewayPageURL);
    if (paymentResult.status !== 'SUCCESS') {
        throw new Error('Payment initiation failed');
    }
    // A rental request can only ever have one Payment row (unique rentalRequestId).
    // If an earlier attempt was cancelled/failed, re-use that row for the retry
    // instead of trying to create a second one.
    const payment = rentalRequest.payment
        ? await prisma.payment.update({
            where: { rentalRequestId },
            data: {
                transactionId,
                amount,
                provider,
                status: "PENDING",
                paidAt: null,
                valId: null,
            },
        })
        : await prisma.payment.create({
            data: {
                transactionId,
                rentalRequestId,
                amount,
                provider,
                status: "PENDING",
            },
        });
    return {
        payment,
        gatewayPageURL
    };
};
const confirmPayment = async (payload) => {
    console.log("Payment confirmation payload:", payload);
    const { tran_id, val_id } = payload;
    const payment = await prisma.payment.findUnique({
        where: { transactionId: tran_id },
    });
    if (!payment) {
        throw new Error("Payment not found");
    }
    return prisma.payment.update({
        where: { transactionId: tran_id },
        data: {
            status: "COMPLETED",
            paidAt: new Date(),
            valId: val_id
        }
    });
};
const failPayment = async (payload) => {
    const { tran_id } = payload;
    const payment = await prisma.payment.findUnique({
        where: { transactionId: tran_id },
    });
    if (!payment) {
        throw new Error("Payment not found");
    }
    return prisma.payment.update({
        where: { transactionId: tran_id },
        data: { status: "FAILED" },
    });
};
const cancelPayment = async (payload) => {
    const { tran_id } = payload;
    const payment = await prisma.payment.findUnique({
        where: { transactionId: tran_id },
    });
    if (!payment) {
        throw new Error("Payment not found");
    }
    return prisma.payment.update({
        where: { transactionId: tran_id },
        data: { status: "FAILED" },
    });
};
const getPayments = async (userId, role) => {
    if (role === "TENANT") {
        return prisma.payment.findMany({
            where: { rentalRequest: { tenantId: userId } },
            include: { rentalRequest: true }
        });
    }
    if (role === "LANDLORD") {
        return prisma.payment.findMany({
            where: { rentalRequest: { property: { landlordId: userId } } },
            include: { rentalRequest: true }
        });
    }
    return prisma.payment.findMany({
        include: { rentalRequest: true }
    });
};
const getPaymentById = async (paymentId, userId, role) => {
    const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: { rentalRequest: { include: { property: true } } }
    });
    if (!payment) {
        throw new Error("Payment not found");
    }
    if (role === "TENANT" && payment.rentalRequest.tenantId !== userId) {
        throw new Error("You are not allowed to access this payment");
    }
    if (role === "LANDLORD" && payment.rentalRequest.property.landlordId !== userId) {
        throw new Error("You are not allowed to access this payment");
    }
    return payment;
};
export const paymentsService = {
    createPayment,
    confirmPayment,
    failPayment,
    cancelPayment,
    getPayments,
    getPaymentById
};
//# sourceMappingURL=payments.service.js.map