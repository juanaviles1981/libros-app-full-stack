import mongoose from "mongoose";

const libroSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
});

export default mongoose.model("Libro", libroSchema);
