import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import {
  FaLaptopCode, FaServer, FaDatabase, FaDocker, FaProjectDiagram, FaUsersCog
} from 'react-icons/fa';

const Services = () => {
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

  const services = [
    {
      title: 'Développement Frontend',
      description: 'Création d’interfaces modernes, réactives et optimisées avec React JS, Tailwind CSS et HTML/CSS.',
      icon: FaLaptopCode,
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: 'Développement Backend',
      description: 'Conception d’API robustes et sécurisées avec Node JS, Express JS, Django ou Laravel.',
      icon: FaServer,
      color: 'from-purple-400 to-purple-600',
    },
    {
      title: 'Gestion de bases de données',
      description: 'Modélisation et gestion de données fiables avec MySQL et PostgreSQL.',
      icon: FaDatabase,
      color: 'from-emerald-400 to-emerald-600',
    },
    {
      title: 'Intégration & DevOps',
      description: 'Mise en place de conteneurs, CI/CD et déploiements automatisés avec Docker et GitHub Actions.',
      icon: FaDocker,
      color: 'from-amber-400 to-amber-600',
    },
    {
      title: 'Gestion de projet',
      description: 'Application des méthodologies Agile pour une livraison rapide et de qualité.',
      icon: FaProjectDiagram,
      color: 'from-indigo-400 to-indigo-600',
    },
    {
      title: 'Formation & Support',
      description: 'Accompagnement et formation pour la prise en main des solutions développées.',
      icon: FaUsersCog,
      color: 'from-rose-400 to-rose-600',
    },
  ];

  return (
    <section id="services" className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800 py-20 px-4">
      {/* Animation de fond */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
        >
          Mes <span className="text-blue-300">services</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
            >
              <div className={`bg-gradient-to-r ${service.color} p-4 flex items-center space-x-4`}>
                <service.icon className="text-white text-3xl" />
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
              </div>
              <div className="p-5">
                <p className="text-white/80">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
