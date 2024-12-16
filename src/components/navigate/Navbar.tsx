"use client"
import { useSession, signOut } from "next-auth/react"
import { ReactNode } from "react"
import Image from "next/image"

export default function Navbar({ children }: { children?: ReactNode }) {
  const { data: session, status } = useSession()
  return (
    <nav className="navbar bg-base-100 rounded-b-2xl lg:rounded-2xl">
      {children}
      <div className="flex-1">
        <a className="btn btn-ghost text-xl flex justify-center">
          {status === "loading" ? (
            <span className="loading loading-dots loading-sm"></span>
          ) : (
            session?.user?.name
          )}
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {status === "loading" ? (
                <span className="loading loading-ring loading-lg"></span>
              ) : (
                <Image
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt={""}
                  width={64}
                  height={64}
                />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={() => signOut()}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
