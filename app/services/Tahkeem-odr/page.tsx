import React from 'react';
import { Shield, Zap, DollarSign, Globe, Award, FileText, Video, Bell, Lock, Clock } from 'lucide-react';
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ODRPage() {
  const features = [
    {
      title: "السرعة والكفاءة",
      description: "تسوية النزاعات في أسابيع بدل سنوات، عبر إجراءات رقمية مبسطة وواجهة استخدام سهلة وسريعة",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: "تكلفة اقتصادية وشفافة",
      description: "تقليل كبير في التكاليف مع رسوم واضحة وتنافسية دون أي مصاريف خفية",
      icon: <DollarSign className="h-6 w-6" />,
    },
    {
      title: "سهولة الوصول والمرونة",
      description: "إدارة النزاع من أي مكان وفي أي وقت (24/7) مع جدولة مرنة للجلسات الافتراضية",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      title: "الأمن والسرية",
      description: "بيئة رقمية مؤمّنة بتقنيات تشفير متقدمة تضمن السرية التامة للبيانات والملفات",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: "حجية قانونية وخبرات متخصصة",
      description: "قرارات ملزمة قانونيًا يشرف عليها محكمون ووسطاء معتمدون ذوو خبرة عالية",
      icon: <Award className="h-6 w-6" />,
    },
  ];

  const steps = [
    {
      number: 1,
      title: "التسجيل ورفع ملف القضية",
      description: "قم بإنشاء حساب ورفع ملف القضية إلكترونياً بكل سهولة",
    },
    {
      number: 2,
      title: "اختيار المحكم أو الوسيط",
      description: "اختر المحكم أو الوسيط المناسب من القائمة الذكية",
    },
    {
      number: 3,
      title: "حضور الجلسات وتبادل الأدلة",
      description: "احضر جلسات الفيديو المشفرة وقم بتبادل الأدلة إلكترونياً",
    },
    {
      number: 4,
      title: "استلام الحكم القانوني",
      description: "استلم الحكم القانوني موقعاً إلكترونياً وله حجية قانونية",
    },
  ];

  const securityFeatures = [
    {
      icon: <Lock className="h-8 w-8" />,
      title: "تشفير متقدم",
      description: "البيانات مشفرة بنفس تقنيات تطبيقات البنوك لضمان الأمان الكامل",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "خوادم محمية",
      description: "الجلسات مخزنة في خوادم وطنية محمية ولا يمكن تسريبها",
    },
  ];

  const dashboardFeatures = [
    {
      icon: <Clock className="h-6 w-6" />,
      text: "كم تبقى من الوقت ليصدر الحكم؟",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      text: "ما هي الوثائق التي قدمها الطرف الآخر؟",
    },
    {
      icon: <Bell className="h-6 w-6" />,
      text: "تنبيهات بالمواعيد القادمة",
    },
  ];

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Header />
      
      {/* Header Image */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img 
          src="/tsac.jpg" 
          alt="Tahkeem Tech - ODR" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-emerald-900/50 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-5xl animate-fade-in">
            <div className="inline-block mb-6 px-6 py-2 bg-emerald-600/20 backdrop-blur-sm border border-white/30 rounded-full">
              <span className="text-sm md:text-base font-semibold">منصة رقمية متكاملة</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">Tahkeem Tech - ODR</h1>
            <p className="text-xl md:text-3xl font-light mb-8 drop-shadow-lg">نقلة نوعية في تسوية النزاعات التجارية والرياضية</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/forms" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-2xl hover:shadow-emerald-500/50 hover:scale-105">
                ابدأ الآن
              </a>
              <a href="/forms/free-consultation" className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-2 border-white/50 px-8 py-4 rounded-full text-lg font-semibold transition-all">
                استشارة مجانية
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white mb-6 shadow-xl shadow-emerald-600/30 hover:scale-110 transition-transform">
                <Video className="h-10 w-10" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800 mb-8">
                ما هو نظام ODR في Tahkeem Tech؟
              </h2>
            </div>
            
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 hover:shadow-emerald-600/10 transition-shadow">
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-emerald-600 rounded-full mt-3"></div>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    يُمثّل نظام ODR في منصة Tahkeem Tech المرحلة الرقمية المتقدمة من آليات تسوية النزاعات البديلة (ADR)، 
                    حيث تُدار جميع مراحل النزاع إلكترونيًا بالكامل، ابتداءً من إيداع الطلبات والوثائق، مرورًا بإجراءات 
                    التحكيم أو الوساطة، وصولًا إلى إصدار الحكم أو اتفاق التسوية، وذلك ضمن بيئة رقمية آمنة وموثوقة عبر الإنترنت.
                  </p>
                </div>
                
                <div className="h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent"></div>
                
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-emerald-600 rounded-full mt-3"></div>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    يُجسّد نظام ODR في مركز التحكيم التجاري والرياضي نقلة نوعية في تسوية النزاعات التجارية والرياضية، 
                    من خلال تقديم بديل رقمي متكامل للإجراءات التقليدية. ويهدف هذا القسم إلى إبراز كيفية تمكين الشركات، 
                    المؤسسات، والأفراد في الجزائر من الاستفادة المثلى من حلولنا المبتكرة، بما يضمن السرعة، الكفاءة، 
                    والموثوقية في فض النزاعات.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-50 relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-emerald-600/10 backdrop-blur-sm border border-emerald-200 rounded-full">
              <span className="text-sm font-semibold text-emerald-700">مميزات استثنائية</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800 mb-4">
              لماذا تختار Tahkeem Tech لحل نزاعاتك إلكترونيًا؟
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-600/5 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white mb-6 shadow-lg shadow-emerald-600/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-emerald-600 mb-4 group-hover:text-emerald-700 transition-colors">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed text-base">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-emerald-600/10 backdrop-blur-sm border border-emerald-200 rounded-full">
              <span className="text-sm font-semibold text-emerald-700">خطوات بسيطة</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800 mb-4">كيف تعمل المنصة؟</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">عملية بسيطة وواضحة من البداية إلى النهاية</p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {steps.map((step, index) => (
                <div key={index} className="relative group">
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 right-0 w-full h-0.5 bg-gradient-to-l from-emerald-300 to-emerald-600 -mr-6 z-0"></div>
                  )}
                  
                  <div className="relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 hover:-translate-y-2 z-10">
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white text-3xl font-bold shadow-xl shadow-emerald-600/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                          {step.number}
                        </div>
                        <div className="absolute -inset-2 bg-emerald-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-emerald-600 mb-3 text-center min-h-[3rem] flex items-center justify-center">{step.title}</h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed text-center">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-6 py-2 bg-emerald-600/10 backdrop-blur-sm border border-emerald-200 rounded-full">
                <span className="text-sm font-semibold text-emerald-700">الأمان أولاً</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800 mb-4">
                هل أسراري في أمان؟
              </h2>
              <p className="text-xl text-gray-700">الأمن السيبراني في قلب نظامنا</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {securityFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 hover:-translate-y-2 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-emerald-600/5 to-transparent rounded-full -ml-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative z-10 text-center">
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-xl shadow-emerald-600/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                          {feature.icon}
                        </div>
                        <div className="absolute -inset-2 bg-emerald-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-emerald-600 mb-4 group-hover:text-emerald-700 transition-colors">{feature.title}</h3>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-6 py-2 bg-emerald-600/10 backdrop-blur-sm border border-emerald-200 rounded-full">
                <span className="text-sm font-semibold text-emerald-700">متابعة مباشرة</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800 mb-4">
                لوحة التحكم الشخصية
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                كل عميل سيكون لديه حساب شخصي (Dashboard) لمتابعة قضيته بكل شفافية
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-10 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
              <div className="space-y-6">
                {dashboardFeatures.map((feature, index) => (
                  <div 
                    key={index} 
                    className="group flex items-center gap-6 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 hover:-translate-x-2"
                  >
                    <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-600/30 flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <p className="text-lg md:text-xl text-gray-700 font-medium">{feature.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/30 mb-8 hover:scale-110 transition-transform duration-300">
              <Globe className="h-12 w-12" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">رؤيتنا</h2>
            <p className="text-2xl md:text-3xl leading-relaxed font-light">
              نطمح بأن نكون رواد عالميون في مجال حل النزاعات عبر الإنترنت
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl">
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-600 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-emerald-600/10 backdrop-blur-sm border border-emerald-200 rounded-full">
              <span className="text-sm font-semibold text-emerald-700">ابدأ رحلتك معنا</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800 mb-6">
              هل أنت جاهز للبدء؟
            </h2>
            <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
              انضم إلى منصة Tahkeem Tech واستفد من حلول تسوية النزاعات الإلكترونية المتطورة
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="/forms" 
                className="group bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-2xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10">اطلب هذه الخدمة الآن</span>
                <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </a>
              <a 
                href="/forms/free-consultation" 
                className="bg-white text-emerald-600 border-2 border-emerald-600 px-10 py-5 rounded-2xl text-xl font-semibold hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                استشارة مجانية
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}