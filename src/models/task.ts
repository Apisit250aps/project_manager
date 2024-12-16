import mongoose, { Document, ObjectId, Schema } from "mongoose"

export interface ITask extends Document {
  title: string
  description?: string
  dueDate?: Date
  completed?: boolean
  status?: "todo" | "progress" | "pending" | "complete"
  branchRef?: string
  tasks?: ObjectId[]
}

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    dueDate: { type: Date, required: false },
    completed: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["todo", "progress", "pending", "complete"],
      default: "todo"
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: "task", required: false }],
    branchRef: { type: String, required: false }
  },
  {
    timestamps: true
  }
)

// Add middleware to handle cascade delete
taskSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    // Get all subtask IDs
    const subtaskIds = this.tasks

    if (subtaskIds.length > 0) {
      // Delete all subtasks recursively
      await Task.deleteMany({ _id: { $in: subtaskIds } })
    }
  }
)

// Add middleware for findOneAndDelete
taskSchema.pre("findOneAndDelete", async function () {
  const doc = await this.model.findOne(this.getFilter())
  if (doc) {
    const subtaskIds = doc.tasks
    if (subtaskIds.length > 0) {
      await Task.deleteMany({ _id: { $in: subtaskIds } })
    }
  }
})

const Task = mongoose.model<ITask>("task", taskSchema)

export default Task