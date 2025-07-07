import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRocket, FaCheck, FaStar, FaDownload, FaPalette, FaMobile } from "react-icons/fa";
import Button from "../components/UI/Button";

const Home = () => {
  const textRef = useRef(null);
  const subTextRef = useRef(null);
  const cursorRef = useRef(null);
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header text animation
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: "-100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.5,
            ease: "elastic.out(1, 0.6)",
            delay: 0.5,
          }
        );
      }

      // Subtext animation
      if (subTextRef.current) {
        gsap.fromTo(
          subTextRef.current,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            delay: 1.5,
          }
        );
      }
    });

    // Cursor movement tracking (desktop only)
    const moveCursor = (e) => {
      if (!isMobile && cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out",
        });
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", moveCursor);
    }

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [isMobile]);

  const features = [
    { icon: FaPalette, title: "Multiple Templates", description: "Choose from professional designs" },
    { icon: FaMobile, title: "Mobile Friendly", description: "Works perfectly on all devices" },
    { icon: FaDownload, title: "Instant Download", description: "Get your PDF in seconds" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-pink-600 to-yellow-500 relative overflow-hidden">
      {/* Cursor Effect - Desktop Only */}
      {!isMobile && (
        <div
          ref={cursorRef}
          className={`fixed top-0 left-0 w-10 h-10 rounded-full bg-pink-400 mix-blend-difference pointer-events-none transition-all duration-300 z-50 ${
            isHovering ? "opacity-100 scale-125" : "opacity-50 scale-100"
          }`}
          style={{
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-300 opacity-20 rounded-full"
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 md:p-6">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="text-white font-bold text-xl">CV Builder</div>
            <div className="hidden md:flex items-center space-x-4 text-white">
              <span className="text-sm opacity-80">Free Forever</span>
              <div className="flex items-center space-x-1">
                <FaStar className="text-yellow-300" size={16} />
                <span className="text-sm">4.9/5</span>
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto text-white">
            <motion.h1
              ref={textRef}
              className="text-4xl md:text-6xl lg:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-600 mb-6"
              onMouseEnter={() => !isMobile && setIsHovering(true)}
              onMouseLeave={() => !isMobile && setIsHovering(false)}
            >
              BUILD YOUR CV
            </motion.h1>

            <motion.p
              ref={subTextRef}
              className="text-lg md:text-xl lg:text-2xl font-medium opacity-90 mb-8 max-w-2xl mx-auto"
            >
              Create professional resumes in minutes with our intuitive CV builder. 
              Multiple templates, real-time preview, and instant PDF download.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <Button
                onClick={() => navigate("/form")}
                variant="gradient"
                size="lg"
                icon={FaRocket}
                className="text-lg px-8 py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                Start Building Now
              </Button>
              
              <div className="flex items-center space-x-2 text-sm opacity-80">
                <FaCheck className="text-green-300" size={16} />
                <span>No signup required</span>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon className="mx-auto mb-4 text-yellow-300" size={32} />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm opacity-80">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 md:p-6 text-center text-white text-sm opacity-60">
          <p>&copy; 2024 CV Builder. Create professional resumes with ease.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
