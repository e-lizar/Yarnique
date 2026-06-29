const mongoose =
  require("mongoose");

const orderSchema =
  new mongoose.Schema(
    {
      customerId: {
        type:
          mongoose.Schema
            .Types
            .ObjectId,
        ref:
          "Customer",
        required: true
      },

      customerName:
      {
        type: String,
        required: true
      },

      email: {
        type: String,
        required: true
      },

      phone: {
        type: String,
        default: ""
      },

      items: [
        {
          productId:
          String,
          name:
          String,
          image:
          String,
          color:
          String,
          size:
          String,
          price:
          Number
        }
      ],

      total: {
        type: Number,
        required: true
      },

      paymentStatus:
      {
        type: String,
        default:
          "Paid"
      },

      deliveryStatus:
      {
        type: String,
        default:
          "Pending Contact"
      },

      status: {
        type: String,
        default:
          "Confirmed"
      }
    },
    {
      timestamps:
        true
    }
  );

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );