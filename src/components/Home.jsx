import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const Home = () => {
  const canvasRef = useRef(null);
  const [displayName, setDisplayName] = useState('');
  const [displayTitle, setDisplayTitle] = useState('');
  const fullName = "MAMIZARA Henri Canisius";
  const jobTitle = "Développeur Web Full Stack";

  // Animation typewriter en boucle
  useEffect(() => {
    let isCancelled = false;

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const typeWriterLoop = async () => {
      while (!isCancelled) {
        setDisplayName('');
        setDisplayTitle('');

        for (let i = 0; i <= fullName.length; i++) {
          if (isCancelled) return;
          setDisplayName(fullName.substring(0, i));
          await sleep(120);
        }

        await sleep(500);

        for (let j = 0; j <= jobTitle.length; j++) {
          if (isCancelled) return;
          setDisplayTitle(jobTitle.substring(0, j));
          await sleep(90);
        }

        await sleep(2500);
      }
    };

    typeWriterLoop();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Animation du fond
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const points = [];
    const pointCount = 80;
    const maxDistance = 150;

    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      points.forEach(point => {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fill();

        point.x += point.speedX;
        point.y += point.speedY;

        if (point.x < 0 || point.x > canvas.width) point.speedX *= -1;
        if (point.y < 0 || point.y > canvas.height) point.speedY *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-blue-900 flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="w-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl mb-8 backdrop-blur-sm"
            style={{
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              transformStyle: 'preserve-3d'
            }}
          >
            <img
              src="/profil-img.jpg"
              alt="MAMIZARA Henri Canisius"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-profile.png";
              }}
            />
          </motion.div>

          <motion.h1
            className="text-3xl md:text-4xl font-bold text-white mb-2 min-h-[3rem]"
          >
            {displayName}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="ml-1"
            >
              |
            </motion.span>
          </motion.h1>

          <motion.h2
            className="text-xl md:text-2xl text-blue-200 mb-8 min-h-[2rem]"
          >
            {displayTitle}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="ml-1"
            >
              |
            </motion.span>
          </motion.h2>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-blue-900 rounded-full font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            Contactez-moi
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
