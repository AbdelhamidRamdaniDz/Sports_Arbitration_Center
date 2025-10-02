"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Scale, Phone, Mail, ChevronDown } from "lucide-react"
import { NAVIGATION_ITEMS, SITE_CONFIG } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (itemHref: string) => {
    setOpenDropdown(openDropdown === itemHref ? null : itemHref)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between flex-row-reverse">
                    {/* زر CTA */}
                    <div className="hidden md:flex items-center gap-4">
            <Button asChild className="bg-corporate-green hover:bg-corporate-green/90">
              <Link href="/forms">تقديم قضية</Link>
            </Button>
          </div>

          <NavigationMenu className="hidden lg:flex" viewport={false}>
            <NavigationMenuList className="flex-row-reverse">
              {NAVIGATION_ITEMS.map((item) => (
                <NavigationMenuItem key={item.href}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger className="text-base">{item.title}</NavigationMenuTrigger>
                      <NavigationMenuContent
                        className={cn(
                          "absolute top-full right-0 mt-1 z-50",
                          "bg-white border border-gray-200 rounded-lg shadow-lg",
                          "min-w-[250px] max-w-[400px] w-max",
                          "animate-in fade-in-0 zoom-in-95 duration-200",
                          "rtl text-right"
                        )}
                      >
                        <div className="p-2">
                          <ul className="grid gap-1">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={child.href}
                                    className={cn(
                                      "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                      "hover:bg-corporate-green/10 hover:text-corporate-green",
                                      "focus:bg-corporate-green/20 focus:text-corporate-green",
                                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-corporate-green/20"
                                    )}
                                  >
                                    {child.title}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Link href="/" className="flex items-center gap-3 flex-row">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-corporate-green text-white">
              <Scale className="h-6 w-6" />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-lg font-bold text-corporate-green">{SITE_CONFIG.name}</span>
              <span className="text-xs text-muted-foreground">{SITE_CONFIG.nameEn}</span>
            </div>
          </Link>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">فتح القائمة</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] text-right">
              <nav className="flex flex-col gap-4">
                {NAVIGATION_ITEMS.map((item) => (
                  <div key={item.href}>
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(item.href)}
                          className="flex items-center justify-between w-full px-2 py-1 text-lg font-medium hover:bg-gray-50 rounded-md transition-colors"
                        >
                          {item.title}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              openDropdown === item.href && "rotate-180",
                            )}
                          />
                        </button>
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-300 ease-in-out",
                            openDropdown === item.href ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
                          )}
                        >
                          <div className="pr-4 mt-2 space-y-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block px-2 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-corporate-green/10 rounded-md transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                {child.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block px-2 py-1 text-lg font-medium hover:bg-gray-50 rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
                <Button asChild className="mt-4 bg-corporate-green hover:bg-corporate-green/90">
                  <Link href="/forms" onClick={() => setIsOpen(false)}>
                    تقديم قضية
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
