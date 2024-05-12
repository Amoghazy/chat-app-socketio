import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      default: "",
    },
    imageURL: {
      type: String,
      default: "",
    },

    videoURL: {
      type: String,
      default: "",
    },
    pdfURL: {
      type: String,
      default: "",
    },
    seen: {
      type: Boolean,
      default: false,
    },
    msgBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
