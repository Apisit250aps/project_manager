import Joi from "joi"
import { ObjectId, Document } from "mongodb"

export interface ITask extends Document {
  title: string
  description?: string
  dueDate?: Date
  completed?: boolean
  status?: "todo" | "progress" | "pending" | "complete"
  branchRef?: string
  tasks?: ObjectId[]
  createAt?: string
  updatedAt?: string
}

export const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(null),
  dueDate: Joi.date().allow(null),
  completed: Joi.boolean().default(false),
  status: Joi.string()
    .valid("todo", "progress", "pending", "complete")
    .default("todo"),
  branchRef: Joi.string().allow(null),
  tasks: Joi.array()
    .items(
      Joi.string().custom(
        (value) => ObjectId.isValid(value),
        "Invalid ObjectId"
      )
    )
    .allow(null)
})
