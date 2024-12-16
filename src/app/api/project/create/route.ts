import dbConnect from "@/libs/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        await dbConnect()
        console.log(req)
        return NextResponse.json({})
    } catch (error) {
        console.error(error)
        return NextResponse.json({})
    }
}