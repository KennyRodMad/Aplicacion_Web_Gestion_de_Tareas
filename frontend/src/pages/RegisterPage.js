import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'aprendiz';
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    confirmarContraseña: '',
    rol: role
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const roleInfo = {
    aprendiz: {
      title: 'Registro como Aprendiz',
      description: 'Completa la información para crear tu cuenta',
      icon: '📚'
    },
    instructor: {
      title: 'Registro como Instructor',
      description: 'Completa la información para crear tu cuenta',
      icon: '👨‍🏫'
    },
    admin: {
      title: 'Registro como Administrador',
      description: 'Completa la información para crear tu cuenta',
      icon: '👨‍💼'
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.contraseña !== formData.confirmarContraseña) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (formData.contraseña.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const userData = {
        nombre: formData.nombre,
        email: formData.email,
        contraseña: formData.contraseña,
        rol: formData.rol
      };

      const result = await register(userData);
      
      if (result.success) {
        toast.success('¡Registro exitoso! Ahora puedes iniciar sesión.');
        navigate('/login');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <Link to="/" className="back-link">
            ← Volver al inicio
          </Link>
        </div>

        <div className="register-card">
          <div className="register-header-card">
            <div className="role-icon">{roleInfo[role].icon}</div>
            <h1>{roleInfo[role].title}</h1>
            <p>{roleInfo[role].description}</p>
            <button className="close-button" onClick={() => navigate('/')}>×</button>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre Completo</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contraseña">Contraseña</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="contraseña"
                    name="contraseña"
                    value={formData.contraseña}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmarContraseña">Confirmar Contraseña</label>
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmarContraseña"
                    name="confirmarContraseña"
                    value={formData.confirmarContraseña}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/')}
              >
                Volver
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .register-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .register-container {
          width: 100%;
          max-width: 600px;
        }

        .register-header {
          margin-bottom: 20px;
        }

        .back-link {
          color: white;
          text-decoration: none;
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .register-card {
          background: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .register-header-card {
          text-align: center;
          margin-bottom: 30px;
          position: relative;
        }

        .role-icon {
          font-size: 2rem;
          margin-bottom: 15px;
        }

        .register-header-card h1 {
          color: var(--midnight-blue);
          margin-bottom: 10px;
          font-size: 1.8rem;
        }

        .register-header-card p {
          color: #666;
          font-size: 0.9rem;
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

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .password-input {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          padding: 0;
        }

        .form-actions {
          display: flex;
          gap: 15px;
          justify-content: space-between;
          margin-top: 30px;
        }

        .form-actions .btn {
          flex: 1;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage; 