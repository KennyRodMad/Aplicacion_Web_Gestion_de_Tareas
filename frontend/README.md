# 📝 SENAPlanner: App Web para la Gestión de Proyectos y Tareas - Frontend


## 📌 1. Descripción del Frontend actual

Frontend de la aplicación web para gestión de tareas y proyectos académicos, desarrollado con React.js.

## 🚀 2. Características

- **Interfaz Moderna**: Diseño responsivo y atractivo con CSS moderno.
- **Autenticación**: Sistema de login/registro con roles (Aprendiz, Instructor, Administrador).
- **Dashboards Específicos**: Paneles personalizados para cada tipo de usuario.
- **Gestión de Tareas**: Crear, editar, asignar y monitorear tareas.
- **Gestión de Proyectos**: Organizar tareas en proyectos con seguimiento de progreso.
- **Reportes**: Generación de reportes y estadísticas.
- **Notificaciones**: Sistema de alertas y notificaciones en tiempo real.
- **Colaboración**: Herramientas para trabajo en equipo.

## 🛠️ 3. Tecnologías Utilizadas

- **React.js 18**: Framework principal.
- **React Router**: Navegación entre páginas.
- **Axios**: Cliente HTTP para API.
- **React Hot Toast**: Notificaciones.
- **React Icons**: Iconografía.
- **CSS Modules**: Estilos modulares.
- **Responsive Design**: Diseño adaptativo.

## 📁 4. Estructura del Proyecto

```
frontend/                                    # Carpeta principal del frontend
├── public/                                  # Archivos estáticos
│   ├── index.html
│   └── manifest.json
├── src/                                     # Código fuente de la interfaz
│   ├── components/                          # Componentes por rol y funcionalidad
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
│   ├── context/                             # Manejo de estado global
│   │   └── AuthContext.js
│   ├── pages/                               # Vistas principales
│   │   ├── LandingPage.js
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── AdminDashboard.js
│   │   ├── AprendizDashboard.js
│   │   └── InstructorDashboard.js
│   ├── services/                            # Comunicación con la API
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── tareaService.js
│   │   ├── proyectoService.js
│   │   └── usuarioService.js
│   ├── styles/                              # Estilos globales
│   │   └── globals.css
│   ├── App.js                               # Componente principal
│   └── index.js                             # Punto de entrada del frontend
├── package.json
└── README.md                                # Documentación del Frontend
```

## 🚦 5. Vistas y Navegación de Usuarios

### 5.1. 🌐 Vista de Inicio (/)
Componentes:
   - Banner de bienvenida
   - Descripción corta del propósito de la app
   - Botones:
      - Registrarse
      - Iniciar Sesión
   - Modal de selección de rol: Aprendiz, Instructor, Administrador
- Lógica:
   - Redirección al formulario correspondiente según rol.
   - Si registro exitoso → Mostrar toast o modal “Registro exitoso” + botón “Iniciar Sesión”.

### 5.2. 🔐 Vista de Autenticación (/login)
Componentes:
   - Formulario (email + contraseña)
   - Opción de recuperación de contraseña
   - Autenticación condicional:
      - Al iniciar sesión redirigir según el rol:
         - /admin/dashboard
         - /aprendiz/dashboard
         - /instructor/dashboard

### 5.3. 👨‍💼 Vista del Usuario Administrador (/admin/dashboard)
Componentes:
   - Panel con pestañas:
      - Gestión de Usuarios (crear, editar, desactivar)
      - Estadísticas del sistema (número de usuarios, tareas, progreso general)
      - Gestión de roles y permisos
      - Vista de reportes globales (exportables)
   - Alertas del sistema
   - Botón de cerrar sesión

### 5.4. 👩‍🎓 Vista del Usuario Aprendiz (/aprendiz/dashboard)
Componentes:
   - Panel de navegación:
      - Mis Tareas
         - Crear/editar tareas
         - Ver estado: Pendiente / En Progreso / Completada
      - Mis Proyectos
         - Consultar proyectos asignados
         - Visualizar progreso (barras, pastel)
      - Reportes
         - Avance individual
         - Tareas completadas
      - Colaboración
         - Chat interno
         - Comentarios por tarea
      - Notificaciones
         - Alertas de tareas, plazos y mensajes

