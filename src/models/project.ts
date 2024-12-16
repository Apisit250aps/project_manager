import mongoose, { Document, Schema, ObjectId } from "mongoose"

export interface IProject extends Document {
  name: string
  description?: string
  startDate?: Date
  endDate?: Date
  status?: "active" | "inactive"
  tasks: ObjectId[]
  groupId?: string
  repositoryRef?: string
}

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: false,
    default: "active"
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: "task" }], // Reference to Task model
  groupId: { type: String }, // Reference to Group model
  repositoryRef: { type: String } // Reference to Repository model
})

// Middleware สำหรับ deleteOne
ProjectSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    // ดึง Task model
    const Task = mongoose.model("task")

    // ลบ tasks ทั้งหมดที่เกี่ยวข้อง
    if (this.tasks && this.tasks.length > 0) {
      await Task.deleteMany({ _id: { $in: this.tasks } })
    }
  }
)

// Middleware สำหรับ findOneAndDelete
ProjectSchema.pre("findOneAndDelete", async function () {
  const Task = mongoose.model("task")
  const doc = await this.model.findOne(this.getFilter())

  if (doc && doc.tasks && doc.tasks.length > 0) {
    await Task.deleteMany({ _id: { $in: doc.tasks } })
  }
})

const Project = mongoose.model<IProject>("project", ProjectSchema)

export default Project