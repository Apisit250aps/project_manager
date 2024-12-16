import { comparePasswords, generateHashedPassword } from "@/libs/auth"
import { db } from "@/libs/client"
import { Document } from "mongodb"

export interface IUser extends Document {
  _id?: string
  name: string
  password: string
  email: string
  isActive?: boolean
  lastLogin?: string
  createAt?: string
  updatedAt?: string
}

const User = db.collection<IUser>("users")

export async function createUser(data: IUser) {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      email: data.email,
      name: data.name
    })
    if (existingUser) {
      throw new Error("Email already exists")
    }
    // Hash the password before saving it to the database
    const hashedPassword = await generateHashedPassword(data.password)
    const result = await User.insertOne({
      ...data,
      password: hashedPassword,
      isActive: true,
      createAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    return result
  } catch (error) {
    console.error(error)
    throw new Error("Failed to create user")
  }
}

export async function userAuthentication(
  email: string,
  password: string
): Promise<IUser> {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error("User not found")
    }
    const isValid = await comparePasswords(password, user.password)
    if (!isValid) {
      throw new Error("Invalid credentials")
    }
    await User.updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date().toISOString() } }
    )
    return user as IUser
  } catch (error) {
    console.error(error)
    throw new Error("Failed to authenticate user")
  }
}
