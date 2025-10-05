"use client"
import * as React from "react";
import { useEffect, useState } from "react";
import { EnergyService } from "@/lib/energy-types";

interface ServicesSectionProps {
  services: EnergyService[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
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
    
    const section = document.getElementById("services");
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 animate-slide-up ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-corporate-green mb-4">خدماتنا في قطاع الطاقة</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">نقدم مجموعة متكاملة من الخدمات المتخصصة في مجال الطاقة لتلبية احتياجات عملائنا</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all border-b-4 border-corporate-green transition-scale hover-scale animate-slide-up ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 * index + 0.2}s` }}
            >
              <div className="w-16 h-16 bg-corporate-green/10 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                <span className="text-2xl text-corporate-green">{service.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center md:text-right">{service.title}</h3>
              <p className="text-gray-600 text-center md:text-right">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}