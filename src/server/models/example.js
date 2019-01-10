import { Schema, model } from "mongoose";

const ExampleSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  RegisterDate: {
    type: Date,
    default: Date.now
  }
});

export default model("Example", ExampleSchema);
