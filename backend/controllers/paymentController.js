const paypal = require("@paypal/checkout-server-sdk");

// PayPal Environment
const environment =
  new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  );

// PayPal Client
const client =
  new paypal.core.PayPalHttpClient(
    environment
  );

exports.createOrder =
async (req, res) => {

  try {

    const {
      total
    } = req.body;

    const exchangeRate = 130;

    const usdAmount = (Number(total) /exchangeRate)
    .toFixed(2);

    const request =
      new paypal.orders.OrdersCreateRequest();

    request.prefer("return=representation");

    request.requestBody({

      intent: "CAPTURE",

      purchase_units: [

        {
          amount: {
            currency_code: "USD",
            value: usdAmount
          }
        }

      ]

    });

    const order =
      await client.execute(request);

    res.json(order.result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Failed to create PayPal order"
    });

  }

};

exports.captureOrder = async (req, res) => {

  try {

    const { orderID } = req.body;

    const request =
      new paypal.orders.OrdersCaptureRequest(orderID);

    request.requestBody({});

    const capture =
      await client.execute(request);

    res.json(capture.result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to capture payment"
    });

  }

};