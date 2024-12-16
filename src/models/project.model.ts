import { ObjectId, Document } from "mongodb"
import Joi from "joi"
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
