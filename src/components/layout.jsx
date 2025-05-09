import Sidebar from "./sidebar.jsx"

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  )
}
