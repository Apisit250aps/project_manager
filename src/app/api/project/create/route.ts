import client from "@/libs/client"

import { IProject } from "@/models/project"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    
    const project: IProject = (await req.json()) as IProject
    
    console.log(project)
    const v = client.db("projects").collection<IProject>("projects").insertOne(project)
    return NextResponse.json({ v })
  } catch (error) {
    console.error(error)
    return NextResponse.json({})
  }
}
