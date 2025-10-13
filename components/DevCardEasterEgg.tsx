"use client"
import { useEffect, useState } from "react"

export default function DevCardEasterEgg() {
  const secretWord = "developer"
  const [typed, setTyped] = useState("")
  const [showCard, setShowCard] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (/^[a-z]$/.test(key)) {
        setTyped((prev) => {
          const newTyped = (prev + key).slice(-secretWord.length)
          if (newTyped === secretWord) {
            setShowCard(true)
          }
          return newTyped
        })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setShowCard(false)
      setIsClosing(false)
    }, 300)
  }

  if (!showCard) return null

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-[9999] transition-all duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, rgba(0, 0, 0, 0.85) 100%)'
      }}
    >
      {/* Backdrop blur */}
      <div className="absolute inset-0 backdrop-blur-md" onClick={handleClose} />
      
      {/* Card container with enhanced animations */}
      <div 
        className={`relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 border border-slate-700/50 transition-all duration-500 ${
          isClosing ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{
          animation: isClosing ? 'none' : 'slideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 100px rgba(99, 102, 241, 0.2)'
        }}
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl opacity-20 blur-xl" />
        
        {/* Content */}
        <div className="relative">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">سر مكتشف! 🎉</h2>
            <p className="text-slate-400 text-sm">لقد وجدت بطاقة المطور المخفية</p>
          </div>

          {/* Dev Card with hover effect */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300" />
            <a
              href="https://app.daily.dev/abdelhamidramdani"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block overflow-hidden rounded-2xl ring-2 ring-slate-700 transition-all duration-300 hover:ring-indigo-500 hover:scale-[1.02]"
            >
              <img
                src="https://api.daily.dev/devcards/v2/BjQw9JntFdmamhMipm0fr.png?type=default&r=anl"
                width="356"
                alt="abdelhamid ramdani's Dev Card"
                className="w-full h-auto"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <span className="text-white font-semibold flex items-center gap-2">
                  زيارة الملف الشخصي
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </div>
            </a>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="mt-6 w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            إخفاء السر
          </button>

          {/* Hint text */}
          <p className="text-center text-slate-500 text-xs mt-4">
            اضغط خارج الصندوق أو اضغط على الزر للإغلاق
          </p>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-indigo-500/30 rounded-tl-3xl" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-purple-500/30 rounded-br-3xl" />
      </div>

      <style jsx>{`
        @keyframes slideIn {
          0% {
            transform: translateY(-50px) scale(0.9);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}