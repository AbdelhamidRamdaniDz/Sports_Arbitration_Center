"use client"
import * as React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AboutSection() {
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
    
    const section = document.getElementById("about");
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div
              className={`relative animate-slide-right ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-corporate-green/10 rounded-full"></div>
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/energy-plant.jpg"
                  alt="منشأة طاقة"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-corporate-green/10 rounded-full"></div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div
              className={`animate-slide-up ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-corporate-green mb-6">من نحن</h2>
              <p 
                className={`text-gray-600 mb-4 animate-slide-up animate-delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                نحن شركة رائدة في مجال الطاقة، نسعى لتقديم حلول مستدامة ومبتكرة تلبي احتياجات عملائنا وتساهم في تطوير قطاع الطاقة في الجزائر.
              </p>
              <p 
                className={`text-gray-600 mb-4 animate-slide-up animate-delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                تأسست الشركة عام 2010، ومنذ ذلك الحين ونحن نعمل على تطوير خدماتنا وتوسيع نطاق أعمالنا لنصبح من أهم الشركات في مجال الطاقة على المستوى الوطني والإقليمي.
              </p>
              <p 
                className={`text-gray-600 animate-slide-up animate-delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                نمتلك فريقًا من الخبراء والمتخصصين في مختلف مجالات الطاقة، ونعمل وفق أحدث المعايير العالمية لضمان تقديم خدمات عالية الجودة لعملائنا.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}