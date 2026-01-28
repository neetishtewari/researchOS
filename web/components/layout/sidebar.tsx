"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Users, PenTool, BarChart3, Settings } from "lucide-react"

const sidebarItems = [
  {
    title: "Proposals",
    href: "/dashboard/proposals",
    icon: FileText,
  },
  {
    title: "Leads",
    href: "/dashboard/leads",
    icon: Users,
    disabled: true,
  },
  {
    title: "Design",
    href: "/dashboard/design",
    icon: PenTool,
    disabled: true,
  },
  {
    title: "Synthesis",
    href: "/dashboard/synthesis",
    icon: BarChart3,
    disabled: true,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="p-6">
        <div className="flex items-center gap-2 font-semibold tracking-tight">
          <LayoutDashboard className="h-6 w-6" />
          <span className="">ResearchOS</span>
        </div>
      </div>
      <div className="flex-1 px-4 py-2">
        <nav className="flex flex-col gap-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
              className={cn(
                "justify-start gap-2",
                item.disabled && "opacity-50 cursor-not-allowed"
              )}
              asChild={!item.disabled}
            >
              {item.disabled ? (
                <span className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </span>
              ) : (
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              )}
            </Button>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  )
}
