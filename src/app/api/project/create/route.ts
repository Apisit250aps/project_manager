import { createProject, projectSchema } from "@/models/project.model"
import { IResponse } from "@/types/services"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const project = (await req.json()) 
    
    const { error, value } = projectSchema.validate(project)
    if (error) {
        console.error(error)
      return NextResponse.json<IResponse>(
        { message: error.details[0].message, status: false },
        { status: 400 }
      )
    }
    const newProject = await createProject(value)
    return NextResponse.json<IResponse>(
      {
        message: "New project created",
        status: true,
        data: { newProject }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json<IResponse>({
      message: "Create project fail!",
      status: false
    })
  }
}
