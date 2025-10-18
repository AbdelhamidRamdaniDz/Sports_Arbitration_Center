"use client"
import * as React from "react";
import { useEffect, useState } from "react";
import { EnergyStat } from "@/lib/energy-types";
import { AnimatedCounter } from "@/components/animated-counter";

interface HeroSectionProps {
  stats: EnergyStat[];
}

export default function HeroSection({ stats }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section className="relative min-h-screen overflow-hidden text-white">
      {/* Dynamic Background with Moving Particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900">
        {/* Animated Mesh Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 1px, transparent 1px),
              radial-gradient(circle at 40% 80%, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px, 150px 150px, 200px 200px',
            animation: 'meshMove 20s ease-in-out infinite'
          }}></div>
        </div>
        
        {/* Geometric Lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent animate-line-sweep"></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent animate-line-sweep-delayed"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent animate-line-sweep-slow"></div>
        </div>
      </div>
      
      {/* Hexagonal Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, transparent 20px, rgba(255,255,255,0.1) 21px, rgba(255,255,255,0.1) 22px, transparent 23px)
          `,
          backgroundSize: '60px 60px',
          animation: 'hexRotate 30s linear infinite'
        }}></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center min-h-[80vh]">
          
          {/* Left Side - Main Content */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10 xl:space-y-12 order-2 lg:order-1">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-white/90 text-xs sm:text-sm font-medium shadow-sm ring-1 ring-white/10 animate-slide-up ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-center sm:text-right">خبراء قانونيون متخصصون</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <h1 className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl font-extrabold leading-tight sm:leading-tight animate-slide-up animate-delay-200 tracking-tight ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <span className="block text-white font-light">خبرة قانونية</span>
                <span className="block bg-gradient-to-r from-emerald-300 via-teal-300 to-blue-300 bg-clip-text text-transparent">
                  متخصصة في
                </span>
                <span className="block text-white font-extrabold tracking-tight">
                  مجال الطاقة
                </span>
              </h1>
            </div>
            
            {/* Description */}
            <p className={`text-white/85 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl animate-slide-up animate-delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              نقدم خدمات قانونية متكاملة للشركات والمؤسسات العاملة في قطاع الطاقة في الجزائر، بما في ذلك النفط والغاز والطاقة المتجددة
            </p>
            
            {/* Action Buttons */}
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 animate-slide-up animate-delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <button className="group relative bg-white text-emerald-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg shadow-2xl transition-all duration-300 transform hover:scale-[1.03] hover:shadow-white/25 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-700"> 
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                  <span>تواصل معنا</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              
              <button className="group relative bg-transparent border-2 border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.03] hover:border-white/60 hover:bg-white/10 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-700"> 
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  <span>خدماتنا</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
          
          {/* Right Side - Stats Grid */}
          <div className={`order-1 lg:order-2 animate-slide-up animate-delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={stat.id} 
                  className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 transition-all duration-500 transform hover:scale-[1.03] hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-white/10 focus-within:outline-none focus-within:ring-2 focus-within:ring-white/30"
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  {/* Corner Decoration */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-emerald-300/50 rounded-tr-lg"></div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-1 md:gap-2 text-center">
                      <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold bg-gradient-to-r from-emerald-300 via-teal-300 to-blue-300 bg-clip-text text-transparent break-words break-all max-w-full">
                        <AnimatedCounter 
                          end={stat.value} 
                          duration={2.5} 
                        />
                      </span>
                      <span className="text-white/70 text-sm sm:text-base md:text-lg lg:text-xl ml-0 md:mr-1">{stat.unit}</span>
                    </div>
                    <div className="text-white/80 text-xs sm:text-sm font-medium leading-tight">
                      {stat.title}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 h-0.5 sm:h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full transition-all duration-1000"
                      style={{
                        width: '0%',
                        animation: `progressFill 2s ease-out ${index * 0.3}s forwards`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
      
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes meshMove {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-10px, -5px) rotate(1deg); }
          66% { transform: translate(5px, -10px) rotate(-1deg); }
        }
        
        @keyframes hexRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes lineSweep {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes progressFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .animate-mesh-move {
          animation: meshMove 20s ease-in-out infinite;
        }
        
        .animate-hex-rotate {
          animation: hexRotate 30s linear infinite;
        }
        
        .animate-line-sweep {
          animation: lineSweep 4s ease-in-out infinite;
        }
        
        .animate-line-sweep-delayed {
          animation: lineSweep 4s ease-in-out infinite 1s;
        }
        
        .animate-line-sweep-slow {
          animation: lineSweep 6s ease-in-out infinite 2s;
        }
      `}</style>
    </section>
  );
}