import { motion, AnimatePresence } from "framer-motion";
import { useAppState } from "../state/useAppState";
import { useEffect, useState } from "react";

export default function RevealOverlay() {
  const { mode, setMode, reset } = useAppState();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (mode === "reveal") {
      // Show confetti after animation completes
      const timer = setTimeout(() => {
        setShowConfetti(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setShowConfetti(false);
    }
  }, [mode]);

  const handleYes = () => {
    setMode("final");
  };

  const handleRunAgain = () => {
    reset();
  };

  return (
    <AnimatePresence>
      {(mode === "reveal" || mode === "final") && (
        <motion.div
          className="reveal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {showConfetti && <Confetti />}

          <motion.div
            className="reveal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.h1
              className="reveal-message"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 2 }}
            >
              WILL YOU BE MY VALENTINE?
            </motion.h1>

            {mode === "reveal" && (
              <motion.div
                className="reveal-buttons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
              >
                <button className="btn-yes" onClick={handleYes}>
                  Yes 💖
                </button>
                <button className="btn-secondary" onClick={handleRunAgain}>
                  Run Again
                </button>
              </motion.div>
            )}

            {mode === "final" && (
              <motion.div
                className="final-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h2>🎉 Yay! 🎉</h2>
                <p>Valentine date confirmed!</p>
                <p className="date-details">
                  Skibidi Toilet ❤️
                </p>
                <button className="btn-secondary" onClick={handleRunAgain}>
                  Run Again
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Simple confetti component
function Confetti() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    color: ["#f472b6", "#ec4899", "#db2777", "#be185d", "#fbbf24"][
      Math.floor(Math.random() * 5)
    ],
  }));

  return (
    <div className="confetti">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="confetti-particle"
          style={{
            left: `${particle.x}%`,
            backgroundColor: particle.color,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight,
            opacity: 0,
            rotate: 360,
          }}
          transition={{
            delay: particle.delay,
            duration: particle.duration,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
