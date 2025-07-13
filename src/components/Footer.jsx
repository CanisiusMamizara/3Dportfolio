import { useRef, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
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
    const pointCount = 50;
    const maxDistance = 100;

    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3
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
            ctx.lineWidth = 0.3;
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
    <footer className="relative w-full overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800 py-10 px-4 mt-20">
      {/* Animation de fond */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />

      <div className="container mx-auto relative z-10 flex flex-col items-center space-y-6">
        <h3 className="text-white text-xl font-semibold">Restons connectés</h3>

        <div className="flex space-x-6">
          <a href="https://github.com/ton-github" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-blue-300 transition">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/ton-linkedin" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-blue-300 transition">
            <FaLinkedin />
          </a>
          <a href="mailto:ton.email@example.com" className="text-white text-2xl hover:text-blue-300 transition">
            <FaEnvelope />
          </a>
        </div>

        <p className="text-white/70 text-sm">&copy; {new Date().getFullYear()} Ton Nom. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
