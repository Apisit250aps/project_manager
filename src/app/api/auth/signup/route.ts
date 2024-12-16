import { createUser, IUser } from "@/models/user.model"
import { IResponse } from "@/types/services"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  try {
    // Get request body
    const { name, email, password } = (await req.json()) as IUser

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json<IResponse>(
        { message: "All fields are required", status: false },
        { status: 400 }
      )
    }

    const user = await createUser({ email, name, password })
    console.log(user)
    return NextResponse.json<IResponse>(
      { message: "Login successfully!", data: user, status: true },
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
