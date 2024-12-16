"use client"
import { signIn } from "next-auth/react"
import {  useRouter, useSearchParams } from "next/navigation"
import { FC, ReactNode, useState } from "react"
import Swal from "sweetalert2"

const LoginPage: FC<ReactNode> = () => {
  const param = useSearchParams()
  const router = useRouter()
  const redirect = param.get('redirect')
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  console.log(redirect)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    })
    if (result?.ok) {
      Swal.fire({
        title: "Login successful",
        text: "You are now logged in!",
        icon: "success"
      })
      if (redirect){
        router.push(`${redirect}`)

      }
      else {
        router.push("/dashboard")
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Invalid email or password",
        icon: "error"
      })
    }
  }
  return (
    <>
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <p className="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
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
              placeholder="password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
          <div className="text-center mt-2">
            <span className="text-sm">I dont have an account? </span>
            <a href="/auth/register" className="text-sm link link-primary">
              Register here
            </a>
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginPage
