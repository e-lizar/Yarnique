const mongoose = require("mongoose");

const customOrderSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    itemType: {
      type: String
    },
    
    size: {
      type: String,
    },

    bust: {
      type:String,
    },

    waist:{
      type: String,
    },

    hips:{
      type: String,
    }, 

    topLength: {
      type: String,
    },

    topLengthInches: {
      type: String,
    },

    bottomLength:{
        type: String,
      },

      bottomLengthInches: {
        type: String,
    },

    colors: {
      type: String
    },

    description: {
      type: String
    },

    image: {
      type: String
    
    },
    
    status: {
      type: String,
      default: "Pending"
    },

    quotedPrice: {
  type: Number,
  default: 0
},

depositRequired: {
  type: Number,
  default: 0
},

depositPaid: {
  type: Boolean,
  default: false
},

transactionCode: {
  type: String,
  default: ""
      },

      balancePaid: {
        type: Boolean,
         default: false
      },

    createdAt:{
        type: Date,
        default: Date.now,
    },

  }
);

module.exports = mongoose.model(
  "CustomOrder",
  customOrderSchema
);