require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const CustomOrder = require("./models/CustomOrder");
const Admin = require("./models/Admin");
const Product = require("./models/Product");
const Customer = require("./models/Customer");
const Order = require("./models/Order");
const paymentRoutes = require("./routes/payment");
const mpesaRoutes = require("./routes/mpesaRoutes");

const multer = require("multer");
const path = require("path");

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected 🧶💖");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

app.use(cors());
app.use(express.json());
app.use("/payment",  paymentRoutes);
app.use("/mpesa", mpesaRoutes);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },

  family: 4
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage
});

app.use("/uploads", express.static("uploads"));

app.get("/",async (req, res) => {
  res.send("Yarnique Backend Running 🧶💖");
});

app.post("/admin-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({
      email
    });

   console.log("Admin object:", admin);
   console.log("Keys:", Object.keys(admin.toObject()));
   console.log("Admin as object:", admin.toObject());

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email"
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
     return res.status(401).json({
    success: false,
    message: "Invalid password"
   });
  }
     
    res.json({
      success: true,
      message: "Login successful"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

app.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      email,
      password
    } = req.body;

    // Check if email exists
    const existingCustomer =
      await Customer.findOne({
        email
      });

    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message:
          "Email already exists."
      });
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // Create customer
    const customer =
      new Customer({
        fullName,
        email,
        password:
          hashedPassword
      });

    await customer.save();

    res.json({
      success: true,
      message:
        "Account created successfully 🧶💖"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to create account"
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    const customer =
      await Customer.findOne({
        email
      });

    if (!customer) {
      return res.status(400).json({
        success: false,
        message:
          "Email not found."
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        customer.password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Incorrect password."
      });
    }

    res.json({
      success: true,
      message:
        "Login successful 🧶💖",
      customer: {
        id: customer._id,
        fullName:
          customer.fullName,
        email:
          customer.email
      }
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Login failed."
    });
  }
});

app.use((req, res, next) => {
  console.log(
    req.method,
    req.url
  );
  next();
});

app.patch(
  "/customers/:id",
  async (req, res) => {
    try {
      const customer =
        await Customer.findById(
          req.params.id
        );

      if (!customer) {
        return res.status(404).json({
          success: false,
          message:
            "Customer not found."
        });
      }

      customer.fullName =
        req.body.fullName;

      customer.email =
        req.body.email;

      if (
        req.body.newPassword
      ) {
        const isMatch =
          await bcrypt.compare(
            req.body.currentPassword,
            customer.password
          );

        if (!isMatch) {
          return res.status(400).json({
            success: false,
            message:
              "Current password is incorrect."
          });
        }

        const hashedPassword =
          await bcrypt.hash(
            req.body.newPassword,
            10
          );

        customer.password =
          hashedPassword;
      }

      await customer.save();

      res.json({
        success: true,
        message:
          "Profile updated 🧶💖",
        customer: {
          _id:
            customer._id,
          fullName:
            customer.fullName,
          email:
            customer.email
        }
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to update profile."
      });
    }
  }
);

app.post("/custom-order", upload.single("image"), async (req, res) => {
  try {

    const order = new CustomOrder({
      fullName: req.body.fullName,
      email: req.body.email,
      itemType: req.body.itemType,

      size: req.body.size,
      bust: req.body.bust,
      waist: req.body.waist,
      hips: req.body.hips,

      topLength: req.body.topLength,
      topLengthInches: req.body.topLengthInches,

      bottomLength: req.body.bottomLength,
      bottomLengthInches: req.body.bottomLengthInches,

      colors: req.body.colors,
      description: req.body.description,

      image: req.file ? req.file.filename : null
    });

    // Save first
    await order.save();

    // Try sending email
    try {

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: order.email,
        subject: "Yarnique Order Received 🧶💖",

        text: `
Hi ${order.fullName},

Thank you for choosing Yarnique!

We've received your custom order.

Item:
${order.itemType}

We'll contact you soon.

Love,
Yarnique 🧶💖
`
      });

      console.log("Email sent.");

    } catch(emailError){

      console.log("Email failed:");
      console.log(emailError.message);

    }

    // Always return success
    res.json({
      success:true,
      message:"Order submitted successfully."
    });

  } catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Failed to save order."
    });

  }
});

app.get("/custom-orders", async (req, res) => {
  try {
    const orders = await CustomOrder.find();

    res.json(orders);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch orders"
    });
  }
});

app.get(
  "/custom-orders/customer/:email",
  async (req, res) => {
    try {
      const orders =
        await CustomOrder.find({
          email:
            req.params.email
        });

      res.json(orders);

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch orders"
      });
    }
  }
);

app.patch("/custom-orders/:id", async (req, res) => {
  try {
    const updatedOrder =
      await CustomOrder.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status
        },
        {
          returnDocument:"after"
        }
      );

         if (
  updatedOrder.status ===
  "Completed"
) {
  const remaining =
    updatedOrder.quotedPrice -
    updatedOrder.depositRequired;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: updatedOrder.email,
    subject:
      "Your Yarnique Order is Ready 🧶💖",
    text: `
Hi ${updatedOrder.fullName},

Your custom order is now complete 🧶💖

Remaining Balance:
KSh ${remaining}

Please complete the remaining payment so we can arrange delivery or collection.

Thank you for choosing Yarnique 💖
`
  });
}

    res.json(updatedOrder);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update order"
    });
  }
});

