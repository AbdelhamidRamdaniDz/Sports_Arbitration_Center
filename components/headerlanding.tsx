"use client"
import { useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Scale, ChevronDown, ChevronLeft, Phone, Mail, Search, User } from "lucide-react"
import { NAVIGATION_ITEMS, SITE_CONFIG } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useSession, signOut } from "next-auth/react"

type NavItem = {
  title: string
  href: string
  children?: NavItem[]
}

export function Headerlanding() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [hoveredMain, setHoveredMain] = useState<string | null>(null)
  const [hoveredChild, setHoveredChild] = useState<string | null>(null)
  const mainTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const childTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { data: session } = useSession()

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
      className="sticky top-0 z-50 w-full bg-background"
    >
      {/* Top Bar */}
      <div className="border-b bg-corporate-green text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            {/* الشعار - على اليمين */}
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-corporate-green">
                <Scale className="h-6 w-6" />
              </div>
              <div className="flex flex-col text-right">
                <span className="text-lg font-bold text-white">{SITE_CONFIG.name}</span>
                <span className="text-xs text-white/80">{SITE_CONFIG.nameEn}</span>
              </div>
            </Link>

            {/* معلومات الاتصال - على اليسار */}
            <div className="flex items-center gap-6 text-sm">
              <a 
                href="mailto:info@example.dz" 
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <span className="hidden md:inline">info@example.dz</span>
                <Mail className="h-4 w-4" />
              </a>
              <a 
                href="tel:+213123456789" 
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <span className="hidden sm:inline">+213 123 456 789</span>
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Desktop Nav - على اليمين */}
            <nav
              aria-label="الرئيسي"
              className="hidden lg:flex"
            >
              <ul className="flex items-center">
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
                          className="px-4 py-2 text-base font-medium rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1 whitespace-nowrap"
                        >
                          {item.title}
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      ) : (
                        <Link href={item.href} className="px-4 py-2 text-base font-medium rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap">
                          {item.title}
                        </Link>
                      )}

                      {/* القائمة المنسدلة - المستوى 2 */}
                      {hasChildren && hoveredMain === item.href && (
                        <div
                          role="menu"
                          onMouseEnter={handleDropdownEnter}
                          onMouseLeave={handleMainLeave}
                          className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-right z-50"
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
                                        "flex-1 block py-2 pr-3 pl-2 rounded-md text-sm text-right",
                                        "hover:bg-corporate-green/10 hover:text-corporate-green transition-colors"
                                      )}
                                    >
                                      {child.title}
                                    </Link>
                                    
                                    {childHasChildren && (
                                      <span className="px-2">
                                        <ChevronLeft className="h-4 w-4 text-gray-400" />
                                      </span>
                                    )}
                                  </div>

                                  {/* القائمة المنسدلة - المستوى 3 */}
                                  {childHasChildren && hoveredChild === child.href && (
                                    <div
                                      role="menu"
                                      onMouseEnter={handleDropdownEnter}
                                      onMouseLeave={handleChildLeave}
                                      className="absolute top-0 right-full ml-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-right z-50"
                                    >
                                      <ul className="space-y-1">
                                        {child.children!.map((grand) => (
                                          <li key={grand.href}>
                                            <Link
                                              href={grand.href}
                                              className="block py-2 pr-3 pl-2 rounded-md text-sm hover:bg-corporate-green/10 hover:text-corporate-green transition-colors"
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
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* CTA وأدوات - على اليسار */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden md:flex"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">بحث</span>
              </Button>

              {/* Login Button */}
              {!session ? (
                <Button asChild variant="outline" className="hidden md:flex gap-2">
                  <Link href="/login">
                    <User className="h-4 w-4" />
                    <span>تسجيل الدخول</span>
                  </Link>
                </Button>
              ) : (
                <div className="relative group">
                  <Button variant="outline" className="hidden md:flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{session.user?.name || "حسابي"}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>

                  {/* القائمة المنسدلة لحساب المستخدم */}
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg hidden group-hover:block z-50 text-right">
                    <ul className="py-2 text-sm">
                      <li>
                        <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                          الملف الشخصي
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="w-full text-right px-4 py-2 hover:bg-gray-100"
                        >
                          تسجيل الخروج
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}


              {/* Submit Case Button */}
              <Button asChild className="hidden md:flex bg-corporate-green hover:bg-corporate-green/90">
                <Link href="/forms">تقديم قضية</Link>
              </Button>

              {/* Mobile Menu Button */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">فتح القائمة</span>
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-[18.75rem] sm:w-[26.25rem] text-right" dir="rtl">
                  <nav className="flex flex-col gap-2">
                    {/* Search في Mobile */}
                    <div className="mb-4 relative">
                      <input
                        type="search"
                        placeholder="ابحث..."
                        className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-corporate-green text-right"
                      />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>

                    {(NAVIGATION_ITEMS as NavItem[]).map((item) => (
                      <MobileNavItem key={item.href} item={item} closeSheet={() => setIsOpen(false)} />
                    ))}

                    <div className="mt-4 space-y-2">
                      <Button asChild variant="outline" className="w-full gap-2">
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          <User className="h-4 w-4" />
                          <span>تسجيل الدخول</span>
                        </Link>
                      </Button>
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

          {/* Search Bar - قابل للتوسيع */}
          <div 
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              isSearchOpen ? "max-h-20 opacity-100 pb-4" : "max-h-0 opacity-0"
            )}
          >
            <div className="relative">
              <input
                type="search"
                placeholder="ابحث عن محامي، خدمة، مقال..."
                className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-corporate-green focus:border-transparent text-right"
                autoFocus={isSearchOpen}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
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
        className="block py-2 pr-2 pl-2 text-lg font-medium hover:bg-gray-50 rounded-md text-right"
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
        className="flex w-full items-center justify-between py-2 pr-2 pl-2 text-lg font-medium hover:bg-gray-50 rounded-md"
      >
        <ChevronDown 
          className={cn(
            "h-5 w-5 transition-transform duration-200",
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
                  className="block py-2 pr-2 pl-2 text-base rounded-md hover:bg-corporate-green/10 hover:text-corporate-green text-right transition-colors"
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
                  className="flex w-full items-center justify-between py-2 pr-2 pl-2 text-base font-medium hover:bg-gray-50 rounded-md"
                >
                  <ChevronDown 
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
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
                        className="block py-2 pr-2 pl-2 text-sm rounded-md hover:bg-corporate-green/10 hover:text-corporate-green text-right transition-colors"
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