import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { FaWhatsapp, FaFacebook, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';


const About = () => {
  const canvasRef = useRef(null);
    const contacts = [
    { icon: <FaWhatsapp size={24} />, name: 'WhatsApp', url: 'https://wa.me/yournumber' },
    { icon: <FaFacebook size={24} />, name: 'Facebook', url: 'https://facebook.com/yourprofile' },
    { icon: <FaLinkedin size={24} />, name: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile' },
    { icon: <FaGithub size={24} />, name: 'GitHub', url: 'https://github.com/yourusername' },
    { icon: <FaEnvelope size={24} />, name: 'Email', url: 'mailto:your@email.com' }
  ];

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
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance/maxDistance})`;
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
    <section id="about" className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800 py-20 px-4">
      {/* Animation de fond */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      <div className="container mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
        >
          À <span className="text-blue-300">propos</span> de moi
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Partie gauche - Photo sans cadre */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl"
            >
              <img 
                src="/public/about-img.png"  // Chemin corrigé (pas besoin de /public)
                alt="MAMIZARA Henri Canisius"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-blue-900/10 hover:bg-transparent transition-all duration-300" />
            </motion.div>
          </motion.div>

          {/* Partie droite - Texte et bouton */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 text-white"
          >
            <motion.h3 
              className="text-2xl md:text-3xl font-bold mb-6 text-blue-200"
            >
              Développeur Web Full Stack Passionné
            </motion.h3>

            <motion.div 
              className="space-y-4 text-lg mb-8 leading-relaxed"
            >
              <p>
                Je m'appelle <span className="text-blue-300 font-medium">MAMIZARA Henri Canisius</span>, développeur web spécialisé dans la création d'applications modernes et performantes.
              </p>
              <p>
                Avec une expertise en React, Node.js et les architectures systeme, je transforme vos idées en solutions numériques robustes et évolutives.
              </p>
              <p>
                Mon approche combine excellence technique, design intuitif et expérience utilisateur optimale pour des résultats qui dépassent les attentes.
              </p>
            </motion.div>

            <motion.a
              href="#contact"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#ffffff",
                color: "#1e3a8a",
                boxShadow: "0 10px 25px rgba(255, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-semibold text-lg shadow-lg transition-all duration-300 mb-12"
            >
              Engagez-moi pour votre projet
            </motion.a>

            {/* Icônes de contact */}
            <motion.div 
              className="flex flex-wrap gap-4 md:gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {contacts.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    y: -5,
                    scale: 1.1,
                    color: "#93c5fd"
                  }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center group"
                >
                  <div className="p-3 bg-blue-800/50 rounded-full border border-blue-400/30 group-hover:bg-blue-700/70 transition-all">
                    {contact.icon}
                  </div>
                  <span className="mt-2 text-sm text-blue-100 group-hover:text-white transition-colors">
                    {contact.name}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;