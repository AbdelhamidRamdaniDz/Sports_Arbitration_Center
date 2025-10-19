"use client"
import * as React from "react";
import { useEffect, useState } from "react";
import { EnergyStat } from "@/lib/energy-types";
import { AnimatedCounter } from "@/components/animated-counter";

interface StatsSectionProps {
  stats: EnergyStat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById("stats");
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  return (
    <section id="stats" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-12 animate-slide-up ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-corporate-green mb-3 tracking-tight">مؤشرات قطاع الطاقة</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">بيانات مرجعية عامة لقياس سياق السوق في الجزائر، تُحدّث دورياً وتعتمد على مصادر موثوقة</p>
        </div>

        <div 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 animate-fade-in animate-delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-slate-200/60 hover:border-corporate-green/40 ring-1 ring-transparent hover:ring-corporate-green/20 animate-slide-up ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 * index + 0.3}s` }}
            >
              <div className="text-3xl md:text-4xl font-extrabold mb-2 flex items-center justify-center text-corporate-green tracking-tight">
                <AnimatedCounter 
                  end={stat.value} 
                  duration={2.5} 
                />
                <span className="mr-1 text-slate-700 font-semibold">{stat.unit}</span>
              </div>
              <div className="text-gray-700 text-center leading-relaxed">{stat.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}