"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Users, Calendar, UserCog, Package, Receipt, Settings, Menu, X } from "lucide-react"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { useMobile } from "../hooks/use-mobile"

export default function Sidebar() {
  const location = useLocation()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Patients", href: "/patients", icon: Users },
    { name: "Appointments", href: "/appointments", icon: Calendar },
    { name: "Staff", href: "/staff", icon: UserCog },
    { name: "Inventory", href: "/inventory", icon: Package },
    { name: "Billing", href: "/billing", icon: Receipt },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  const NavItem = ({ item }) => (
    <Link
      to={item.href}
      onClick={() => isMobile && setIsOpen(false)}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        location.pathname === item.href ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground",
      )}
    >
      <item.icon className="h-5 w-5" />
      <span>{item.name}</span>
    </Link>
  )

  return (
    <>
      {isMobile && (
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50" onClick={toggleSidebar}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}

      <div
        className={cn(
          "bg-background border-r h-full",
          isMobile ? "fixed z-40 transition-all duration-300 ease-in-out" : "w-64",
          isMobile && !isOpen ? "-translate-x-full" : "translate-x-0",
        )}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold">Hospital ERP</h1>
          <p className="text-xs text-muted-foreground">Offline Management System</p>
        </div>
        <nav className="space-y-1 px-3">
          {navigation.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>
      </div>
    </>
  )
}
