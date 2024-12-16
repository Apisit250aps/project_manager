"use client"

import { IResponse } from "@/types/services"
import axios, { AxiosError, AxiosResponse } from "axios"
import { FC, ReactNode, useState } from "react"
import Swal from "sweetalert2"

const RegisterPage: FC<ReactNode> = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    try {
      await axios({
        method: "post",
        url: "/api/auth/signup",
        data: { name, email, password }
      })
        .then((response: AxiosResponse<IResponse>) => {
          if (response.status == 201) {
            Swal.fire({
              title: "Successfully",
              text: response.data.message,
              icon: "success"
            })
          }
          setName("")
          setEmail("")
          setPassword("")
          setConfirmPassword("")
        })
        .catch((err: AxiosError<AxiosResponse<IResponse>>) => {
          console.error(err.response?.data)
        })
    } catch (error) {
      console.error("asd", error)
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred",
        icon: "error"
      })
    }
  }

  return (
    <>
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Register now!</h1>
        <p className="py-6">
          Join our community today and get access to all features. Create your
          account to start your journey with us.
        </p>
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="input input-bordered"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Register</button>
          </div>
          <div className="text-center mt-2">
            <span className="text-sm">Already have an account? </span>
            <a href="/auth/login" className="text-sm link link-primary">
              Login here
            </a>
          </div>
        </form>
      </div>
    </>
  )
}

export default RegisterPage
