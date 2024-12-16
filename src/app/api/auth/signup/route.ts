import dbConnect from "@/libs/mongoose";
import { IUser, User } from "@/models/user"
import { IResponse } from "@/types/services"
import { console } from "inspector"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect()
    // Get request body
    const { name, email, password } = (await req.json()) as IUser

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json<IResponse>(
        { message: "All fields are required", status: false },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email, name })
    if (existingUser) {
      return NextResponse.json<IResponse>(
        { message: "Email already exists", status: false },
        { status: 400 }
      )
    }

    // Create new user
    const newUser = await User.create({ name, email, password })

    return NextResponse.json<IResponse>(
      { message: "Hello from your API endpoint", data: newUser, status: true },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json<IResponse>(
      { message: "An error occurred", status: false },
      { status: 500 }
    )
  }
}
