import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
  {
    img: {
      type:Array,
      required:true,
    },
    title: {
      type:String,
      required:true,
      maxlength:60,
    },
    deskripsi: {
      type:String,
      required:true,
      maxlength:200,
    },
    berat: {
      type:String,
      required:true,
      maxlength:200,
    },
    harga: {
      type:Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
