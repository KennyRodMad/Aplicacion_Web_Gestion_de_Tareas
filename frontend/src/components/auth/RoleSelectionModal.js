import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaUsers, FaCog, FaGraduationCap, FaChalkboardTeacher, FaDesktop } from 'react-icons/fa';

const RoleSelectionModal = ({ onClose }) => {
  const roles = [
    {
      id: 'aprendiz',
      title: 'Aprendiz',
      description: 'Gestiona tus tareas, colabora en proyectos y consulta tu progreso académico',
      icon: <FaBook />,
      userIcon: <FaGraduationCap />,
      color: 'var(--lime-green)',
      features: ['Gestión de tareas', 'Colaboración grupal', 'Reportes individuales']
    },
    {
      id: 'instructor',
      title: 'Instructor',
      description: 'Supervisa proyectos, evalúa tareas y proporciona retroalimentación a estudiantes',
      icon: <FaUsers />,
      userIcon: <FaChalkboardTeacher />,
      color: 'var(--orange-yellow)',
      features: ['Supervisión', 'Evaluación', 'Reportes grupales']
    },
    {
      id: 'admin',
      title: 'Administrador',
      description: 'Gestiona usuarios, configura el sistema y accede a estadísticas globales',
      icon: <FaCog />,
      userIcon: <FaDesktop />,
      color: 'var(--midnight-blue)',
      features: ['Gestión de usuarios', 'Configuración', 'Estadísticas globales']
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Selecciona tu Rol</h2>
          <p>Elige el tipo de cuenta que mejor se adapte a tu perfil</p>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="roles-container">
          {roles.map((role) => (
            <Link 
              key={role.id} 
              to={`/register?role=${role.id}`} 
              className="role-card"
              onClick={onClose}
            >
              <div className="role-header">
                <div 
                  className="role-icon" 
                  style={{ backgroundColor: role.color }}
                >
                  {role.icon}
                </div>
                <div className="role-user-icon">
                  {role.userIcon}
                </div>
              </div>
              <div className="role-content">
                <h3>{role.title}</h3>
                <p>{role.description}</p>
                <div className="role-features">
                  {role.features.map((feature, index) => (
                    <span key={index} className="feature-tag">{feature}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          padding: 30px;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          text-align: center;
          margin-bottom: 30px;
          position: relative;
        }

        .modal-header h2 {
          color: var(--midnight-blue);
          font-size: 1.8rem;
          margin-bottom: 10px;
        }

        .modal-header p {
          color: #666;
          font-size: 1rem;
        }

        .close-button {
          position: absolute;
          top: 0;
          right: 0;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
        }

        .roles-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .role-card {
          display: flex;
          align-items: center;
          padding: 20px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
        }

        .role-card:hover {
          border-color: var(--lime-green);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .role-header {
          position: relative;
          margin-right: 20px;
        }

        .role-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
        }

        .role-user-icon {
          position: absolute;
          bottom: -5px;
          right: -5px;
          width: 25px;
          height: 25px;
          background: var(--midnight-blue);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.8rem;
        }

        .role-content {
          flex: 1;
        }

        .role-content h3 {
          color: var(--midnight-blue);
          margin-bottom: 8px;
          font-size: 1.2rem;
        }

        .role-content p {
          color: #666;
          margin-bottom: 15px;
          line-height: 1.5;
        }

        .role-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .feature-tag {
          background: #f0f0f0;
          color: #666;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
        }

        @media (max-width: 768px) {
          .role-card {
            flex-direction: column;
            text-align: center;
          }

          .role-header {
            margin-right: 0;
            margin-bottom: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default RoleSelectionModal; 