import mongoose from "mongoose";

const ProfilkaselaSchema = new mongoose.Schema(
  {
    img: {
      type: Array,
      required: true,
    },
    img: {
        type: Array,
        required: true,
      },
    content1: {
      type: String,
      required: true,
    },
    img: {
        type: Array,
        required: true,
     },
     content2: {
         type: String,
         required: true,
      },
      img: {
        type: Array,
        required: true,
     },
     content3: {
         type: String,
         required: true,
      },
  },
  { timestamps: true }
);

export default mongoose.models.Profilkasela || 
mongoose.model("Profilkasela", ProfilkaselaSchema);
