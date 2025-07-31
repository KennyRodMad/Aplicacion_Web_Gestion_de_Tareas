import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    contraseña: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData.email, formData.contraseña);
      
      if (result.success) {
        toast.success('¡Inicio de sesión exitoso!');
        
        // Redirigir según el rol
        switch (result.usuario.rol) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'instructor':
            navigate('/instructor/dashboard');
            break;
          case 'aprendiz':
            navigate('/aprendiz/dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <Link to="/" className="back-link">
            ← Volver al inicio
          </Link>
        </div>

        <div className="login-card">
          <div className="login-logo">
            <div className="logo-icon"></div>
          </div>
          
          <h1>Iniciar Sesión</h1>
          <p>Accede a tu cuenta de SENAPlanner</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contraseña">Contraseña</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="contraseña"
                  name="contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                  placeholder="Tu contraseña"
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

            <button
              type="submit"
              className="btn btn-primary login-button"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="login-footer">
            <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .login-container {
          width: 100%;
          max-width: 400px;
        }

        .login-header {
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

        .login-card {
          background: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .login-logo {
          text-align: center;
          margin-bottom: 20px;
        }

        .logo-icon {
          width: 50px;
          height: 50px;
          background: var(--lime-green);
          border-radius: 8px;
          margin: 0 auto;
        }

        .login-card h1 {
          text-align: center;
          color: var(--midnight-blue);
          margin-bottom: 10px;
          font-size: 1.8rem;
        }

        .login-card p {
          text-align: center;
          color: #666;
          margin-bottom: 30px;
          font-size: 0.9rem;
        }

        .login-form {
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

        .login-button {
          width: 100%;
          padding: 15px;
          font-size: 1rem;
          margin-top: 10px;
        }

        .login-footer {
          text-align: center;
          margin-top: 20px;
        }

        .login-footer a {
          color: var(--lime-green);
          text-decoration: none;
          font-weight: 600;
        }

        .login-footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default LoginPage; 