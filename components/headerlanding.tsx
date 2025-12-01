"use client"
import { useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Scale, ChevronDown, ChevronLeft, Phone, Mail, Search, User } from "lucide-react"
import { NAVIGATION_ITEMS, SITE_CONFIG } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useSession, signOut } from "next-auth/react"
import Image from "next/image"

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
      <div className="border-b bg-white text-white">
        <div className="w-full h-24 mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex h-24 py-2 items-center justify-between">
            <Link href="/" className="flex items-center gap-3 md:gap-3.5">
              <Image
                src="/logo.png"
                alt={`${SITE_CONFIG.name} logo`}
                width={60}
                height={90}
                className="rounded-md object-contain"
              /> 
              <div className="text-center">
                {/* Main Logo Text */}
                <div className="flex items-baseline gap-1 justify-center">
                  <span className="text-xl md:text-2xl font-black tracking-tight" style={{ color: '#22C55E' }}>
                    TAHKEEM
                  </span>
                  <span className="text-xl md:text-2xl font-black tracking-tight" style={{ color: '#EF4444' }}>
                    TECH
                  </span>
                </div>
                
                {/* Arabic Text */}
                <div className="text-[11px] md:text-sm font-bold text-gray-900 leading-tight mb-0.5">
                  مركز التحكيم التجاري و الرياضي
                </div>
                
                {/* English Text */}
                <div className="text-[9px] md:text-[10px] font-bold text-gray-800 tracking-wider">
                  TRADE & SPORTS ARBITRATION CENTER
                </div>
              </div>
            </Link>

            {/* معلومات الاتصال - على اليسار */}
            <div className="flex items-center gap-3 md:gap-4 text-[11px] md:text-xs text-corporate-green">
              <a 
                href="mailto:info@sports-arbitration.dz" 
                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              >
                <span className="hidden md:inline">info@sports-arbitration.dz</span>
                <Mail className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </a>
              <a 
                href="tel:+213 668631580" 
                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              >
                <span className="hidden sm:inline ltr">+213 668631580</span>
                <Phone className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-2 md:px-4 lg:px-6">
          <div className="flex h-12 md:h-14 items-center justify-between">
            {/* Desktop Nav - على اليمين */}
            <nav
              aria-label="الرئيسي"
              className="hidden lg:flex"
            >
              <ul className="flex items-center gap-0.5 md:gap-1">
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
                          className="px-1.5 py-1 md:px-2 md:py-1 text-xs md:text-sm font-medium rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1 whitespace-nowrap"
                        >
                          {item.title}
                          <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />
                        </button>
                      ) : (
                        <Link href={item.href} className="px-1.5 py-1 md:px-2 md:py-1 text-xs md:text-sm font-medium rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap">
                          {item.title}
                        </Link>
                      )}

                      {/* القائمة المنسدلة - المستوى 2 */}
                      {hasChildren && hoveredMain === item.href && (
                        // Mega Menu exclusively for the "من نحن" top-level item
                        item.title === "من نحن" ? (
                          <div
                            role="menu"
                            onMouseEnter={handleDropdownEnter}
                            onMouseLeave={handleMainLeave}
                            className="absolute right-0 top-full mt-1 md:mt-2 w-screen max-w-[80rem] bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-right z-50"
                          >
                            <div className="container mx-auto px-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {item.children!.map((child) => (
                                  <div key={child.href} className="space-y-3">
                                    <h4 className="text-sm font-semibold text-gray-800 mb-1">{child.title}</h4>
                                    <ul className="space-y-1">
                                      {child.children?.map((grand) => (
                                        <li key={grand.href}>
                                          <Link
                                            href={grand.href}
                                            className="block py-1 pr-2 pl-1.5 rounded-md text-sm text-gray-700 hover:bg-corporate-green/10 hover:text-corporate-green transition-colors"
                                            onMouseEnter={() => handleChildEnter(grand.href, false)}
                                          >
                                            {grand.title}
                                          </Link>
                                        </li>
                                      ))}
                                      {/* If a child has no grandchildren, show the child as a link */}
                                      {(!child.children || child.children.length === 0) && (
                                        <li>
                                          <Link
                                            href={child.href}
                                            className="block py-1 pr-2 pl-1.5 rounded-md text-sm text-gray-700 hover:bg-corporate-green/10 hover:text-corporate-green transition-colors"
                                          >
                                            {child.title}
                                          </Link>
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                ))}
                                {/* Optional promo/quick links column */}
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
                            className="absolute right-0 top-full mt-1 md:mt-2 w-44 md:w-56 bg-white border border-gray-200 rounded-lg shadow-lg p-1.5 md:p-2 text-right z-50"
                          >
                            <ul className="space-y-[2px] md:space-y-1">
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
                                          "flex-1 block py-1 pr-2 pl-1.5 md:py-1.5 md:pr-3 md:pl-2 rounded-md text-[11px] md:text-xs text-right",
                                          "hover:bg-corporate-green/10 hover:text-corporate-green transition-colors"
                                        )}
                                      >
                                        {child.title}
                                      </Link>
                                      
                                      {childHasChildren && (
                                        <span className="px-1.5 md:px-2">
                                          <ChevronLeft className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
                                        </span>
                                      )}
                                    </div>

                                    {/* القائمة المنسدلة - المستوى 3 */}
                                    {childHasChildren && hoveredChild === child.href && (
                                      <div
                                        role="menu"
                                        onMouseEnter={handleDropdownEnter}
                                        onMouseLeave={handleChildLeave}
                                        className="absolute top-0 right-full ml-1.5 md:ml-2 w-36 md:w-44 bg-white border border-gray-200 rounded-lg shadow-lg p-1.5 md:p-2 text-right z-50"
                                      >
                                        <ul className="space-y-[2px] md:space-y-1">
                                          {child.children!.map((grand) => (
                                            <li key={grand.href}>
                                              <Link
                                                href={grand.href}
                                                className="block py-1 pr-2 pl-1.5 md:py-1.5 md:pr-3 md:pl-2 rounded-md text-[10px] md:text-xs hover:bg-corporate-green/10 hover:text-corporate-green transition-colors"
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

            {/* CTA وأدوات - على اليسار */}
            <div className="flex items-center gap-1.5 md:gap-2">
              {/* Search Button */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden md:flex p-2"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">بحث</span>
              </Button>

              {/* Login Button */}
              {!session ? (
                <Button asChild variant="outline" className="hidden md:flex gap-1 text-[11px] md:text-xs px-2 py-1 h-7 md:h-8">
                  <Link href="/login">
                    <User className="h-3.5 w-3.5" />
                    <span>تسجيل الدخول</span>
                  </Link>
                </Button>
              ) : (
                <div className="relative group">
                  <Button variant="outline" className="hidden md:flex items-center gap-1 text-[11px] md:text-xs px-2 py-1 h-7 md:h-8">
                    <User className="h-3.5 w-3.5" />
                    <span>{session.user?.name || "حسابي"}</span>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Button>

                  {/* القائمة المنسدلة لحساب المستخدم */}
                  <div className="absolute left-0 mt-1 md:mt-2 w-36 md:w-44 bg-white border border-gray-200 rounded-lg shadow-lg hidden group-hover:block z-50 text-right">
                    <ul className="py-1 md:py-2 text-[11px] md:text-xs">
                      <li>
                        <Link href="/profile" className="block px-3 py-1 hover:bg-gray-100 rounded">
                          الملف الشخصي
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="w-full text-right px-3 py-1 hover:bg-gray-100 rounded"
                        >
                          تسجيل الخروج
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Submit Case Button */}
              <Button asChild className="hidden md:flex bg-corporate-green hover:bg-corporate-green/90 text-[11px] md:text-xs px-2 py-1 h-7 md:h-8 min-w-0">
                <Link href="/forms">تقديم قضية</Link>
              </Button>

              {/* Mobile Menu Button */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="p-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">فتح القائمة</span>
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-[15rem] sm:w-[19rem] text-right" dir="rtl">
                  <nav className="flex flex-col gap-1.5">
                    {/* Search في Mobile */}
                    <div className="mb-3 relative">
                      <input
                        type="search"
                        placeholder="ابحث..."
                        className="w-full px-3 py-2 pr-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-corporate-green text-right text-[13px]"
                      />
                      <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>

                    {(NAVIGATION_ITEMS as NavItem[]).map((item) => (
                      <MobileNavItem key={item.href} item={item} closeSheet={() => setIsOpen(false)} />
                    ))}

                    <div className="mt-3 space-y-1.5">
                      <Button asChild variant="outline" className="w-full gap-1 text-xs px-2 py-1 h-8">
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          <User className="h-4 w-4" />
                          <span>تسجيل الدخول</span>
                        </Link>
                      </Button>
                      <Button asChild className="w-full bg-corporate-green hover:bg-corporate-green/90 text-xs px-2 py-1 h-8">
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
              isSearchOpen ? "max-h-16 opacity-100 pb-2" : "max-h-0 opacity-0"
            )}
          >
            <div className="relative">
              <input
                type="search"
                placeholder="ابحث عن محامي، خدمة، مقال..."
                className="w-full px-3 py-2 pr-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-corporate-green focus:border-transparent text-right text-[13px]"
                autoFocus={isSearchOpen}
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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
        className="block py-1 pr-1.5 pl-1.5 text-sm font-medium hover:bg-gray-50 rounded-md text-right"
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
        className="flex w-full items-center justify-between py-1 pr-1.5 pl-1.5 text-sm font-medium hover:bg-gray-50 rounded-md"
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
          isLevel1Open ? "max-h-[70rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="pl-2 mt-1 space-y-1">
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
                  className="block py-1 pr-1.5 pl-1.5 text-[13px] rounded-md hover:bg-corporate-green/10 hover:text-corporate-green text-right transition-colors"
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
                  className="flex w-full items-center justify-between py-1 pr-1.5 pl-1.5 text-[13px] font-medium hover:bg-gray-50 rounded-md"
                >
                  <ChevronDown 
                    className={cn(
                      "h-3 w-3 transition-transform duration-200",
                      isLevel2Open && "rotate-180"
                    )} 
                  />
                  <span>{level2Item.title}</span>
                </button>

                {/* محتوى المستوى 3 */}
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isLevel2Open ? "max-h-[20rem] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="pl-2 mt-1 space-y-0.5">
                    {level2Item.children!.map((level3Item) => (
                      <Link
                        key={level3Item.href}
                        href={level3Item.href}
                        onClick={closeSheet}
                        className="block py-0.5 pr-1.5 pl-1.5 text-xs rounded-md hover:bg-corporate-green/10 hover:text-corporate-green text-right transition-colors"
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