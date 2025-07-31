import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { tareaService } from '../services/tareaService';
import { proyectoService } from '../services/proyectoService';
import toast from 'react-hot-toast';
import { FaTasks, FaProjectDiagram, FaChartBar, FaUsers, FaBell, FaSignOutAlt, FaCheckCircle } from 'react-icons/fa';

const AprendizDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tareas');
  const [stats, setStats] = useState({
    tareasPendientes: 0,
    proyectosActivos: 0,
    mensajes: 0,
    progresoGeneral: 0
  });

  const loadStats = async () => {
    try {
      const [tareas, proyectos] = await Promise.all([
        tareaService.getTareas({ responsable: user.id }),
        proyectoService.getProyectos({ miembro: user.id })
      ]);

      const tareasPendientes = tareas.data.filter(t => t.estado !== 'completada').length;
      const proyectosActivos = proyectos.data.filter(p => p.estado === 'activo').length;
      const progresoGeneral = tareas.data.length > 0 
        ? Math.round((tareas.data.filter(t => t.estado === 'completada').length / tareas.data.length) * 100)
        : 0;

      setStats({
        tareasPendientes,
        proyectosActivos,
        mensajes: 12, // Mock data
        progresoGeneral
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Sesión cerrada exitosamente');
  };

  const tabs = [
    { id: 'tareas', label: 'Mis Tareas', icon: <FaTasks /> },
    { id: 'proyectos', label: 'Mis Proyectos', icon: <FaProjectDiagram /> },
    { id: 'reportes', label: 'Reportes', icon: <FaChartBar /> },
    { id: 'colaboracion', label: 'Colaboración', icon: <FaUsers /> }
  ];

  return (
    <div className="aprendiz-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-icon" style={{ backgroundColor: 'var(--lime-green)' }}></div>
          <div>
            <h1>Mi Dashboard</h1>
            <p>Bienvenido, {user?.nombre}</p>
          </div>
        </div>
        <div className="header-right">
          <button className="icon-button">
            <FaBell />
          </button>
          <button className="icon-button">
            <FaUsers />
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
            <FaTasks />
          </div>
          <div className="stat-content">
            <h3>{stats.tareasPendientes}</h3>
            <p>Tareas Pendientes</p>
            <span className="stat-detail">2 vencen esta semana</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaProjectDiagram />
          </div>
          <div className="stat-content">
            <h3>{stats.proyectosActivos}</h3>
            <p>Proyectos Activos</p>
            <span className="stat-detail">Progreso promedio: 60%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>{stats.mensajes}</h3>
            <p>Mensajes</p>
            <span className="stat-detail">3 sin leer</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3>{stats.progresoGeneral}%</h3>
            <p>Progreso General</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${stats.progresoGeneral}%` }}
              ></div>
            </div>
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
        {activeTab === 'tareas' && (
          <div className="content-placeholder">
            <h3>Mis Tareas</h3>
            <p>Aquí verás todas tus tareas asignadas</p>
          </div>
        )}
        {activeTab === 'proyectos' && (
          <div className="content-placeholder">
            <h3>Mis Proyectos</h3>
            <p>Aquí verás todos tus proyectos activos</p>
          </div>
        )}
        {activeTab === 'reportes' && (
          <div className="content-placeholder">
            <h3>Reportes</h3>
            <p>Aquí verás tus reportes de progreso</p>
          </div>
        )}
        {activeTab === 'colaboracion' && (
          <div className="content-placeholder">
            <h3>Colaboración</h3>
            <p>Aquí podrás colaborar con otros estudiantes</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .aprendiz-dashboard {
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
          background: var(--lime-green);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
        }

        .stat-content h3 {
          font-size: 2rem;
          color: var(--lime-green);
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

        .progress-bar {
          width: 100%;
          height: 6px;
          background: #e0e0e0;
          border-radius: 3px;
          overflow: hidden;
          margin-top: 5px;
        }

        .progress-fill {
          height: 100%;
          background: var(--lime-green);
          transition: width 0.3s ease;
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
          background: var(--lime-green);
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

export default AprendizDashboard; 