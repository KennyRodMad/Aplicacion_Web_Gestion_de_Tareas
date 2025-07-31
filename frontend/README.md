# SENAPlanner - Frontend

Frontend de la aplicación web para gestión de tareas y proyectos académicos, desarrollado con React.js.

## 🚀 Características

- **Interfaz Moderna**: Diseño responsivo y atractivo con CSS moderno
- **Autenticación**: Sistema de login/registro con roles (Aprendiz, Instructor, Administrador)
- **Dashboards Específicos**: Paneles personalizados para cada tipo de usuario
- **Gestión de Tareas**: Crear, editar, asignar y monitorear tareas
- **Gestión de Proyectos**: Organizar tareas en proyectos con seguimiento de progreso
- **Reportes**: Generación de reportes y estadísticas
- **Notificaciones**: Sistema de alertas y notificaciones en tiempo real
- **Colaboración**: Herramientas para trabajo en equipo

## 🛠️ Tecnologías Utilizadas

- **React.js 18**: Framework principal
- **React Router**: Navegación entre páginas
- **Axios**: Cliente HTTP para API
- **React Hot Toast**: Notificaciones
- **React Icons**: Iconografía
- **CSS Modules**: Estilos modulares
- **Responsive Design**: Diseño adaptativo

## 📁 Estructura del Proyecto

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── UserManagement.js
│   │   │   ├── Statistics.js
│   │   │   ├── Reports.js
│   │   │   └── SystemAlerts.js
│   │   ├── auth/
│   │   │   └── RoleSelectionModal.js
│   │   ├── aprendiz/
│   │   │   ├── MisTareas.js
│   │   │   ├── MisProyectos.js
│   │   │   ├── Reportes.js
│   │   │   └── Colaboracion.js
│   │   └── instructor/
│   │       ├── SeguimientoEstudiantes.js
│   │       ├── Evaluaciones.js
│   │       ├── Reportes.js
│   │       └── Chat.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── LandingPage.js
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── AdminDashboard.js
│   │   ├── AprendizDashboard.js
│   │   └── InstructorDashboard.js
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── tareaService.js
│   │   ├── proyectoService.js
│   │   └── usuarioService.js
│   ├── styles/
│   │   └── globals.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Backend de SENAPlanner ejecutándose en `http://localhost:5001`

### Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd frontend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   Crear un archivo `.env` en la raíz del proyecto:
   ```env
   REACT_APP_API_URL=http://localhost:5001
   ```

4. **Ejecutar en modo desarrollo**:
   ```bash
   npm start
   ```

5. **Abrir en el navegador**:
   La aplicación estará disponible en `http://localhost:3000`

## 📋 Scripts Disponibles

- `npm start`: Ejecuta la aplicación en modo desarrollo
- `npm build`: Construye la aplicación para producción
- `npm test`: Ejecuta las pruebas
- `npm eject`: Expone la configuración de webpack (irreversible)

## 🔐 Roles de Usuario

### Aprendiz
- Gestión de tareas personales
- Visualización de proyectos asignados
- Reportes de progreso individual
- Colaboración con otros estudiantes

### Instructor
- Seguimiento de estudiantes
- Evaluación de tareas y proyectos
- Generación de reportes grupales
- Comunicación con estudiantes

### Administrador
- Gestión completa de usuarios
- Estadísticas del sistema
- Generación de reportes globales
- Monitoreo de alertas del sistema

## 🎨 Diseño y UX

- **Paleta de Colores**:
  - Verde Lima (#32CD32) - Color principal
  - Azul Medianoche (#191970) - Color secundario
  - Naranja Amarillo (#FFA500) - Color de acento
  - Blanco (#FFFFFF) - Fondo

- **Tipografía**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Responsive**: Diseño adaptativo para desktop, tablet y móvil
- **Accesibilidad**: Contraste adecuado y navegación por teclado

## 🔧 Configuración de Desarrollo

### Proxy
El frontend está configurado para hacer proxy al backend en `http://localhost:5001`. Esto permite que las peticiones API se redirijan automáticamente.

### Estructura de Componentes
- **Páginas**: Componentes principales de cada vista
- **Componentes**: Elementos reutilizables organizados por funcionalidad
- **Servicios**: Lógica de comunicación con la API
- **Contextos**: Estado global de la aplicación

## 🚀 Despliegue

### Construcción para Producción
```bash
npm run build
```

### Variables de Entorno para Producción
```env
REACT_APP_API_URL=https://tu-backend.com
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto, contacta al equipo de desarrollo.

---

**SENAPlanner** - Plataforma diseñada para la excelencia educativa 🎓 