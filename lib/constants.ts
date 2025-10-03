export const SITE_CONFIG = {
  name: "مركز التحكيم الرياضي",
  nameEn: "Sports Arbitration Center",
  description: "مركز متخصص في التحكيم والوساطة الرياضية",
  descriptionEn: "Specialized center for sports arbitration and mediation",
  url: "https://sports-arbitration.com",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/sports-arbitration",
    linkedin: "https://linkedin.com/company/sports-arbitration",
  },
}

export const NAVIGATION_ITEMS = [
  {
    title: "الرئيسية",
    href: "/",
  },
  {
    title: "من نحن",
    href: "/about",
    children: [
      {
        title: "عن المركز",
        href: "/about",
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
        href: "/about/algeria-vision-2030",
        children: [
          {
            title: "التحول الرقمي",
            href: "/about/digital-transformation",
          },
          {
            title: "الذكاء الاصطناعي",
            href: "/about/ai",
          },
          {
            title: "الالتزام بالمسؤولية الاجتماعية والاستدامة",
            href: "/about/csr-sustainability",
          },
          {
            title: "أكاديمية تنمية المواهب في حل النزاعات",
            href: "/about/talent-academy",
          },
        ],
      },
    ],
  },
  {
    title: "النزاعات والأحكام",
    href: "/disputes",
    children: [
      { title: "تتبع القضايا", href: "/disputes/tracking" },
      { title: "ملخص أحكام التحكيم", href: "/disputes/rulings" },
      { title: "حاسبة النزاعات", href: "/disputes/calculator" },
    ],
  },
  {
    title: "اللوائح",
    href: "/regulations",
    children: [
      { title: "التشريعات الرياضية الوطنية", href: "/regulations/national-sports" },
      { title: "التشريعات التجارية الوطنية", href: "/regulations/national-commercial" },
      { title: "التشريعات الدولية", href: "/regulations/international" },
    ],
  },
  {
    title: "ADR خدمات",
    href: "/services",
    children: [
      { title: "التحكيم الرياضي", href: "/services/sports-arbitration" },
      { title: "التدريب", href: "/services/training" },
      { title: "الوساطة القانونية", href: "/services/legal-mediation" },
      { title: "الاستشارات القانونية", href: "/services/legal-consultation" },
      { title: "القاعات الخاصة", href: "/services/equipped-halls" },
    ],
  },
  {
    title: "النماذج الرقمية",
    href: "/forms",
  },
  {
    title: "قائمة الأعضاء",
    href: "/members",
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