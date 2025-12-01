import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"
import Image from "next/image"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer dir="rtl" className="text-white bg-corporate-green">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3 md:gap-3.5">
              <Image
                src="/logo.png"
                alt={`${SITE_CONFIG.name} logo`}
                width={60}
                height={60}
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
                <div className="text-[9px] md:text-[10px] font-bold text-white tracking-wider">
                  TRADE & SPORTS ARBITRATION CENTER
                </div>
              </div>
            </Link>
            <p className="text-sm/6 opacity-90 leading-relaxed">
              مركز متخصص في التحكيم والوساطة الرياضية، نقدّم حلولًا قانونية عملية ومتوازنة للمؤسسات والأفراد وفق أفضل
              المعايير المهنية.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold">روابط سريعة</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about/overview" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  الخدمات
                </Link>
              </li>
              <li>
                <Link href="/disputes" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  النزاعات والأحكام
                </Link>
              </li>
              <li>
                <Link href="/members" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  قائمة الأعضاء
                </Link>
              </li>
              <li>
                <Link href="/forms" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  النماذج الرقمية
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold">خدماتنا</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/arbitration/sports-arbitration" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  التحكيم الرياضي
                </Link>
              </li>
              <li>
                <Link href="/services/legal-mediation" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  الوساطة القانونية
                </Link>
              </li>
              <li>
                <Link href="/services/training" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  التدريب والتأهيل
                </Link>
              </li>
              <li>
                <Link href="/services/legal-consultation" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  الاستشارات القانونية
                </Link>
              </li>
              <li>
                <Link href="/services/equipped-halls" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  القاعات المجهزة
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold">تواصل معنا</h3>
            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 opacity-85" />
                <span className="text-sm ltr">+213 668631580</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 opacity-85" />
                <span className="text-sm">info@sports-arbitration.dz</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 opacity-85" />
                <span className="text-sm">جامعة الجلفة، الجمهورية الجزائرية الديمقراطية الشعبية</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="#"
                className="group inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:-translate-y-0.5"
                aria-label="فيسبوك"
              >
                <Facebook className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              </Link>
              <Link
                href="#"
                className="group inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:-translate-y-0.5"
                aria-label="تويتر"
              >
                <Twitter className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              </Link>
              <Link
                href="#"
                className="group inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:-translate-y-0.5"
                aria-label="لينكد إن"
              >
                <Linkedin className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/20 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm opacity-85">© {year} {SITE_CONFIG.name}. جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                سياسة الخصوصية
              </Link>
              <Link href="/terms-of-use" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                الشروط والأحكام
              </Link>
              <Link href="/legal" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                الإشعارات القانونية
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
