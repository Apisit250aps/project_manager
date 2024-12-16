import { ObjectId, Document } from "mongodb"
import Joi from "joi"
import { db } from "@/libs/client"
export interface IProject extends Document {
  _id?: ObjectId
  name: string
  description?: string
  startDate?: string
  endDate?: string
  status?: "active" | "inactive"
  tasks?: ObjectId[]
  groupId?: string
  repositoryRef?: string
  createAt?: string
  updatedAt?: string
}

const Project = db.collection<IProject>("projects")

export const projectSchema = Joi.object({
  _id: Joi.string().optional().default(null),
  name: Joi.string().required(),
  description: Joi.string().optional().default(null),
  startDate: Joi.string().optional().default(null),
  endDate: Joi.string().optional().default(null),
  status: Joi.string().valid("active", "inactive").default("active").optional(),
  tasks: Joi.array().items(Joi.string().valid(ObjectId.isValid)).optional().default(null),
  groupId: Joi.string().optional().default(null),
  repositoryRef: Joi.string().optional().default(null),
});

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