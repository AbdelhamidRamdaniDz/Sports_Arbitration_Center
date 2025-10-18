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
    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
      <div className="w-full lg:w-1/2 order-2 lg:order-1">
        <div className={`relative animate-slide-right ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-corporate-green/10 rounded-full"></div>
          <div className="relative overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-200/60 bg-white">
            <Image
              src="/images/energy-plant.jpg"
              alt="صورة تعبيرية"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"></div>
          </div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-corporate-green/10 rounded-full"></div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 order-1 lg:order-2">
        <div className={`animate-slide-up ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-corporate-green mb-4 tracking-tight">من نحن</h2>

          <p className={`text-gray-700 mb-4 leading-relaxed animate-slide-up animate-delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            نحن مركز متخصص في التحكيم والوساطة، نقدم حلولًا قانونية احترافية لحل النزاعات بعيدًا عن المسارات القضائية التقليدية، مع ضمان الحياد والسرية والسرعة في البتّ في القضايا.
          </p>

          <p className={`text-gray-700 mb-4 leading-relaxed animate-slide-up animate-delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            نقدم خدمات شاملة تغطي مجالات متعددة مثل التجارة، الاستثمار، العقار، الطاقة، والرياضة، بما يتوافق مع الإطار القانوني والمعايير المعتمدة في فض المنازعات داخل الجزائر وخارجها.
          </p>

          <p className={`text-gray-700 leading-relaxed animate-slide-up animate-delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            يعمل فريقنا بمهنية عالية ويضم محكمين وخبراء في مجالات متعددة، ملتزمين بتقديم خدمات موثوقة تسهم في حماية الحقوق وحل الخلافات بكفاءة وعدالة.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}