### 5.5. 👨‍🏫 Vista del Usuario Instructor (/instructor/dashboard)
Componentes:
   - Panel de navegación:
      - Seguimiento de aprendices
         - Ver tareas por aprendiz
         - Visualizar progreso individual y grupal
      - Evaluación de tareas/proyectos
         - Agregar retroalimentación
         - Calificar desempeño
      - Reportes detallados
      - Notificaciones(de entrega, retrasos, comentarios)
      - Chat con aprendices


## 🧩 6. Especificación de Vistas Detalladas 

Estas vistas son comunes y adaptables por rol (pueden variar en contenido o permisos):

### 6.1. 📋 Vista de Gestión de Tareas (/tareas)
Componentes:
   - Lista de tareas con filtros:
      - Estado (pendiente, en progreso, completada)
      - Prioridad
      - Etiquetas
   - Botón + Nueva Tarea
   - Vista de tarea:
      - Nombre
      - Descripción
      - Fecha de vencimiento
      - Estado editable
      - Comentarios / historial
      - Adjuntos
      - Asignación (individual / grupal)

### 6.2. 📂 Vista de Proyectos (/proyectos)   
Componentes:
   - Lista de proyectos
      - Nombre, objetivos, fechas clave
   - Subproyectos o fases
   - Avance visual (barras o pastel)
   - Tareas agrupadas por proyecto
   - Indicadores de riesgo

### 6.3. 📊 Vista de Reportes (/reportes)
Componentes:
   - Avance personal (aprendiz)
   - Comparativo entre proyectos (instructor/admin)
   - Exportar a CSV o PDF
   - Métricas clave:
      - Tareas completadas vs. pendientes
      - Tiempo estimado vs. real
      - Rendimiento del equipo

### 6.4. 📥 Vista de Archivos (/archivos)
Componentes:
   - Subida de archivos por tarea o proyecto
   - Control de versiones
   - Previsualización de imágenes/videos

### 6.5. 📨 Vista de Mensajería Interna (/mensajes)
Componentes:
   - Chat en tiempo real
   - Canal por proyecto o tarea
   - Notificaciones emergentes

### 6.6. ⚙️ Vista de Configuración (/configuracion)
Componentes:
   - Editar perfil
   - Preferencias de notificaciones
   - Idioma y tema
   - Seguridad: Cambiar contraseña, cerrar sesión

### 6.7. 🔔 Panel Centralizado de Notificaciones (/notificaciones)
Componentes:
   - Notificaciones ordenadas cronológicamente
   - Filtros: Tareas, mensajes, plazos, revisiones
   - Configuración de preferencias


## 🎨 7. Diseño y UX

- **Paleta de Colores**:
  - Verde Lima (#32CD32) - Color principal
  - Azul Medianoche (#191970) - Color secundario
  - Naranja Amarillo (#FFA500) - Color de acento
  - Blanco (#FFFFFF) - Fondo

- **Tipografía**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Responsive**: Diseño adaptativo para desktop, tablet y móvil
- **Accesibilidad**: Contraste adecuado y navegación por teclado

## 🔧 8. Configuración de Desarrollo

### 8.1. Proxy
El frontend está configurado para hacer proxy al backend en `http://localhost:5001`. Esto permite que las peticiones API se redirijan automáticamente.

### 8.2. Estructura de Componentes
- **Páginas**: Componentes principales de cada vista
- **Componentes**: Elementos reutilizables organizados por funcionalidad
- **Servicios**: Lógica de comunicación con la API
- **Contextos**: Estado global de la aplicación


##

# 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Backend de SENAPlanner ejecutándose en `http://localhost:5001`

### Configuración y Ejecución

1. **Acceder al directorio del Frontend**:
   ```bash
   cd frontend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno (agregar línea en el archivo `.env` en la raíz del proyecto)**:
   ```
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


## 📞 Soporte
Para preguntas sobre el proyecto, contacta al equipo de desarrollo.

---

**SENAPlanner** - Plataforma diseñada para la excelencia educativa 🎓 