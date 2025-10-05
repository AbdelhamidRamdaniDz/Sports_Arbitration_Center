"use client";

import { useState, useEffect } from "react";

export default function AdvantagesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  
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
    
    const section = document.querySelector('section.py-16.bg-gray-50');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const advantages = [
    {
      title: "خبرة متخصصة",
      description: "فريق من المحامين والمستشارين ذوي خبرة واسعة في قطاع الطاقة محلياً ودولياً.",
      icon: "expertise"
    },
    {
      title: "معرفة تقنية",
      description: "فهم عميق للجوانب التقنية والتشغيلية لمشاريع الطاقة بمختلف أنواعها.",
      icon: "technical"
    },
    {
      title: "شبكة علاقات واسعة",
      description: "شراكات استراتيجية مع مؤسسات محلية ودولية في قطاع الطاقة والقانون.",
      icon: "network"
    }
  ];

  // Icons mapping
  const getIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      expertise: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
      technical: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      ),
      network: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      )
    };
    
    return icons[iconName] || icons.expertise;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          className={`text-center mb-12 animate-fade-in animate-slide-up ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">لماذا نحن؟</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            نجمع بين الخبرة القانونية والمعرفة التقنية لتقديم حلول متكاملة في قطاع الطاقة
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-corporate-green/5 animate-fade-in animate-slide-up ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-corporate-green/10 rounded-full flex items-center justify-center mb-4 text-corporate-green">
                {getIcon(advantage.icon)}
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
              <p className="text-gray-600">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}