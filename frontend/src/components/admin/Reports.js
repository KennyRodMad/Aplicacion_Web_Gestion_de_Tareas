import React, { useState } from 'react';
import { FaDownload, FaEye } from 'react-icons/fa';

const Reports = () => {

  const [dateRange, setDateRange] = useState('mes');

  const reports = [
    {
      id: 'usuarios',
      title: 'Reporte de Usuarios',
      description: 'Estadísticas detalladas de usuarios registrados',
      icon: '👥',
      lastGenerated: '2024-01-15'
    },
    {
      id: 'tareas',
      title: 'Reporte de Tareas',
      description: 'Análisis de tareas y su estado de completación',
      icon: '📋',
      lastGenerated: '2024-01-14'
    },
    {
      id: 'proyectos',
      title: 'Reporte de Proyectos',
      description: 'Progreso y rendimiento de proyectos activos',
      icon: '📊',
      lastGenerated: '2024-01-13'
    },
    {
      id: 'rendimiento',
      title: 'Reporte de Rendimiento',
      description: 'Métricas de rendimiento general del sistema',
      icon: '⚡',
      lastGenerated: '2024-01-12'
    }
  ];

  const handleGenerateReport = (reportId) => {
    console.log(`Generando reporte: ${reportId}`);
    // Aquí se implementaría la lógica para generar el reporte
  };

  const handleDownloadReport = (reportId) => {
    console.log(`Descargando reporte: ${reportId}`);
    // Aquí se implementaría la lógica para descargar el reporte
  };

  return (
    <div className="reports">
      <div className="header">
        <h2>Reportes del Sistema</h2>
        <p>Genera y descarga reportes detallados</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Rango de Fechas:</label>
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="filter-select"
          >
            <option value="semana">Última semana</option>
            <option value="mes">Último mes</option>
            <option value="trimestre">Último trimestre</option>
            <option value="año">Último año</option>
          </select>
        </div>
      </div>

      <div className="reports-grid">
        {reports.map((report) => (
          <div key={report.id} className="report-card">
            <div className="report-header">
              <div className="report-icon">{report.icon}</div>
              <div className="report-info">
                <h3>{report.title}</h3>
                <p>{report.description}</p>
                <span className="last-generated">
                  Último generado: {report.lastGenerated}
                </span>
              </div>
            </div>
            
            <div className="report-actions">
              <button 
                className="btn btn-primary"
                onClick={() => handleGenerateReport(report.id)}
              >
                <FaEye />
                Generar
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => handleDownloadReport(report.id)}
              >
                <FaDownload />
                Descargar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="quick-stats">
        <h3>Estadísticas Rápidas</h3>
        <div className="stats-row">
          <div className="stat-item">
            <div className="stat-number">1,234</div>
            <div className="stat-label">Usuarios Totales</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">567</div>
            <div className="stat-label">Tareas Activas</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">89</div>
            <div className="stat-label">Proyectos Activos</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">78%</div>
            <div className="stat-label">Tasa de Completación</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .reports {
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

        .reports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .report-card {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: var(--shadow);
          transition: transform 0.3s ease;
        }

        .report-card:hover {
          transform: translateY(-2px);
        }

        .report-header {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
        }

        .report-icon {
          font-size: 2rem;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--light-gray);
          border-radius: 12px;
        }

        .report-info h3 {
          color: var(--midnight-blue);
          margin-bottom: 5px;
          font-size: 1.2rem;
        }

        .report-info p {
          color: #666;
          margin-bottom: 10px;
          font-size: 0.9rem;
        }

        .last-generated {
          font-size: 0.8rem;
          color: #999;
        }

        .report-actions {
          display: flex;
          gap: 10px;
        }

        .report-actions .btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          font-size: 0.9rem;
        }

        .quick-stats {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: var(--shadow);
        }

        .quick-stats h3 {
          color: var(--midnight-blue);
          margin-bottom: 20px;
          font-size: 1.3rem;
          text-align: center;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .stat-item {
          text-align: center;
          padding: 20px;
          background: var(--light-gray);
          border-radius: 8px;
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

        @media (max-width: 768px) {
          .reports-grid {
            grid-template-columns: 1fr;
          }

          .report-actions {
            flex-direction: column;
          }

          .stats-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default Reports; 