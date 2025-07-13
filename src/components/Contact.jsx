import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FaPhone, FaMapMarkerAlt, FaPaperPlane, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const canvasRef = useRef(null);
  const formRef = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);

  // Configuration EmailJS
  const SERVICE_ID = 'service_kwafkaz';
  const TEMPLATE_ID = 'template_ilt2qdc';
  const USER_ID = '2IFbiprdhf6Mf1YjE';

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.user_name || !formData.user_email || !formData.message) {
      setSendStatus('error');
      return;
    }

    setIsSending(true);
    setSendStatus(null);

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        USER_ID
      );

      setSendStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSendStatus('error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800 py-20 px-4">
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
          Contactez-<span className="text-blue-300">moi</span>
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 h-full">
              <h3 className="text-2xl font-bold text-white mb-6">Informations</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600/30 rounded-full">
                    <FaMapMarkerAlt className="text-blue-300 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Localisation</h4>
                    <p className="text-blue-100">Fianarantsoa, Madagascar</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600/30 rounded-full">
                    <FaPhone className="text-blue-300 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Téléphone</h4>
                    <p className="text-blue-100">+261 38 41 780 34</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600/30 rounded-full">
                    <FaPaperPlane className="text-blue-300 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Email</h4>
                    <p className="text-blue-100">mamizarahenricanisius.pro@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="text-white font-medium mb-4">Réseaux sociaux</h4>
                <div className="flex gap-4">
                  <motion.a
                    href="https://github.com/Mamizara"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm transition-all flex items-center gap-2"
                  >
                    <FaGithub /> GitHub
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/henricanisius-mamizara"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm transition-all flex items-center gap-2"
                  >
                    <FaLinkedin /> LinkedIn
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Envoyez un message</h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  <label htmlFor="name" className="block text-white/80 mb-2">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Votre nom"
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <label htmlFor="email" className="block text-white/80 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="votre@email.com"
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                  <label htmlFor="message" className="block text-white/80 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Votre message..."
                  ></textarea>
                </motion.div>

                {sendStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-500/20 text-green-300 rounded-lg text-center"
                  >
                    Message envoyé avec succès ! Je vous répondrai dès que possible.
                  </motion.div>
                )}

                {sendStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/20 text-red-300 rounded-lg text-center"
                  >
                    {!formData.user_name || !formData.user_email || !formData.message 
                      ? 'Veuillez remplir tous les champs'
                      : 'Erreur lors de l\'envoi. Vous pouvez aussi m\'envoyer un email directement à mamizarahenricanisius.pro@gmail.com'}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSending}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <FaPaperPlane />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="mt-20 relative w-full overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800 py-10 px-4">
          <div className="container mx-auto relative z-10 flex flex-col items-center space-y-6">
            <h3 className="text-white text-xl font-semibold">Restons connectés</h3>
            <div className="flex space-x-6">
              <a href="https://github.com/Mamizara" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-blue-300 transition">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/henricanisius-mamizara" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-blue-300 transition">
                <FaLinkedin />
              </a>
              <a href="mailto:mamizarahenricanisius.pro@gmail.com" className="text-white text-2xl hover:text-blue-300 transition">
                <FaEnvelope />
              </a>
            </div>
            <p className="text-white/70 text-sm">&copy; {new Date().getFullYear()} Mamizara Henricanisius. Tous droits réservés.</p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;