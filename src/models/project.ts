import { ObjectId, Document } from "mongodb"

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

