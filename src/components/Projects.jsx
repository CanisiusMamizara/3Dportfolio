import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

const Projects = () => {
  const canvasRef = useRef(null);

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

  const projects = [
    {
      title: 'Plateforme de réservation de concerts',
      description: 'Application complète pour réserver des billets de concert en ligne.',
      image: '/public/projet-1.jpg',
    },
    {
      title: 'Site web de l’Assemblée nationale',
      description: 'Refonte moderne et responsive du site institutionnel.',
      image: '/public/projet-2.png',
    },
    {
      title: 'Dashboard RH',
      description: 'Outil de gestion des ressources humaines avec statistiques et rapports.',
      image: '/public/projet-3.png',
    },
    {
      title: 'Application de gestion d’événements',
      description: 'Organisez et suivez vos événements en temps réel.',
      image: '/public/projet-4.jpg',
    },
    {
      title: 'Portfolio développeur',
      description: 'Site vitrine pour présenter compétences, services et projets.',
      image: '/public/projet-5.png',
    },
    {
      title: 'Système de réservation de train',
      description: 'Application pour gérer les réservations et billets de train.',
      image: '/public/projet-6.png',
    },
  ];

  return (
    <section id="project" className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800 py-20 px-4">
      {/* Fond animé */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
        >
          Mes <span className="text-blue-300">projets</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:scale-[1.02] transition-transform"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white/80">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
