const mongoose = require("mongoose");

const productSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },

      category: {
        type: String,
        required: true
      },

      description: {
        type: String
      },

      images: [
        {
          type: String
        }
      ],

      colors: [
        {
          type: String
        }
      ],

      variants: [
        {
          color: String,

          sizes: [
            {
              size: String,
              price: Number,
              available: Boolean
            }
          ]
        }
      ],

      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  );

module.exports =
  mongoose.model(
    "Product",
    productSchema
  );