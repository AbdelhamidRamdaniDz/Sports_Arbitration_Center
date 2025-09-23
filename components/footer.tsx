import Link from "next/link"
import { Scale, Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="bg-corporate-green text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-corporate-green">
                <Scale className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">{SITE_CONFIG.name}</span>
                <span className="text-sm opacity-80">{SITE_CONFIG.nameEn}</span>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              مركز متخصص في التحكيم والوساطة الرياضية، يقدم خدمات قانونية متميزة للمؤسسات والأفراد في القطاع الرياضي
              بأعلى معايير الجودة والمهنية.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
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
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">خدماتنا</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm opacity-90">التحكيم الرياضي</span>
              </li>
              <li>
                <span className="text-sm opacity-90">الوساطة القانونية</span>
              </li>
              <li>
                <span className="text-sm opacity-90">التدريب والتأهيل</span>
              </li>
              <li>
                <span className="text-sm opacity-90">الاستشارات القانونية</span>
              </li>
              <li>
                <span className="text-sm opacity-90">القاعات المجهزة</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">تواصل معنا</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 opacity-80" />
                <span className="text-sm">+966 11 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 opacity-80" />
                <span className="text-sm">info@sports-arbitration.sa</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 opacity-80" />
                <span className="text-sm">الرياض، المملكة العربية السعودية</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">فيسبوك</span>
              </Link>
              <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">تويتر</span>
              </Link>
              <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">لينكد إن</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm opacity-80">© 2024 مركز التحكيم الرياضي. جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                سياسة الخصوصية
              </Link>
              <Link href="/terms-of-use" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                الشروط والأحكام
              </Link>
              <Link href="/legal" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                الإشعارات القانونية
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
