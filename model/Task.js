import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [5, "Description must be at least 5 characters"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    deadline: {
      type: Date,
      required: [true, "Date is required"],
    },

    iscompleted: {
      type: Boolean,
      default: false,
    },

    priority: {
      type: String,
      
      enum: {
        values: ["low", "medium", "high"],
        default:"medium",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;