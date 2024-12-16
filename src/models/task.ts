import { ObjectId, Document } from "mongodb"

export interface ITask extends Document {
  title: string
  description?: string
  dueDate?: Date
  completed?: boolean
  status?: "todo" | "progress" | "pending" | "complete"
  branchRef?: string
  tasks?: ObjectId[]
}