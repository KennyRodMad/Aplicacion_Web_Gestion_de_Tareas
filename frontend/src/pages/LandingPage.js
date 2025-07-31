import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaUsers, FaChartBar, FaComments, FaBell, FaFileAlt } from 'react-icons/fa';
import RoleSelectionModal from '../components/auth/RoleSelectionModal';
import '../styles/globals.css';

const LandingPage = () => {
  const [showRoleModal, setShowRoleModal] = useState(false);

  const features = [
    {
      icon: <FaBook />,
      title: "Gestión de Tareas",
      description: "Crear, asignar y monitorear tareas con clasificación por etiquetas, prioridades y estados.",
      color: "var(--lime-green)"
    },
    {
      icon: <FaUsers />,
      title: "Colaboración",
      description: "Trabajo en equipo con roles definidos, comentarios y espacios centralizados de discusión.",
      color: "var(--orange-yellow)"
    },
    {
      icon: <FaChartBar />,
      title: "Análisis y Reportes",
      description: "Visualización gráfica del progreso, métricas detalladas y reportes exportables.",
      color: "var(--lime-green)"
    },
    {
      icon: <FaComments />,
      title: "Mensajería Interna",
      description: "Chat en tiempo real entre usuarios con notificaciones de mensajes importantes.",
      color: "var(--orange-yellow)"
    },
    {
      icon: <FaBell />,
      title: "Notificaciones Inteligentes",
      description: "Alertas predictivas, recordatorios de fechas límite y avisos de cambios importantes.",
      color: "var(--lime-green)"
    },
    {
      icon: <FaFileAlt />,
      title: "Gestión de Archivos",
      description: "Subida de documentos, control de versiones y almacenamiento seguro por proyecto.",
      color: "var(--orange-yellow)"
    }
  ];

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <div className="logo-icon" style={{ backgroundColor: 'var(--lime-green)' }}></div>
              <h1>SENAPlanner</h1>
            </div>
            <div className="header-buttons">
              <Link to="/login" className="btn btn-secondary">Iniciar Sesión</Link>
              <button 
                className="btn btn-primary"
                onClick={() => setShowRoleModal(true)}
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Gestión Inteligente de Tareas y Proyectos Académicos</h1>
            <p>
              Plataforma colaborativa diseñada para ambientes académicos con seguimiento detallado, 
              visualización del progreso y notificaciones inteligentes para aprendices, instructores y administradores.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => setShowRoleModal(true)}
              >
                Comenzar Ahora
              </button>
              <Link to="/login" className="btn btn-secondary">Iniciar Sesión</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Funcionalidades Principales</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div 
                  className="feature-icon" 
                  style={{ backgroundColor: feature.color }}
                >
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <p>© 2025 SENAPlanner. Plataforma diseñada para la excelencia educativa.</p>
        </div>
      </footer>

      {/* Role Selection Modal */}
      {showRoleModal && (
        <RoleSelectionModal onClose={() => setShowRoleModal(false)} />
      )}

      <style jsx>{`
        .landing-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .landing-header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 20px 0;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
        }

        .logo h1 {
          color: var(--midnight-blue);
          font-size: 1.5rem;
          font-weight: 700;
        }

        .header-buttons {
          display: flex;
          gap: 15px;
        }

        .hero-section {
          padding: 120px 0 80px;
          text-align: center;
          color: white;
        }

        .hero-content h1 {
          font-size: 3rem;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .hero-content p {
          font-size: 1.2rem;
          margin-bottom: 40px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .features-section {
          padding: 80px 0;
          background: white;
        }

        .features-section h2 {
          text-align: center;
          font-size: 2.5rem;
          color: var(--midnight-blue);
          margin-bottom: 50px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .feature-card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: white;
          font-size: 1.5rem;
        }

        .feature-card h3 {
          color: var(--midnight-blue);
          margin-bottom: 15px;
          font-size: 1.3rem;
        }

        .feature-card p {
          color: #666;
          line-height: 1.6;
        }

        .landing-footer {
          background: var(--midnight-blue);
          color: white;
          text-align: center;
          padding: 30px 0;
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2rem;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage; 