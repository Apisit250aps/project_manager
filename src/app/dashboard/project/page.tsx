"use client"
import { FC, ReactNode } from "react"
import ProjectData from "./components/tables/ProjectData"
import ProjectForm from "./components/forms/ProjectForm";

const Project: FC<ReactNode> = () => {
  return (
    <>
      <ProjectData />
      <ProjectForm onResponse={(e)=> console.log(e)}/>
    </>
  )
}

export default Project
