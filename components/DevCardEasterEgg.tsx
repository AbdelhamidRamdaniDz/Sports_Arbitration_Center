"use client"
import { useEffect, useState } from "react"

export default function DevCardEasterEgg() {
  const secretWord = "developer"
  const [typed, setTyped] = useState("")
  const [showCard, setShowCard] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  type Particle = {
    id: number
    x: number
    y: number
    size: number
    duration: number
    delay: number
  }

  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (/^[a-z]$/.test(key)) {
        setTyped((prev) => {
          const newTyped = (prev + key).slice(-secretWord.length)
          if (newTyped === secretWord) {
            setShowCard(true)
            createParticles()
          }
          return newTyped
        })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const createParticles = () => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 0.5
    }))
    setParticles(newParticles)
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setShowCard(false)
      setIsClosing(false)
      setParticles([])
    }, 300)
  }

  if (!showCard) return null

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-[9999] transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, rgba(0, 0, 0, 0.85) 100%)'
      }}
    >
      {/* Animated particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(147, 51, 234, 0.6))',
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
          }}
        />
      ))}

      {/* Backdrop */}
      <div className="absolute inset-0 backdrop-blur-lg" onClick={handleClose} />
      
      {/* Card container */}
      <div 
        className={`relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden transition-all duration-500 border border-slate-700/50 ${
          isClosing ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{
          animation: isClosing ? 'none' : 'slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 100px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl opacity-20 blur-2xl animate-pulse" />
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/80 backdrop-blur hover:bg-slate-700 transition-all duration-200 border border-slate-600/50 group hover:scale-110 active:scale-95"
          aria-label="Close"
        >
          <svg className="w-5 h-5 text-slate-300 group-hover:text-white transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="relative p-10 pt-16">
          {/* Icon */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-2xl opacity-50 animate-pulse" />
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 shadow-2xl">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
              أهلاً بك! 🎉
            </h2>
            <p className="text-slate-400 text-lg">لقد اكتشفت السر المخفي</p>
          </div>

          {/* Profile info card */}
          <div className="mb-8 p-6 bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700/50 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                A
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Abdelhamid Ramdani</h3>
                <p className="text-slate-400 text-sm">Full Stack Developer</p>
              </div>
            </div>
            
            <div className="flex gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Algeria</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Open to work</span>
              </div>
            </div>
          </div>

          {/* Skills tags */}
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind'].map((skill) => (
              <span key={skill} className="px-4 py-2 bg-slate-800/70 backdrop-blur text-slate-300 text-sm rounded-full border border-slate-700/50 hover:border-blue-500/50 hover:text-white transition-all duration-300">
                {skill}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://portfolio-three-ebon-25.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base font-bold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 group"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              عرض Portfolio
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <button
              onClick={handleClose}
              className="sm:w-auto px-6 py-4 bg-slate-800/80 backdrop-blur text-white text-base font-bold rounded-xl hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 border border-slate-700 group"
            >
              <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              إغلاق
            </button>
          </div>

          {/* Hint */}
          <p className="text-center text-slate-500 text-sm mt-6 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            اكتب "developer" لإظهار هذه النافذة مجدداً
          </p>
        </div>

        {/* Bottom gradient accent */}
        <div className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-blue-500/30 rounded-tl-3xl" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-purple-500/30 rounded-br-3xl" />
      </div>

      <style jsx>{`
        @keyframes slideUp {
          0% {
            transform: translateY(30px) scale(0.95);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(10px, -20px);
          }
          50% {
            transform: translate(-5px, -10px);
          }
          75% {
            transform: translate(5px, -30px);
          }
        }
      `}</style>
    </div>
  )
}