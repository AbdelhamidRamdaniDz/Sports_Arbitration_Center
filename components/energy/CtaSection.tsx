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
    <section className="py-20 bg-corporate-green text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-600 ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-5"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">هل أنت مستعد للانتقال إلى مستقبل الطاقة المستدامة؟</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              تواصل معنا اليوم لمناقشة احتياجاتك واكتشاف كيف يمكننا مساعدتك في تحقيق أهدافك في مجال الطاقة.
            </p>
            <button
              className="bg-white text-corporate-green px-8 py-3 rounded-full font-bold hover:bg-white/90 transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              تواصل معنا الآن
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}