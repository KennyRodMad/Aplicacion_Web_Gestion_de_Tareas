import React from 'react';
import { FaUsers, FaTasks, FaProjectDiagram, FaChartLine } from 'react-icons/fa';

const Statistics = () => {
  const statsData = [
    {
      title: 'Usuarios Registrados',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: <FaUsers />,
      color: '#28a745'
    },
    {
      title: 'Tareas Activas',
      value: '567',
      change: '+8%',
      changeType: 'positive',
      icon: <FaTasks />,
      color: '#007bff'
    },
    {
      title: 'Proyectos en Curso',
      value: '89',
      change: '+5%',
      changeType: 'positive',
      icon: <FaProjectDiagram />,
      color: '#ffc107'
    },
    {
      title: 'Tasa de Completación',
      value: '78%',
      change: '+3%',
      changeType: 'positive',
      icon: <FaChartLine />,
      color: '#17a2b8'
    }
  ];

  const chartData = [
    { month: 'Ene', usuarios: 120, tareas: 45, proyectos: 12 },
    { month: 'Feb', usuarios: 150, tareas: 52, proyectos: 15 },
    { month: 'Mar', usuarios: 180, tareas: 58, proyectos: 18 },
    { month: 'Abr', usuarios: 210, tareas: 65, proyectos: 22 },
    { month: 'May', usuarios: 240, tareas: 72, proyectos: 25 },
    { month: 'Jun', usuarios: 280, tareas: 80, proyectos: 28 }
  ];

  return (
    <div className="statistics">
      <div className="header">
        <h2>Estadísticas del Sistema</h2>
        <p>Resumen de métricas y tendencias</p>
      </div>

      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
              <span className={`stat-change ${stat.changeType}`}>
                {stat.change} desde el mes pasado
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Tendencia de Crecimiento</h3>
          <div className="chart-container">
            <div className="chart-bars">
              {chartData.map((data, index) => (
                <div key={index} className="chart-bar-group">
                  <div className="chart-bar-label">{data.month}</div>
                  <div className="chart-bars-container">
                    <div 
                      className="chart-bar usuarios"
                      style={{ height: `${(data.usuarios / 300) * 100}%` }}
                      title={`${data.usuarios} usuarios`}
                    ></div>
                    <div 
                      className="chart-bar tareas"
                      style={{ height: `${(data.tareas / 100) * 100}%` }}
                      title={`${data.tareas} tareas`}
                    ></div>
                    <div 
                      className="chart-bar proyectos"
                      style={{ height: `${(data.proyectos / 30) * 100}%` }}
                      title={`${data.proyectos} proyectos`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color usuarios"></div>
                <span>Usuarios</span>
              </div>
              <div className="legend-item">
                <div className="legend-color tareas"></div>
                <span>Tareas</span>
              </div>
              <div className="legend-item">
                <div className="legend-color proyectos"></div>
                <span>Proyectos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .statistics {
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

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
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
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
        }

        .stat-content h3 {
          font-size: 2rem;
          margin-bottom: 5px;
          color: var(--dark-gray);
        }

        .stat-content p {
          color: #666;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .stat-change {
          font-size: 0.8rem;
          font-weight: 600;
        }

        .stat-change.positive {
          color: #28a745;
        }

        .stat-change.negative {
          color: #dc3545;
        }

        .charts-section {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: var(--shadow);
        }

        .chart-card h3 {
          color: var(--midnight-blue);
          margin-bottom: 20px;
          font-size: 1.3rem;
        }

        .chart-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .chart-bars {
          display: flex;
          justify-content: space-around;
          align-items: end;
          height: 200px;
          padding: 20px 0;
        }

        .chart-bar-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .chart-bar-label {
          font-size: 0.9rem;
          color: #666;
          font-weight: 600;
        }

        .chart-bars-container {
          display: flex;
          gap: 4px;
          align-items: end;
          height: 150px;
        }

        .chart-bar {
          width: 20px;
          border-radius: 2px 2px 0 0;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .chart-bar.usuarios {
          background: #28a745;
        }

        .chart-bar.tareas {
          background: #007bff;
        }

        .chart-bar.proyectos {
          background: #ffc107;
        }

        .chart-legend {
          display: flex;
          justify-content: center;
          gap: 30px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 2px;
        }

        .legend-color.usuarios {
          background: #28a745;
        }

        .legend-color.tareas {
          background: #007bff;
        }

        .legend-color.proyectos {
          background: #ffc107;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .chart-bars {
            height: 150px;
          }

          .chart-bars-container {
            height: 100px;
          }

          .chart-legend {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Statistics; 