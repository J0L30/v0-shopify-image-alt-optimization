"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ImageIcon, HomeIcon, SettingsIcon } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
    },
    {
      title: "Images",
      href: "/dashboard/images",
      icon: ImageIcon,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: SettingsIcon,
    },
  ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <ImageIcon className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">Image Alt SEO</span>
      </Link>
      <div className="flex items-center space-x-4 lg:space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href ? "text-primary" : "text-muted-foreground",
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  )
}
