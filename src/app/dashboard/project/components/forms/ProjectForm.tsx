"use client"
import { IProject } from "@/models/project.model"
import { IResponse } from "@/types/services"
import axios, { AxiosResponse } from "axios"
import { useState } from "react"
import Swal from "sweetalert2"
export interface ProjectFormProps {
  data?: IProject
  onResponse?(data: unknown): void
}

export default function ProjectForm({ data, onResponse }: ProjectFormProps) {
  const [name, setName] = useState<string | undefined>(data?.name ?? "")
  const [description, setDescription] = useState<string | undefined>(
    data?.description ?? undefined
  )
  const [startDate, setStart] = useState<string | undefined>(
    data?.startDate ?? undefined
  )
  const [endDate, setEnd] = useState<string | undefined>(
    data?.endDate ?? undefined
  )
  const [groupId, setGroupId] = useState<string | undefined>(
    data?.groupId ?? undefined
  )
  const [repositoryRef, setRepositoryRef] = useState<string | undefined>(
    data?.repositoryRef ?? undefined
  )
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const project = {
      id: data?.id,
      name,
      description,
      startDate,
      endDate,
      groupId,
      repositoryRef
    }
    const response = (await axios({
      method: project.id ? "put" : "post",
      url: "/api/project/create",
      data: project
    })) as AxiosResponse<IResponse>
    if (response.status === 201) {
      Swal.fire({
        title: "Project Created",
        text: response.data.message,
        icon: "success"
      })
      if (onResponse) {
        onResponse(response.data)
      }
    } else if (response.status === 400) {
      Swal.fire({
        title: "Error",
        text: response.data.message,
        icon: "error"
      })
    } else {
      Swal.fire({
        title: "An error occurred",
        text: "Please try again later",
        icon: "error"
      })
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            placeholder="Project Name"
            className="input input-bordered w-full max-w-xs"
            value={name}
            onChange={(e) => setName(e.target.value)}
						
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            placeholder="Project Description"
            className="input input-bordered w-full max-w-xs"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Start Date</span>
          </div>
          <input
            type="date"
            placeholder="YYYY-MM-DD"
            className="input input-bordered w-full max-w-xs"
            value={startDate}
            onChange={(e) => setStart(e.target.value||"")}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">End Date</span>
          </div>
          <input
            type="date"
            placeholder="YYYY-MM-DD"
            className="input input-bordered w-full max-w-xs"
            value={endDate}
            onChange={(e) => setEnd(e.target.value||"")}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Group ID</span>
          </div>
          <input
            type="text"
            placeholder="Group ID"
            className="input input-bordered w-full max-w-xs"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Repository Reference</span>
          </div>
          <input
            type="text"
            placeholder="Repository Reference"
            className="input input-bordered w-full max-w-xs"
            value={repositoryRef}
            onChange={(e) => setRepositoryRef(e.target.value)}
          />
        </label>
        <button type="submit" className="btn btn-primary w-full max-w-xs mt-3">
          {data?.id ? "Update" : "Create"} Project
        </button>
      </form>
    </>
  )
}
