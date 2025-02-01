"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HeartIcon, SparklesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const romanticGif = "https://media.giphy.com/media/l4pTdcifPZLpDjL1e/giphy.gif"

export default function ValentinePage() {
  const [answer, setAnswer] = useState<string | null>(null)
  const [noHover, setNoHover] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-red-200 to-pink-300 overflow-hidden p-4">
      <AnimatePresence>
        {answer === "yes" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  scale: 0,
                }}
                animate={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  scale: [0, 1, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 5 + Math.random() * 3,
                  delay: Math.random() * 5,
                }}
              >
                <SparklesIcon className="text-pink-500 w-4 h-4" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
        <CardContent className="flex flex-col items-center space-y-6 p-6 md:p-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <HeartIcon className="w-16 h-16 md:w-20 md:h-20 text-red-500" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-600 font-serif">Mi amor...</h1>
          <p className="text-lg md:text-xl text-center text-gray-700 font-light italic">
            ¿Me concederías el honor de ser mi San Valentín?
          </p>
          {answer === null ? (
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4 w-full">
              <Button
                onClick={() => setAnswer("yes")}
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 w-full md:w-auto"
              >
                Sí, mi amor ❤️
              </Button>
              <Button
                onMouseEnter={() => setNoHover(true)}
                onMouseLeave={() => setNoHover(false)}
                onClick={() => setAnswer("no")}
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 w-full md:w-auto"
              >
                {noHover ? "¿Estás segura?" : "Necesito pensarlo"}
              </Button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <p className="text-xl md:text-2xl font-semibold mb-4 text-pink-600">
                {answer === "yes"
                  ? "¡Mi corazón se llena de alegría! Nuestro amor brillará eternamente. ✨"
                  : "Tu indecisión me rompe el corazón... 💔"}
              </p>
              {answer === "yes" && (
                <>
                  <motion.img
                    src={romanticGif}
                    alt="Romantic Couple"
                    className="w-full rounded-lg shadow-lg mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <p className="text-base md:text-lg text-gray-700 italic">"Contigo, cada día es San Valentín."</p>
                </>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

