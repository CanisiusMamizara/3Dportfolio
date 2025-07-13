import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

// ✅ Seulement des icônes FontAwesome :
import {
  FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaPython, FaPhp, FaSitemap,
  FaDocker, FaGitAlt, FaProjectDiagram,
  FaJira, FaJs, FaGithub, FaDatabase, FaWind, FaNetworkWired
} from 'react-icons/fa';

const Skills = () => {
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

  const skillCategories = [
  {
    name: 'Frontend',
    color: 'from-blue-400 to-blue-600',
    skills: [
      { name: 'React JS', icon: FaReact, level: 90 },
      { name: 'JavaScript', icon: FaJs, level: 90 },
      { name: 'HTML', icon: FaHtml5, level: 95 },
      { name: 'CSS', icon: FaCss3Alt, level: 85 },
      { name: 'Tailwind CSS', icon: FaWind, level: 90 },
    ],
  },
  {
    name: 'Frameworks',
    color: 'from-fuchsia-400 to-fuchsia-600',
    skills: [
      { name: 'Express JS', icon: FaNodeJs, level: 85 }, // Express = Node
      { name: 'Next JS', icon: FaJs, level: 85 },        // Next = JS
      { name: 'Django', icon: FaPython, level: 85 },     // Django = Python
      { name: 'Laravel', icon: FaPhp, level: 80 },       // Laravel = PHP
    ],
  },
  {
    name: 'Backend',
    color: 'from-purple-400 to-purple-600',
    skills: [
      { name: 'Node JS', icon: FaNodeJs, level: 85 },
      { name: 'Python', icon: FaPython, level: 85 },
      {name : 'PHP', icon: FaPhp, level: 80}
    ],
  },
  {
    name: 'Bases de données',
    color: 'from-emerald-400 to-emerald-600',
    skills: [
      { name: 'MySQL', icon: FaDatabase, level: 85 },
      { name: 'PostgreSQL', icon: FaDatabase, level: 90 },
      { name: 'SQLite', icon: FaDatabase, level: 90 },
      { name: 'MongoDB', icon: FaDatabase, level: 90 },
    ],
  },
  {
    name: 'DevOps & Outils',
    color: 'from-amber-400 to-amber-600',
    skills: [
      { name: 'Docker', icon: FaDocker, level: 90 },
      { name: 'GitHub', icon: FaGithub, level: 90 },
      { name: 'Git CI/CD', icon: FaGitAlt, level: 85 },
      { name: 'Kubernetes', icon: FaNetworkWired, level: 70 },
    ],
  },
  {
    name: 'Méthodologies',
    color: 'from-indigo-400 to-indigo-600',
    skills: [
      { name: 'Agile', icon: FaJira, level: 80 },
      {name: 'UML', icon: FaSitemap, level: 80},
      {name: 'Merise', icon: FaProjectDiagram, level: 85}
    ],
  },
];

  return (
    <section id="skills" className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800 py-20 px-4">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
        >
          Mes <span className="text-blue-300">compétences</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
            >
              <div className={`bg-gradient-to-r ${category.color} p-4`}>
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
              </div>
              <div className="p-5 space-y-4">
                {category.skills.map(({ name, icon: Icon, level }) => (
                  <motion.div
                    key={name}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3"
                  >
                    <Icon className="text-white text-2xl" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-white font-medium">{name}</span>
                        <span className="text-blue-300">{level}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2.5 mt-1">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${level}%` }}
                          transition={{ duration: 1 }}
                          viewport={{ once: true }}
                          className={`h-2.5 rounded-full bg-gradient-to-r ${category.color}`}
                        ></motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
