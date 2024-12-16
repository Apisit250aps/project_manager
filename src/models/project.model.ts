import { ObjectId, Document } from "mongodb"
import Joi from "joi"
import { db } from "@/libs/client"
export interface IProject extends Document {
  name: string
  description?: string
  startDate?: Date
  endDate?: Date
  status?: "active" | "inactive"
  tasks: ObjectId[]
  groupId?: string
  repositoryRef?: string
  createAt?: string
  updatedAt?: string
}

const Project = db.collection<IProject>("projects")

export const projectSchema = Joi.object({
  _id: Joi.string().optional(),
  name: Joi.string().required(),
  description: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  status: Joi.string().valid(["active", "inactive"]).optional(),
  tasks: Joi.array().items(Joi.string().valid(ObjectId.isValid)).optional(),
  groupId: Joi.string().optional(),
  repositoryRef: Joi.string().optional()
})

export async function createProject(project: IProject) {
  try {
    const result = await Project.insertOne({
      ...project,
      createAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    return result.insertedId as ObjectId
  } catch (error) {
    console.error("Error creating project:", error)
    throw error
  }
}
