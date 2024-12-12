import Link from "next/link"

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content pt-0 lg:pt-3 pe-0 lg:pe-3">
          {/* Page content here */}
          <div className="navbar bg-base-100 rounded-b-2xl lg:rounded-2xl">
            <div className="flex-none">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-square btn-ghost lg:hidden"
              >
                <i className="bx bx-menu-alt-left"></i>
              </label>
            </div>
            <div className="flex-1">
              <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="flex-none">
              <button className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <main className="pt-3">{children}</main>
        </div>
        <div className="drawer-side p-0 lg:p-3">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-100 text-base-content min-h-full w-56 p-4 rounded-2xl">
            {/* Sidebar content here */}
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
