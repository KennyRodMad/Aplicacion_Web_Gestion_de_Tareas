import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usuarioService } from '../services/usuarioService';
import { tareaService } from '../services/tareaService';
import { proyectoService } from '../services/proyectoService';
import toast from 'react-hot-toast';
import { FaUsers, FaTasks, FaChartBar, FaComments, FaBell, FaSignOutAlt, FaStar } from 'react-icons/fa';

const InstructorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('seguimiento');
  const [stats, setStats] = useState({
    estudiantes: 0,
    evaluacionesPendientes: 0,
    proyectosActivos: 0,
    promedioGeneral: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [estudiantes, tareas, proyectos] = await Promise.all([
        usuarioService.getUsuarios(),
        tareaService.getTareas(),
        proyectoService.getProyectos()
      ]);

      const estudiantesAprendices = estudiantes.data.filter(u => u.rol === 'aprendiz').length;
      const evaluacionesPendientes = tareas.data.filter(t => t.estado === 'en revisión').length;
      const proyectosActivos = proyectos.data.filter(p => p.estado === 'activo').length;
      const promedioGeneral = 8.3; // Mock data

      setStats({
        estudiantes: estudiantesAprendices,
        evaluacionesPendientes,
        proyectosActivos,
        promedioGeneral
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Sesión cerrada exitosamente');
  };

  const tabs = [
    { id: 'seguimiento', label: 'Seguimiento de Estudiantes', icon: <FaUsers /> },
    { id: 'evaluaciones', label: 'Evaluaciones', icon: <FaTasks /> },
    { id: 'reportes', label: 'Reportes', icon: <FaChartBar /> },
    { id: 'chat', label: 'Chat con Estudiantes', icon: <FaComments /> }
  ];

  return (
    <div className="instructor-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-icon" style={{ backgroundColor: 'var(--orange-yellow)' }}></div>
          <div>
            <h1>Panel del Instructor</h1>
            <p>Bienvenido, {user?.nombre}</p>
          </div>
        </div>
        <div className="header-right">
          <button className="icon-button">
            <FaBell />
          </button>
          <button className="icon-button">
            <FaComments />
          </button>
          <button className="icon-button">
            <FaChartBar />
          </button>
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt />
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>{stats.estudiantes}</h3>
            <p>Estudiantes</p>
            <span className="stat-detail">3 grupos activos</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaTasks />
          </div>
          <div className="stat-content">
            <h3>{stats.evaluacionesPendientes}</h3>
            <p>Evaluaciones Pendientes</p>
            <span className="stat-detail">5 vencen esta semana</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaChartBar />
          </div>
          <div className="stat-content">
            <h3>{stats.proyectosActivos}</h3>
            <p>Proyectos Activos</p>
            <span className="stat-detail">Progreso promedio: 65%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaStar />
          </div>
          <div className="stat-content">
            <h3>{stats.promedioGeneral}</h3>
            <p>Promedio General</p>
            <span className="stat-detail">+0.2 desde el mes pasado</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="content-area">
        {activeTab === 'seguimiento' && (
          <div className="content-placeholder">
            <h3>Seguimiento de Estudiantes</h3>
            <p>Aquí podrás monitorear el progreso de tus estudiantes</p>
          </div>
        )}
        {activeTab === 'evaluaciones' && (
          <div className="content-placeholder">
            <h3>Evaluaciones</h3>
            <p>Aquí podrás evaluar tareas y proyectos</p>
          </div>
        )}
        {activeTab === 'reportes' && (
          <div className="content-placeholder">
            <h3>Reportes</h3>
            <p>Aquí verás reportes detallados del rendimiento</p>
          </div>
        )}
        {activeTab === 'chat' && (
          <div className="content-placeholder">
            <h3>Chat con Estudiantes</h3>
            <p>Aquí podrás comunicarte con tus estudiantes</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .instructor-dashboard {
          min-height: 100vh;
          background: var(--light-gray);
        }

        .dashboard-header {
          background: white;
          padding: 20px 30px;
          box-shadow: var(--shadow);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
        }

        .header-left h1 {
          color: var(--midnight-blue);
          font-size: 1.5rem;
          margin-bottom: 5px;
        }

        .header-left p {
          color: #666;
          font-size: 0.9rem;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .icon-button {
          background: none;
          border: none;
          font-size: 1.2rem;
          color: #666;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: background-color 0.3s ease;
        }

        .icon-button:hover {
          background: var(--light-gray);
        }

        .logout-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 6px;
          transition: background-color 0.3s ease;
        }

        .logout-button:hover {
          background: #ffebee;
          color: #c62828;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          padding: 30px;
        }

        .stat-card {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: var(--shadow);
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          background: var(--orange-yellow);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
        }

        .stat-content h3 {
          font-size: 2rem;
          color: var(--orange-yellow);
          margin-bottom: 5px;
        }

        .stat-content p {
          color: var(--dark-gray);
          font-weight: 600;
          margin-bottom: 5px;
        }

        .stat-detail {
          font-size: 0.8rem;
          color: #666;
        }

        .tabs {
          display: flex;
          background: white;
          margin: 0 30px;
          border-radius: 8px 8px 0 0;
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        .tab {
          flex: 1;
          padding: 15px 20px;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #666;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .tab.active {
          background: var(--orange-yellow);
          color: white;
        }

        .content-area {
          background: white;
          margin: 0 30px 30px;
          border-radius: 0 0 8px 8px;
          min-height: 500px;
          box-shadow: var(--shadow);
        }

        .content-placeholder {
          padding: 50px;
          text-align: center;
          color: #666;
        }

        .content-placeholder h3 {
          color: var(--midnight-blue);
          margin-bottom: 10px;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
            padding: 20px;
          }

          .tabs {
            margin: 0 20px;
            flex-direction: column;
          }

          .content-area {
            margin: 0 20px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default InstructorDashboard; 