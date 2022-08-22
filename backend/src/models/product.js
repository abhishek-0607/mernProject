const { Schema, model } = require("mongoose");

const productSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product Name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter product Description"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product Price"],
      maxLength: [8, "Price cannnot exceed 8 characters"],
    },
    rating: { type: Number, default: 0 },
    images: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    category: {
      type: String,
      required: [true, "Please enter product Category"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
      maxLength: [4, "stock cannoot exceed 4 characters"],
      default: 1,
    },
    numberOfReviews: { type: Number, default: 0 },
    reviews: [
      {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
  // {
  //   versionKey: false,
  //   timestamps: true,
  // }
);

const Product = model("product", productSchema);
module.exports = Product;
