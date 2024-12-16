"use client"
import { NavLink } from "./NavLink";

export default function NavMenu() {
  return (
    <>
      <ul className="menu bg-base-100 text-base-content min-h-full w-56 p-4 rounded-2xl">
        <li className="menu-title">Dashboard</li>
        <li>
          <NavLink href="/dashboard">Home</NavLink>
        </li>
        <li className="menu-title">Manage</li>
        <li>
          <NavLink href="/dashboard/project">Projects</NavLink>
        </li>
      </ul>
    </>
  )
}