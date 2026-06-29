const axios = require("axios");
const moment = require("moment");
const getAccessToken = require("../utils/mpesaToken");
const Order = require("../models/Order");

exports.stkPush = async (req, res) => {
    console.log("🔥 STK PUSH ROUTE HIT");
  try {

    const { phone, amount } = req.body;

    const token = await getAccessToken();
    console.log("✅ Access Token:", token);

    const timestamp = moment().format("YYYYMMDDHHmmss");

    console.log("✅ Shortcode:", process.env.MPESA_SHORTCODE);
    console.log("✅ Passkey:", process.env.MPESA_PASSKEY);
    console.log("✅ Timestamp:", timestamp);

    const password = Buffer.from(
      process.env.MPESA_SHORTCODE +
      process.env.MPESA_PASSKEY +
      timestamp
    ).toString("base64");

    console.log("🚀 Sending STK request...");

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,

        Password: password,

        Timestamp: timestamp,

        TransactionType: "CustomerPayBillOnline",

        Amount: amount,

        PartyA: phone,

        PartyB: process.env.MPESA_SHORTCODE,

        PhoneNumber: phone,

        CallBackURL: process.env.MPESA_CALLBACK_URL,

        AccountReference: "Yarnique",

        TransactionDesc: "Crochet Purchase"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("✅ STK request completed");

    const {
  customerId,
  customerName,
  email,
  items,
  total
} = req.body;

console.log("Request Body:", req.body);

const newOrder = new Order({
  customerId,
  customerName,
  email,
  items,
  total,
  paymentStatus: "Paid",
  deliveryStatus: "Pending Contact",
  status: "Confirmed"
});

await newOrder.save();

console.log("✅ Order saved successfully");

    res.json(response.data);

  } catch (error) {

    console.log("========== ERROR ==========");
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);
    console.log("Message:", error.message);

    res.status(500).json({
      message: "STK Push Failed"
    });

  }
};