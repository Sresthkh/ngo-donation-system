import mongoose, { Schema, models } from "mongoose";

const DonationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },

    paymentId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Donation =
  models.Donation || mongoose.model("Donation", DonationSchema);

export default Donation;
