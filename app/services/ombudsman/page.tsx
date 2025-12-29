import React from 'react';
import { ArrowLeft, BarChart3, AlertCircle, Target, TrendingUp, Shield, Database, Globe } from 'lucide-react';
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function OmbudsmanPage() {
  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <Header />

      {/* Hero Section with Background Image */}
      <section className="relative overflow-hidden pt-8 pb-24 md:pt-10 md:pb-32">
        <div className="absolute inset-0 z-0">
          <img 
            src="/ombudsman.jpg" 
            alt="Observatory Background"
            className="w-full h-full object-cover"
          />
          
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-5xl text-right">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Shield className="w-4 h-4" />
              <span>منصة رصد وتحليل النزاعات</span>
            </div>
            
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl md:text-7xl">
              المرصد – تحكيم تاك 
            </h1>
            
            <p className="text-base font-semibold text-emerald-400 mb-3 tracking-wide">
              TSAC - Dispute Resolution Observatory
            </p>
            
            <p className="text-2xl font-bold text-slate-800 mb-6 tracking-wide">
              Insight. Prevention. Good Governance
            </p>
            
            <p className="mb-10 max-w-3xl text-xl leading-relaxed text-slate-900 text-right">
              أداة ذكية لرصد وتحليل النزاعات في مختلف القطاعات، مع كشف مواطن الخلل بشكل استباقي قبل تفاقمها، ودعم الحوكمة الرشيدة والتحول الرقمي.
            </p>
            
            <div className="flex flex-col items-end justify-end gap-4 sm:flex-row">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                استكشف المرصد
              </button>
              <button className="bg-emerald-600 border-2 border-emerald-400 text-white hover:bg-emerald-50 hover:text-black px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center gap-2">
                <span>العودة للخدمات</span>
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section with Image */}
      <section className="relative py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Database className="w-4 h-4" />
                <span>نظام متكامل للرصد والتحليل</span>
              </div>
              
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                ما هو المرصد الرقمي للنزاعات؟
              </h2>
              
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                المرصد الرقمي للنزاعات هو أداة تهدف إلى رصد وتحليل النزاعات في مختلف القطاعات، وكشف مواطن الخلل بشكل استباقي قبل تفاقمها.
              </p>
              
              <p className="text-lg text-slate-700 leading-relaxed">
                يجمع المرصد البيانات من الشكاوى، التحكيم، الوساطة، وأمانة المظالم، ليُنتج تقارير دقيقة وموثوقة لكل قطاع. هذه التقارير تساعد في اتخاذ القرارات الاستراتيجية، تحسين جودة الخدمات، تعزيز الشفافية، ودعم الحوكمة الرشيدة.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl transform rotate-3"></div>
              <img 
                src="/analyse.jpg" 
                alt="Data Analysis"
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Functions Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-50 to-emerald-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <BarChart3 className="w-4 h-4" />
                <span>مميزات وإمكانيات متقدمة</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">وظائف المرصد</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <BarChart3 className="w-8 h-8" />,
                  title: "لوحة معلومات Dashboard",
                  desc: "عرض الإحصاءات في الوقت الحقيقي"
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "تقارير دورية",
                  desc: "حول النزاعات التجارية، الرياضية، الاقتصادية، وقطاع الطاقة"
                },
                {
                  icon: <AlertCircle className="w-8 h-8" />,
                  title: "نظام إنذار مبكر",
                  desc: "للتنبؤ بالنزاعات المحتملة قبل وقوعها"
                },
                {
                  icon: <Database className="w-8 h-8" />,
                  title: "تحليل بيانات متقدم",
                  desc: "مرتبط بخدمات التحكيم والوساطة لضمان حلول فعالة"
                },
                {
                  icon: <Target className="w-8 h-8" />,
                  title: "مؤشرات KPIs",
                  desc: "قياس فعالية التسوية البديلة للنزاعات وتحسين الأداء المستمر"
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "حماية وخصوصية",
                  desc: "تأمين البيانات وضمان السرية التامة"
                }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-slate-100 hover:border-emerald-200 group">
                  <div className="text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="relative py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Target className="w-4 h-4" />
                <span>رؤية استراتيجية شاملة</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">أهداف المرصد</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "الوقاية قبل الأزمة: تنبيه القطاعات قبل تفاقم النزاعات",
                "دعم اتخاذ القرار الاستراتيجي: استنادًا إلى بيانات دقيقة وموثوقة لكل قطاع",
                "تحسين جودة الخدمات وتقليل النزاعات المتكررة",
                "تعزيز الحوكمة والشفافية: عبر تقارير وتحليلات موثوقة وموضوعية",
                "تخصيص البيانات والتحليلات: لضمان سرية المعلومات وسهولة الوصول لكل فئة",
                "تحويل النزاعات إلى فرص تطوير: متابعة وتحليل النتائج لدعم التطوير المستمر",
                "تعزيز البحث العلمي: توفير قاعدة بيانات لتسهيل الدراسات الأكاديمية والمهنية",
                "دعم التحوّل الرقمي للعدالة: مساهمة في رؤية الجزائر 2030 نحو رقمنة الخدمات القانونية"
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start bg-gradient-to-br from-emerald-50 to-white p-6 rounded-xl border border-emerald-100 hover:shadow-lg transition-all">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <p className="text-slate-700 leading-relaxed pt-1">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Globe className="w-4 h-4" />
              <span>تغطية شاملة لجميع القطاعات</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-6">القطاعات والصناعات</h2>
            
            <p className="text-xl leading-relaxed mb-8 text-emerald-50">
              شملت القضايا المرفوعة عام 2025 مجموعة واسعة من القطاعات
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              {[
                "الطاقة",
                "الرياضة",
                "الشباب",
                "الصحة",
                "البناء والهندسة",
                "التأمين",
                "التعليم العالي",
                "المؤسسات الناشئة",
                "العقارات",
                "الممتلكات"
              ].map((sector, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all border border-white/20">
                  <p className="font-semibold">{sector}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}