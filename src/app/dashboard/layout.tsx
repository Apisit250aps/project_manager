import Navbar from "@/components/navigate/Navbar"
import NavMenu from "@/components/navigate/NavMenu"

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
          <Navbar>
            <div className="flex-none">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-square btn-ghost lg:hidden"
              >
                <i className="bx bx-menu-alt-left"></i>
              </label>
            </div>
          </Navbar>
          <main className="pt-3">{children}</main>
        </div>
        <div className="drawer-side p-0 lg:p-3">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <NavMenu />
        </div>
      </div>
    </>
  )
}
