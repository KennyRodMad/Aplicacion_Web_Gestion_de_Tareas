import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaExclamationTriangle, FaInfoCircle, FaCheckCircle, FaTimes, FaBell } from 'react-icons/fa';

const SystemAlerts = () => {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todas');

  useEffect(() => {
    loadAlertas();
  }, []);

  const loadAlertas = async () => {
    try {
      // Mock data para alertas del sistema
      const mockAlertas = [
        {
          id: 1,
          tipo: 'error',
          titulo: 'Error de Base de Datos',
          descripcion: 'Se detectó un problema de conexión con la base de datos',
          fecha: '2024-01-15 10:30:00',
          prioridad: 'alta',
          resuelto: false
        },
        {
          id: 2,
          tipo: 'warning',
          titulo: 'Espacio en Disco Bajo',
          descripcion: 'El servidor está utilizando el 85% del espacio disponible',
          fecha: '2024-01-15 09:15:00',
          prioridad: 'media',
          resuelto: false
        },
        {
          id: 3,
          tipo: 'info',
          titulo: 'Actualización del Sistema',
          descripcion: 'Nueva versión disponible para descargar',
          fecha: '2024-01-15 08:00:00',
          prioridad: 'baja',
          resuelto: false
        },
        {
          id: 4,
          tipo: 'success',
          titulo: 'Backup Completado',
          descripcion: 'El backup automático se completó exitosamente',
          fecha: '2024-01-15 07:30:00',
          prioridad: 'baja',
          resuelto: true
        }
      ];

      setAlertas(mockAlertas);
    } catch (error) {
      toast.error('Error al cargar alertas');
    } finally {
      setLoading(false);
    }
  };

  const handleResolveAlert = (alertaId) => {
    setAlertas(prev => prev.map(alerta => 
      alerta.id === alertaId ? { ...alerta, resuelto: true } : alerta
    ));
    toast.success('Alerta marcada como resuelta');
  };

  const handleDeleteAlert = (alertaId) => {
    setAlertas(prev => prev.filter(alerta => alerta.id !== alertaId));
    toast.success('Alerta eliminada');
  };

  const getTipoIcon = (tipo) => {
    const iconos = {
      error: <FaExclamationTriangle />,
      warning: <FaExclamationTriangle />,
      info: <FaInfoCircle />,
      success: <FaCheckCircle />
    };
    return iconos[tipo] || <FaInfoCircle />;
  };

  const getTipoColor = (tipo) => {
    const colores = {
      error: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8',
      success: '#28a745'
    };
    return colores[tipo] || '#6c757d';
  };

  const getPrioridadColor = (prioridad) => {
    const colores = {
      alta: '#dc3545',
      media: '#ffc107',
      baja: '#28a745'
    };
    return colores[prioridad] || '#6c757d';
  };

  const filteredAlertas = alertas.filter(alerta => {
    if (filtro === 'todas') return true;
    if (filtro === 'resueltas') return alerta.resuelto;
    if (filtro === 'pendientes') return !alerta.resuelto;
    return alerta.tipo === filtro;
  });

  if (loading) {
    return <div className="loading">Cargando alertas...</div>;
  }

  return (
    <div className="system-alerts">
      <div className="header">
        <h2>Alertas del Sistema</h2>
        <p>Monitoreo de eventos y notificaciones del sistema</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Filtrar por:</label>
          <select 
            value={filtro} 
            onChange={(e) => setFiltro(e.target.value)}
            className="filter-select"
          >
            <option value="todas">Todas las alertas</option>
            <option value="pendientes">Pendientes</option>
            <option value="resueltas">Resueltas</option>
            <option value="error">Errores</option>
            <option value="warning">Advertencias</option>
            <option value="info">Información</option>
            <option value="success">Éxito</option>
          </select>
        </div>
      </div>

      <div className="alerts-container">
        {filteredAlertas.length === 0 ? (
          <div className="no-alerts">
            <FaBell />
            <p>No hay alertas que mostrar</p>
          </div>
        ) : (
          filteredAlertas.map(alerta => (
            <div 
              key={alerta.id} 
              className={`alert-card ${alerta.tipo} ${alerta.resuelto ? 'resuelto' : ''}`}
            >
              <div className="alert-icon" style={{ color: getTipoColor(alerta.tipo) }}>
                {getTipoIcon(alerta.tipo)}
              </div>
              
              <div className="alert-content">
                <div className="alert-header">
                  <h3>{alerta.titulo}</h3>
                  <div className="alert-meta">
                    <span 
                      className="prioridad-badge"
                      style={{ backgroundColor: getPrioridadColor(alerta.prioridad) }}
                    >
                      {alerta.prioridad.toUpperCase()}
                    </span>
                    <span className="fecha">{alerta.fecha}</span>
                  </div>
                </div>
                
                <p className="alert-description">{alerta.descripcion}</p>
                
                <div className="alert-actions">
                  {!alerta.resuelto && (
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleResolveAlert(alerta.id)}
                    >
                      Marcar como Resuelto
                    </button>
                  )}
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleDeleteAlert(alerta.id)}
                  >
                    <FaTimes />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="stats-summary">
        <div className="stat-item">
          <div className="stat-number">{alertas.filter(a => !a.resuelto).length}</div>
          <div className="stat-label">Alertas Pendientes</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{alertas.filter(a => a.tipo === 'error').length}</div>
          <div className="stat-label">Errores</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{alertas.filter(a => a.tipo === 'warning').length}</div>
          <div className="stat-label">Advertencias</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{alertas.filter(a => a.resuelto).length}</div>
          <div className="stat-label">Resueltas</div>
        </div>
      </div>

      <style jsx>{`
        .system-alerts {
          padding: 30px;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
        }

        .header h2 {
          color: var(--midnight-blue);
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .header p {
          color: #666;
          font-size: 1.1rem;
        }

        .filters {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .filter-group label {
          font-weight: 600;
          color: var(--dark-gray);
        }

        .filter-select {
          padding: 8px 12px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: white;
          font-size: 14px;
        }

        .alerts-container {
          margin-bottom: 40px;
        }

        .alert-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 15px;
          box-shadow: var(--shadow);
          display: flex;
          gap: 15px;
          transition: all 0.3s ease;
        }

        .alert-card:hover {
          transform: translateY(-2px);
        }

        .alert-card.resuelto {
          opacity: 0.7;
          background: #f8f9fa;
        }

        .alert-icon {
          font-size: 1.5rem;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.05);
        }

        .alert-content {
          flex: 1;
        }

        .alert-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
        }

        .alert-header h3 {
          color: var(--dark-gray);
          font-size: 1.1rem;
          margin: 0;
        }

        .alert-meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .prioridad-badge {
          padding: 2px 6px;
          border-radius: 8px;
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .fecha {
          font-size: 0.8rem;
          color: #666;
        }

        .alert-description {
          color: #666;
          margin-bottom: 15px;
          line-height: 1.5;
        }

        .alert-actions {
          display: flex;
          gap: 10px;
        }

        .alert-actions .btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 12px;
          font-size: 0.9rem;
        }

        .no-alerts {
          text-align: center;
          padding: 50px;
          color: #666;
        }

        .no-alerts svg {
          font-size: 3rem;
          margin-bottom: 15px;
          opacity: 0.5;
        }

        .stats-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: var(--shadow);
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--lime-green);
          margin-bottom: 5px;
        }

        .stat-label {
          color: #666;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .loading {
          text-align: center;
          padding: 50px;
          color: #666;
        }

        @media (max-width: 768px) {
          .alert-header {
            flex-direction: column;
            gap: 10px;
          }

          .alert-actions {
            flex-direction: column;
          }

          .stats-summary {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default SystemAlerts; 