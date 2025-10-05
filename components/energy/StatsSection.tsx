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
          <h2 className="text-3xl md:text-4xl font-bold text-corporate-green mb-4">الأرقام تتحدث عن نفسها</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">إحصائيات وأرقام تعكس حجم قطاع الطاقة في الجزائر وأهميته الاستراتيجية</p>
        </div>

        <div 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in animate-delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border-t-4 border-corporate-green transition-scale hover-scale animate-slide-up ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 * index + 0.3}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center text-corporate-green">
                <AnimatedCounter 
                  end={stat.value} 
                  duration={2.5} 
                />
                <span className="mr-1">{stat.unit}</span>
              </div>
              <div className="text-gray-700 text-center">{stat.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}