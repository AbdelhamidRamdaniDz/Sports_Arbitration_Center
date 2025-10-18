"use client"
import * as React from "react";
import { useEffect, useState } from "react";

export default function CtaSection() {
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
    
    const section = document.querySelector('section.py-20.bg-corporate-green');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-20 text-corporate-green">
      {/* Background gradient + subtle pattern */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#f8fafb] to-[#eef2f6]" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-teal-300/20 blur-3xl" />
        <svg className="absolute inset-x-0 top-0 h-full w-full opacity-[0.08]" aria-hidden>
          <defs>
            <pattern id="grid-energy" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-energy)" className="text-corporate-green" />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-600 ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-5"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-slate-900">هل أنت مستعد للانتقال إلى مستقبل الطاقة المستدامة؟</h2>
            <p className="mb-8 max-w-2xl mx-auto text-gray-600 leading-relaxed">
              تواصل معنا اليوم لمناقشة احتياجاتك واكتشاف كيف يمكننا مساعدتك في تحقيق أهدافك في مجال الطاقة.
            </p>
            <button
              className="bg-gradient-to-r from-corporate-green to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:from-corporate-green/90 hover:to-teal-500/90 transition-all shadow-lg hover:scale-[1.03] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              تواصل معنا الآن
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}