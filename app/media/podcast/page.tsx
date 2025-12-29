"use client"
import { Header } from "@/components/header"
import Image from "next/image"

export default function PodcastPage() {

  return (
    <div>
      <Header />
      <div dir="rtl" className="max-h-screen font-sans px-4">
        <div className="w-full mx-auto">
          {/* Hero Section with Background Image */}
          <div className="relative rounded-2xl shadow-2xl overflow-hidden mb-12 max-h-screen" style={{backgroundImage: 'url(/podcast.jpg)', backgroundSize: '100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 "></div>
            
            <div className="relative max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12 z-10">
              {/* Content */}
              <div className="flex flex-col justify-center items-center text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-black mb-3 drop-shadow-2xl">
                  بودكاست تحكيم تيك
                </h1>
                
                <p className="text-lg md:text-2xl text-blue-300 font-semibold mb-6 drop-shadow-lg">
                  The Tahkeem Tech Podcast
                </p>

                {/* Platform Icons Strip */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/30 shadow-xl max-w-md mx-auto">
                  <div className="flex items-center justify-center gap-8 flex-wrap">
                    {/* Apple Podcasts */}
                    <a href="#" className="hover:scale-110 transition-transform duration-300" title="Apple Podcasts">
                      <svg className="h-7 w-7 text-blue-700 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.182c5.423 0 9.818 4.395 9.818 9.818 0 5.423-4.395 9.818-9.818 9.818-5.423 0-9.818-4.395-9.818-9.818 0-5.423 4.395-9.818 9.818-9.818zM12 5.455a4.364 4.364 0 00-4.364 4.363c0 .4.054.788.156 1.157a.545.545 0 101.042-.303 3.273 3.273 0 01-.107-.854c0-1.808 1.465-3.273 3.273-3.273s3.273 1.465 3.273 3.273c0 .297-.04.586-.115.863a.545.545 0 101.046.294c.096-.369.16-.75.16-1.157A4.364 4.364 0 0012 5.455zm0 2.909c-.803 0-1.455.652-1.455 1.454 0 .803.652 1.455 1.455 1.455s1.455-.652 1.455-1.455c0-.802-.652-1.454-1.455-1.454zm0 4.363c-1.006 0-1.818.812-1.818 1.819v4.363c0 1.006.812 1.818 1.818 1.818s1.818-.812 1.818-1.818v-4.363c0-1.007-.812-1.819-1.818-1.819z"/>
                      </svg>
                    </a>
                    
                    {/* Spotify */}
                    <a href="#" className="hover:scale-110 transition-transform duration-300" title="Spotify">
                      <svg className="h-7 w-7 text-blue-700 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    </a>
                    
                    {/* Google Podcasts */}
                    <a href="#" className="hover:scale-110 transition-transform duration-300" title="Google Podcasts">
                      <svg className="h-7 w-7 text-blue-700 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M1.5 10.8h3v2.4h-3zm0-6h3v4.2h-3zm0 12h3v4.2h-3zM7.5 4.8h3V12h-3zm0 9h3v7.2h-3zm6-9h3v4.2h-3zm0 6h3v7.2h-3zm0-12h3v4.2h-3zm6 3h3v7.2h-3zm0 9h3v4.2h-3zm0-15h3v4.2h-3z"/>
                      </svg>
                    </a>
                    
                    {/* YouTube */}
                    <a href="#" className="hover:scale-110 transition-transform duration-300" title="YouTube">
                      <svg className="h-7 w-7 text-blue-700 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                
                <p className="text-base md:text-lg text-black font-bold mb-4 drop-shadow-lg">
                  مستقبل التحكيم في عصر التكنولوجيا
                </p>

                <p className="text-sm md:text-base text-black/95 leading-relaxed mb-6 drop-shadow-md">
                  قريبًا… نفتح آفاقًا جديدة للعدالة الرقمية!
                </p>

                <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/30 shadow-2xl max-w-2xl mx-auto">
                  <p className="text-black text-base leading-relaxed drop-shadow-md">
                    انتظرونا في بودكاست <span className="font-bold">The Tahkeem Tech</span>، حيث نأخذكم في رحلة صوتية لاستكشاف مستقبل تسوية النزاعات عبر الإنترنت. نستضيف نخبة من كبار المحكّمين وخبراء القانون ورواد التكنولوجيا، لمناقشة أحدث الابتكارات التي تُعيد تشكيل المشهد القانوني المعاصر.
                  </p>
                </div>
                
                <div className="flex flex-col items-center gap-4">
                  <button 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/50"
                  >
                    اشترك الآن
                  </button>
                  <p className="text-sm md:text-base text-black/90 drop-shadow-md">
                    كونوا على الموعد، وكونوا من أوائل من يكتشفون حلقاتنا الأولى!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}