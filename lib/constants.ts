export const SITE_CONFIG = {
  name: "Tahkeem",
  nameEn: "Trade & Sports Arbitration Center",
  description: "مركز متخصص في التحكيم والوساطة",
  descriptionEn: "Specialized center for arbitration and mediation",
  url: "https://sports-arbitration.com",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/sports-arbitration",
    linkedin: "https://linkedin.com/company/sports-arbitration",
  },
}

export const NAVIGATION_ITEMS = [
  {
    title: "من نحن",
    href: "/about",
    children: [
      {
        title: "عن المركز",
        href: "/about/overview",
        children: [
          {
            title: "نبذة",
            href: "/about/overview",
          },
          {
            title: "قيمنا",
            href: "/about/values",
          },
          {
            title: "شركاؤنا",
            href: "/about/partners",
          },
          {
            title: "الأسئلة الشائعة",
            href: "/faq",
          },
          {
            title: "الوظائف",
            href: "/careers",
          },
          {
            title: "اتصل بنا",
            href: "/contact",
          },
        ],
      },
      {
        title: "رؤية الجزائر 2030",
        href: "/about/digital-transformation",
        children: [
          {
            title: "التحول الرقمي",
            href: "/about/digital-transformation",
          },
          {
            title: "الالتزام بالمسؤولية الاجتماعية والاستدامة",
            href: "/about/csr-sustainability",
          },
          {
            title: "أكاديمية تنمية المواهب في حل النزاعات",
            href: "/services/training",
          },
        ],
      },
    ],
  },
  {
    title: "المركز الإعلامي",
    href: "/media",
    children: [
      { title: "الأخبار", href: "/media/news" },
      { title: "معرض الصور", href: "/media/photos" },
      { title: "معرض الفيديوهات", href: "/media/videos" },
      { title: "بودكاست", href: "/media/podcast" },
    ],
  },  
  {
    title: "النزاعات والأحكام",
    href: "/disputes",
    children: [
      { title: "قدّم قضيتك", href: "/forms" },
      { title: "تتبع القضايا", href: "/disputes/tracking" },
      { title: "ملخص أحكام التحكيم", href: "/disputes/rulings" },
      { title: "حاسبة النزاعات", href: "/disputes/calculator" },
    ],
  },
  {
    title: "التحكيم",
    href: "/arbitration",
    children: [
      { title: "التحكيم الرياضي", href: "/arbitration/sports-arbitration" },
      { title: "التحكيم التجاري", href: "/arbitration/commercial" },
      { title: "الاستشارات القانونية", href: "/services/legal-consultation" },
    ],
  },
  {
    title: "ADR خدمات",
    href: "/services",
    children: [
      { title: "الوساطة القانونية", href: "/services/legal-mediation" },
      { title: "القاعات الخاصة", href: "/services/equipped-halls" },
      { title: "الصلح", href: "/services/conciliation" },
      { title: "أمانة المظالم", href: "/services/ombudsman" },
    ],
  },
    {
    title: "الموارد الرقمية",
    href: "/forms",
    children: [
      { title: "النمادح الإلكترونية", href: "/forms" },
      { title: "المحكمين", href: "/members" },
      { title: "مكتبة رقمية", href: "/services/library" },
      { title: "التدريب والتأهيل", href: "/services/training" },
      { title: "القوانين والأنظمة",
         href: "/regulations",
         children: [
      { title: "التشريعات الرياضية الوطنية", href: "/regulations/national-sports" },
      { title: "التشريعات التجارية الوطنية", href: "/regulations/national-commercial" },
      { title: "التشريعات الدولية", href: "/regulations/international" },
    ], },
    ],
    
  },
  {
    title: "مجالات الممارسة",
    href: "/practice-areas",
    children: [
      { title: "الطاقة", href: "/practice-areas/energy" },
      { title: "الشركات الناشئة", href: "/practice-areas/startups" },
      { title: "التعليم العالي", href: "/practice-areas/higher-education" },
      { title: "الملكية الفكرية", href: "/practice-areas/intellectual-property" },
      { title: "التأمين وإعادة التأمين", href: "/practice-areas/insurance" },
      { title: "العقارات والممتلكات", href: "/practice-areas/real-estate" },
      { title: "الرعاية الصحية", href: "/practice-areas/healthcare" },
      { title: "الرياضة والترفيه", href: "/practice-areas/sports-entertainment" },
    ],
  },

]

export const SERVICES = [
  {
    title: "التحكيم",
    description: "خدمات التحكيم المتخصصة في النزاعات الرياضية",
    icon: "gavel",
    benefits: ["حل سريع للنزاعات", "خبراء متخصصون", "قرارات ملزمة", "سرية تامة"],
  },
  {
    title: "التدريب",
    description: "برامج تدريبية متخصصة في القانون الرياضي",
    icon: "graduation-cap",
    benefits: ["برامج معتمدة", "خبراء دوليون", "شهادات معترف بها", "تدريب عملي"],
  },
  {
    title: "الوساطة",
    description: "خدمات الوساطة لحل النزاعات بطريقة ودية",
    icon: "handshake",
    benefits: ["حلول سريعة", "تكلفة أقل", "علاقات محفوظة", "مرونة في الحلول"],
  },
  {
    title: "القاعات الخاصة",
    description: "قاعات مجهزة لجلسات التحكيم والوساطة",
    icon: "building",
    benefits: ["تجهيزات حديثة", "خصوصية تامة", "مواقع متميزة", "خدمات مساندة"],
  },
]