"use client"
import { Header } from "@/components/header"
import { Mic2, Sparkles } from "lucide-react"

export default function PodcastPage() {
  return (
    <div>
      <Header />
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 font-sans flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          {/* Main Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
            {/* Header Section with Gradient */}
            <div className="bg-gradient-to-l from-green-600 to-emerald-500 p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="bg-white/20 backdrop-blur-md rounded-full p-4 mb-6">
                  <Mic2 className="h-12 w-12 md:h-16 md:w-16" />
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-3">
                  بودكاست تحكيم تيك
                </h1>
                
                <p className="text-lg md:text-xl text-green-50 font-medium mb-2">
                  The Tahkeem Tech Podcast
                </p>
                
                <div className="flex items-center gap-2 mt-4">
                  <Sparkles className="h-5 w-5 text-yellow-300" />
                  <p className="text-base md:text-lg text-green-50">
                    مستقبل التحكيم في عصر التكنولوجيا
                  </p>
                  <Sparkles className="h-5 w-5 text-yellow-300" />
                </div>
              </div>
            </div>

            {/* Platform Icons Strip */}
            <div className="bg-gradient-to-l from-slate-800 to-slate-700 py-4 px-6">
              <div className="flex items-center justify-center gap-6 md:gap-8 flex-wrap">
                <span className="text-slate-300 text-sm font-medium">متوفر قريباً على:</span>
                <div className="flex items-center gap-4 md:gap-6">
                  {/* Apple Podcasts */}
                  <svg className="h-6 w-6 md:h-7 md:w-7 text-white hover:text-green-400 transition-colors cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.182c5.423 0 9.818 4.395 9.818 9.818 0 5.423-4.395 9.818-9.818 9.818-5.423 0-9.818-4.395-9.818-9.818 0-5.423 4.395-9.818 9.818-9.818zM12 5.455a4.364 4.364 0 00-4.364 4.363c0 .4.054.788.156 1.157a.545.545 0 101.042-.303 3.273 3.273 0 01-.107-.854c0-1.808 1.465-3.273 3.273-3.273s3.273 1.465 3.273 3.273c0 .297-.04.586-.115.863a.545.545 0 101.046.294c.096-.369.16-.75.16-1.157A4.364 4.364 0 0012 5.455zm0 2.909c-.803 0-1.455.652-1.455 1.454 0 .803.652 1.455 1.455 1.455s1.455-.652 1.455-1.455c0-.802-.652-1.454-1.455-1.454zm0 4.363c-1.006 0-1.818.812-1.818 1.819v4.363c0 1.006.812 1.818 1.818 1.818s1.818-.812 1.818-1.818v-4.363c0-1.007-.812-1.819-1.818-1.819z"/>
                  </svg>
                  
                  {/* Spotify */}
                  <svg className="h-6 w-6 md:h-7 md:w-7 text-white hover:text-green-400 transition-colors cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  
                  {/* Google Podcasts */}
                  <svg className="h-6 w-6 md:h-7 md:w-7 text-white hover:text-green-400 transition-colors cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1.5 10.8h3v2.4h-3zm0-6h3v4.2h-3zm0 12h3v4.2h-3zM7.5 4.8h3V12h-3zm0 9h3v7.2h-3zm6-9h3v4.2h-3zm0 6h3v7.2h-3zm0-12h3v4.2h-3zm6 3h3v7.2h-3zm0 9h3v4.2h-3zm0-15h3v4.2h-3z"/>
                  </svg>
                  
                  {/* YouTube */}
                  <svg className="h-6 w-6 md:h-7 md:w-7 text-white hover:text-green-400 transition-colors cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 text-center">
                  قريبًا… نفتح آفاقًا جديدة للعدالة الرقمية!
                </h2>
                
                <div className="bg-gradient-to-l from-green-50 to-emerald-50 rounded-xl p-6 border-r-4 border-green-600">
                  <p className="text-slate-700 leading-relaxed text-base md:text-lg">
                    انتظرونا في بودكاست <span className="font-bold text-green-600">The Tahkeem Tech</span>، حيث نأخذكم في رحلة صوتية لاستكشاف مستقبل تسوية النزاعات عبر الإنترنت. نستضيف نخبة من كبار المحكّمين وخبراء القانون ورواد التكنولوجيا، لمناقشة أحدث الابتكارات التي تُعيد تشكيل المشهد القانوني المعاصر.
                  </p>
                </div>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col items-center gap-4">
                <button 
                  disabled 
                  className="bg-gradient-to-l from-green-600 to-emerald-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg opacity-60 cursor-not-allowed w-full md:w-auto transition-all"
                >
                  اشترك في البودكاست
                </button>
                
                <p className="text-slate-500 text-sm text-center">
                  كونوا على الموعد، وكونوا من أوائل من يكتشفون حلقاتنا الأولى!
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium">قريباً على جميع المنصات</span>
              <Sparkles className="h-4 w-4 text-yellow-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}