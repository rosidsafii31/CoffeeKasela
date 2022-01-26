import mongoose from "mongoose";

const ArtikelSchema = new mongoose.Schema(
  {
    img: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Artikel || 
mongoose.model("Artikel", ArtikelSchema);
