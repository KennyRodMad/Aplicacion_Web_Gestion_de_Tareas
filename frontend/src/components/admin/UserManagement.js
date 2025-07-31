import React, { useState, useEffect } from 'react';
import { usuarioService } from '../../services/usuarioService';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaFilter } from 'react-icons/fa';

const UserManagement = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('todos');

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    try {
      const response = await usuarioService.getUsuarios();
      setUsuarios(response.data);
    } catch (error) {
      toast.error('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await usuarioService.deleteUsuario(userId);
        toast.success('Usuario eliminado exitosamente');
        loadUsuarios();
      } catch (error) {
        toast.error('Error al eliminar usuario');
      }
    }
  };

  const filteredUsuarios = usuarios.filter(usuario => {
    const matchesSearch = usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usuario.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'todos' || usuario.rol === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (rol) => {
    const roleConfig = {
      admin: { color: '#dc3545', label: 'Administrador' },
      instructor: { color: '#ffc107', label: 'Instructor' },
      aprendiz: { color: '#28a745', label: 'Aprendiz' }
    };
    
    const config = roleConfig[rol] || { color: '#6c757d', label: rol };
    
    return (
      <span 
        className="role-badge"
        style={{ backgroundColor: config.color }}
      >
        {config.label}
      </span>
    );
  };

  if (loading) {
    return <div className="loading">Cargando usuarios...</div>;
  }

  return (
    <div className="user-management">
      <div className="header">
        <h2>Gestión de Usuarios</h2>
        <button className="btn btn-primary">
          <FaPlus />
          Nuevo Usuario
        </button>
      </div>

      <div className="filters">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-box">
          <FaFilter />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="filter-select"
          >
            <option value="todos">Todos los roles</option>
            <option value="admin">Administradores</option>
            <option value="instructor">Instructores</option>
            <option value="aprendiz">Aprendices</option>
          </select>
        </div>
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios.map(usuario => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{getRoleBadge(usuario.rol)}</td>
                <td>
                  <span className={`status-badge ${usuario.activo ? 'active' : 'inactive'}`}>
                    {usuario.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <div className="actions">
                    <button className="action-btn edit">
                      <FaEdit />
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDeleteUser(usuario.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .user-management {
          padding: 30px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .header h2 {
          color: var(--midnight-blue);
          font-size: 1.8rem;
        }

        .filters {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
        }

        .search-box, .filter-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: white;
          padding: 10px 15px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .search-input, .filter-select {
          border: none;
          outline: none;
          background: none;
          font-size: 14px;
          min-width: 200px;
        }

        .users-table {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
        }

        th {
          background: var(--light-gray);
          font-weight: 600;
          color: var(--dark-gray);
        }

        .role-badge {
          padding: 4px 8px;
          border-radius: 12px;
          color: white;
          font-size: 12px;
          font-weight: 600;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-badge.active {
          background: #e8f5e8;
          color: #2e7d32;
        }

        .status-badge.inactive {
          background: #ffebee;
          color: #c62828;
        }

        .actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          background: none;
          border: none;
          padding: 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .action-btn.edit:hover {
          background: #e3f2fd;
          color: #1976d2;
        }

        .action-btn.delete:hover {
          background: #ffebee;
          color: #c62828;
        }

        .loading {
          text-align: center;
          padding: 50px;
          color: #666;
        }

        @media (max-width: 768px) {
          .filters {
            flex-direction: column;
          }
          
          .search-input, .filter-select {
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default UserManagement; 