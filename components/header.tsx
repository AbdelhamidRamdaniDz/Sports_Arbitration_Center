"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Scale, ChevronDown, ChevronLeft } from "lucide-react"
import { NAVIGATION_ITEMS, SITE_CONFIG } from "@/lib/constants"
import { cn } from "@/lib/utils"

type NavItem = {
  title: string
  href: string
  children?: NavItem[]
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredMain, setHoveredMain] = useState<string | null>(null)
  const [hoveredChild, setHoveredChild] = useState<string | null>(null)
  const mainTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const childTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const clearMainTimeout = () => {
    if (mainTimeoutRef.current) {
      clearTimeout(mainTimeoutRef.current)
      mainTimeoutRef.current = null
    }
  }

  const clearChildTimeout = () => {
    if (childTimeoutRef.current) {
      clearTimeout(childTimeoutRef.current)
      childTimeoutRef.current = null
    }
  }

  const handleMainEnter = (href: string, hasChildren: boolean) => {
    clearMainTimeout()
    clearChildTimeout()
    if (hasChildren) {
      setHoveredMain(href)
    } else {
      setHoveredMain(null)
      setHoveredChild(null)
    }
  }

  const handleMainLeave = () => {
    mainTimeoutRef.current = setTimeout(() => {
      setHoveredMain(null)
      setHoveredChild(null)
    }, 200)
  }

  const handleChildEnter = (href: string, hasChildren: boolean) => {
    clearChildTimeout()
    if (hasChildren) {
      setHoveredChild(href)
    } else {
      setHoveredChild(null)
    }
  }

  const handleChildLeave = () => {
    childTimeoutRef.current = setTimeout(() => {
      setHoveredChild(null)
    }, 200)
  }

  const handleDropdownEnter = () => {
    clearMainTimeout()
    clearChildTimeout()
  }

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-3 md:px-4 lg:px-6">
        <div className="flex h-12 items-center justify-between">
          {/* Logo - على اليمين */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-corporate-green text-white">
              <Scale className="h-5 w-5" />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-base font-semibold text-corporate-green">{SITE_CONFIG.name} <span className="text-lg font-bold text-red-600">Tech</span></span>
              <span className="text-xs text-muted-foreground">{SITE_CONFIG.nameEn}</span>
            </div>
          </Link>

          {/* Desktop Nav - في الوسط */}
          <nav
            aria-label="الرئيسي"
            className="hidden lg:flex flex-1 justify-center"
          >
            <ul className="flex items-center justify-center">
              {(NAVIGATION_ITEMS as NavItem[]).map((item) => {
                const hasChildren = !!item.children?.length
                return (
                  <li
                    key={item.href}
                    className="relative flex-shrink-0"
                    onMouseEnter={() => handleMainEnter(item.href, hasChildren)}
                    onMouseLeave={handleMainLeave}
                  >
                    {hasChildren ? (
                      <button
                        aria-expanded={hoveredMain === item.href}
                        onClick={() => setHoveredMain((s) => (s === item.href ? null : item.href))}
                        className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1 whitespace-nowrap"
                      >
                        {item.title}
                        <ChevronDown className="h-3 w-3" />
                      </button>
                    ) : (
                      <Link href={item.href} className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap">
                        {item.title}
                      </Link>
                    )}

                    {/* القائمة المنسدلة - المستوى 2 */}
                    {hasChildren && hoveredMain === item.href && (
                      item.title === "من نحن" ? (
                        <div
                          role="menu"
                          onMouseEnter={handleDropdownEnter}
                          onMouseLeave={handleMainLeave}
                          className="absolute right-0 top-full mt-2 w-screen max-w-[60rem] bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-right z-50"
                        >
                          <div className="container mx-auto px-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {item.children!.map((child) => (
                                <div key={child.href} className="space-y-2">
                                  <h4 className="text-sm font-semibold text-gray-800">{child.title}</h4>
                                  <ul className="space-y-1">
                                    {child.children?.map((grand) => (
                                      <li key={grand.href}>
                                        <Link
                                          href={grand.href}
                                          className="block py-1 pr-2 pl-1 rounded-md text-sm text-gray-700 hover:bg-corporate-green/10 hover:text-corporate-green transition-colors"
                                          onMouseEnter={() => handleChildEnter(grand.href, false)}
                                        >
                                          {grand.title}
                                        </Link>
                                      </li>
                                    ))}
                                    {(!child.children || child.children.length === 0) && (
                                      <li>
                                        <Link
                                          href={child.href}
                                          className="block py-1 pr-2 pl-1 rounded-md text-sm text-gray-700 hover:bg-corporate-green/10 hover:text-corporate-green transition-colors"
                                        >
                                          {child.title}
                                        </Link>
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              ))}

                              {/* Quick links / promo column for large screens */}
                              <div className="hidden lg:block">
                                <div className="rounded-lg bg-emerald-50 p-4 h-full">
                                  <h5 className="text-sm font-semibold text-emerald-700 mb-2">روابط سريعة</h5>
                                  <ul className="space-y-1 text-sm">
                                    <li>
                                      <Link href="/about/overview" className="text-emerald-700 hover:underline">عن المركز</Link>
                                    </li>
                                    <li>
                                      <Link href="/about/digital-transformation" className="text-emerald-700 hover:underline">التحول الرقمي</Link>
                                    </li>
                                    <li>
                                      <Link href="/contact" className="text-emerald-700 hover:underline">اتصل بنا</Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          role="menu"
                          onMouseEnter={handleDropdownEnter}
                          onMouseLeave={handleMainLeave}
                          className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-1.5 text-right z-50"
                        >
                          <ul className="space-y-1">
                            {item.children!.map((child) => {
                              const childHasChildren = !!child.children?.length
                              return (
                                <li
                                  key={child.href}
                                  className="relative"
                                  onMouseEnter={() => handleChildEnter(child.href, childHasChildren)}
                                  onMouseLeave={handleChildLeave}
                                >
                                  <div className="flex items-center">
                                    <Link
                                      href={child.href}
                                      className={cn(
                                        "flex-1 block py-1.5 pr-2.5 pl-2 rounded-md text-xs text-right",
                                        "hover:bg-corporate-green/10 hover:text-corporate-green transition-colors"
                                      )}
                                    >
                                      {child.title}
                                    </Link>
                                    
                                    {childHasChildren && (
                                      <span className="px-1.5">
                                        <ChevronLeft className="h-3 w-3 text-gray-400" />
                                      </span>
                                    )}
                                  </div>

                                  {/* القائمة المنسدلة - المستوى 3 */}
                                  {childHasChildren && hoveredChild === child.href && (
                                    <div
                                      role="menu"
                                      onMouseEnter={handleDropdownEnter}
                                      onMouseLeave={handleChildLeave}
                                      className="absolute top-0 right-full ml-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg p-1.5 text-right z-50"
                                    >
                                      <ul className="space-y-1">
                                        {child.children!.map((grand) => (
                                          <li key={grand.href}>
                                            <Link
                                              href={grand.href}
                                              className="block py-1.5 pr-2.5 pl-2 rounded-md text-xs hover:bg-corporate-green/10 hover:text-corporate-green transition-colors"
                                            >
                                              {grand.title}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      )
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* CTA - على اليسار */}
          <div className="flex items-center gap-3">
            <Button asChild size="sm" className="hidden md:flex bg-corporate-green hover:bg-corporate-green/90">
              <Link href="/forms">تقديم قضية</Link>
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">فتح القائمة</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[18.75rem] sm:w-[26.25rem] text-right" dir="rtl">
                <nav className="flex flex-col gap-2">
                  {(NAVIGATION_ITEMS as NavItem[]).map((item) => (
                    <MobileNavItem key={item.href} item={item} closeSheet={() => setIsOpen(false)} />
                  ))}

                  <div className="mt-4">
                    <Button asChild className="w-full bg-corporate-green hover:bg-corporate-green/90">
                      <Link href="/forms" onClick={() => setIsOpen(false)}>
                        تقديم قضية
                      </Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

/* Mobile Navigation Item */
function MobileNavItem({ item, closeSheet }: { item: NavItem; closeSheet: () => void }) {
  const [isLevel1Open, setIsLevel1Open] = useState(false)
  const [openLevel2Href, setOpenLevel2Href] = useState<string | null>(null)

  const hasLevel2Children = !!item.children?.length

  // إذا كان العنصر الحالي ليس له أطفال، فهو رابط بسيط
  if (!hasLevel2Children) {
    return (
      <Link 
        href={item.href} 
        onClick={closeSheet} 
        className="block py-1.5 pr-2 pl-2 text-base font-medium hover:bg-gray-50 rounded-md text-right"
      >
        {item.title}
      </Link>
    )
  }

  // العنصر له أطفال (المستوى 2)
  return (
    <div>
      <button
        onClick={() => {
          setIsLevel1Open(!isLevel1Open)
          // عند إغلاق المستوى الأول، نغلق جميع المستويات الثانية المفتوحة
          if (isLevel1Open) {
            setOpenLevel2Href(null)
          }
        }}
        className="flex w-full items-center justify-between py-1.5 pr-2 pl-2 text-base font-medium hover:bg-gray-50 rounded-md"
      >
        <ChevronDown 
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isLevel1Open && "rotate-180"
          )} 
        />
        <span>{item.title}</span>
      </button>

      {/* محتوى المستوى 2 */}
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isLevel1Open ? "max-h-[125rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="pl-4 mt-2 space-y-2">
          {item.children!.map((level2Item) => {
            const hasLevel3Children = !!level2Item.children?.length
            const isLevel2Open = openLevel2Href === level2Item.href

            // عنصر المستوى 2 بدون أطفال
            if (!hasLevel3Children) {
              return (
                <Link
                  key={level2Item.href}
                  href={level2Item.href}
                  onClick={closeSheet}
                  className="block py-1.5 pr-2 pl-2 text-sm rounded-md hover:bg-corporate-green/10 hover:text-corporate-green text-right transition-colors"
                >
                  {level2Item.title}
                </Link>
              )
            }

            // عنصر المستوى 2 مع أطفال (المستوى 3)
            return (
              <div key={level2Item.href}>
                <button
                  onClick={() => {
                    setOpenLevel2Href(isLevel2Open ? null : level2Item.href)
                  }}
                  className="flex w-full items-center justify-between py-1.5 pr-2 pl-2 text-sm font-medium hover:bg-gray-50 rounded-md"
                >
                  <ChevronDown 
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      isLevel2Open && "rotate-180"
                    )} 
                  />
                  <span>{level2Item.title}</span>
                </button>

                {/* محتوى المستوى 3 */}
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isLevel2Open ? "max-h-[62.5rem] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="pl-4 mt-1 space-y-1">
                    {level2Item.children!.map((level3Item) => (
                      <Link
                        key={level3Item.href}
                        href={level3Item.href}
                        onClick={closeSheet}
                        className="block py-1.5 pr-2 pl-2 text-xs rounded-md hover:bg-corporate-green/10 hover:text-corporate-green text-right transition-colors"
                      >
                        {level3Item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}