app.patch(
  "/custom-orders/:id/quote",
  async (req, res) => {
    try {
      const {
        quotedPrice,
        depositRequired
      } = req.body;

      const order =
        await CustomOrder.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          message:
            "Order not found"
        });
      }

      order.quotedPrice =
        quotedPrice;

      order.depositRequired =
        depositRequired;

      order.status =
        "Quote Sent";

      await order.save();

      await transporter.sendMail({
        from:
          process.env.EMAIL_USER,
        to: order.email,
        subject:
          "Custom Order Quote 🧶💖",
        text: `
Hi ${order.fullName},

Thank you for choosing Yarnique 🧶💖

Your custom order has been reviewed.

Total Price:
KSh ${quotedPrice}

Deposit Required:
KSh ${depositRequired}

Please make the deposit payment and submit your transaction code.

Love,
Yarnique 🧶💖
`
      });

      res.json(order);

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to send quote"
      });
    }
  }
);

app.patch(
  "/custom-orders/:id/transaction",
  async (req, res) => {
    try {
      const order =
        await CustomOrder.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          message:
            "Order not found"
        });
      }

      order.transactionCode =
        req.body.transactionCode;

      order.status =
        "Deposit Verification";

      await order.save();

      res.json(order);

    } catch (error) {
      res.status(500).json({
        message:
          "Failed to submit transaction"
      });
    }
  }
);

app.patch(
  "/custom-orders/:id/approve-deposit",
  async (req, res) => {
    try {
      const order =
        await CustomOrder.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          message:
            "Order not found"
        });
      }

      order.depositPaid =
        true;

      order.status =
        "Deposit Paid";

      await order.save();

      await transporter.sendMail({
        from:
          process.env.EMAIL_USER,
        to: order.email,
        subject:
          "Deposit Approved 🧶💖",
        text: `
Hi ${order.fullName},

We've received your deposit.

Production of your custom item will begin shortly.

Love,
Yarnique 🧶💖
`
      });

      res.json(order);

    } catch (error) {
      res.status(500).json({
        message:
          "Failed to approve payment"
      });
    }
  }
);



app.delete(
  "/custom-orders/:id/customer",
  async (req, res) => {
    try {
      const order =
        await CustomOrder.findById(
          req.params.id
        );

      if (
        order.status !==
        "Pending"
      ) {
        return res
          .status(400)
          .json({
            message:
              "Order cannot be cancelled."
          });
      }

      await order.deleteOne();

      res.json({
        message:
          "Order cancelled."
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to cancel order"
      });
    }
  }
);

app.post(
  "/products",
  upload.array(
    "images",
    5
  ),
  async (req, res) => {
    try {
      const imageFiles =
        req.files.map(
          (file) =>
            file.filename
        );

      const product =
        new Product({
          name:
            req.body.name,

          category:
            req.body.category,

          description:
            req.body.description,

          colors:
            JSON.parse(
              req.body.colors
            ),

          variants:
            JSON.parse(
              req.body.variants
            ),

          images:
            imageFiles
        });

      await product.save();

      res.json({
        message:
          "Product saved",
        product
      });

    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({
          message:
            "Failed to save product"
        });
    }
  }
);

app.get(
  "/products",
  async (req, res) => {
    try {
      const products =
        await Product.find();

      res.json(products);

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch products"
      });
    }
  }
);

app.patch(
  "/products/:id",
  upload.array("images", 5),
  async (req, res) => {
    try {
      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      product.name =
        req.body.name;

      product.category =
        req.body.category;

      product.description =
        req.body.description;

      product.colors =
        JSON.parse(
          req.body.colors
        );

      product.variants =
        JSON.parse(
          req.body.variants
        );

      if (
        req.files &&
        req.files.length > 0
      ) {
        product.images =
          req.files.map(
            (file) =>
              file.filename
          );
      }

      await product.save();

      res.json({
        message:
          "Product updated successfully",
        product
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to update product"
      });
    }
  }
);

app.patch(
  "/products/:id/stock",
  async (req, res) => {
    try {
      const {
        colorIndex,
        sizeIndex
      } = req.body;

      const product =
        await Product.findById(
          req.params.id
        );

      const size =
        product.variants[
          colorIndex
        ].sizes[sizeIndex];

      size.available =
        !size.available;

      await product.save();

      res.json(product);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);



app.post(
  "/orders",
  async (req, res) => {
    try {
      const order =
        new Order(
          req.body
        );

      await order.save();

      res.json({
        success:
          true,
        order
      });

    } catch (
      error
    ) {
      console.log(
        error
      );

      res
        .status(500)
        .json({
          success:
            false,
          message:
            "Failed to save order"
        });
    }
  }
);

app.get(
  "/orders/customer/:customerId",
  async (req, res) => {
    try {
      const orders =
        await Order.find({
          customerId:
            req.params.customerId
        }).sort({
          createdAt: -1
        });

      res.json(orders);

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch orders"
      });
    }
  }
);

app.delete(
  "/products/:id",
  async (req, res) => {
    try {
      const product =
        await Product.findByIdAndDelete(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          message:
            "Product not found"
        });
      }

      res.json({
        message:
          "Product deleted successfully"
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to delete product"
      });
    }
  }
);
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
