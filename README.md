# 📝 SENAPlanner: App Web para la Gestión de Proyectos y Tareas

**Grupo de Trabajo CLOUD GURUS:** Dixson Sneider Cardona Acevedo, Kenny Miguel Rodríguez Madrid, María Fernanda Vega Pacheco  
**Técnico en Programación de Aplicaciones y Servicios para la Nube - Ficha 3070096 - SENA**


## 🧩 1. Descripción General del Proyecto

La aplicación web de Gestión de Tareas y Proyectos SENAPlanner es una herramienta diseñada para satisfacer las necesidades de los aprendices y los instructores del SENA, específicamente para gestionar proyectos y tareas en entornos educativos y colaborativos. Se plantea como una solución moderna e integral que optimiza los procesos organizativos, fomenta la interacción entre los usuarios y mejora la eficiencia en el seguimiento del progreso de los proyectos.

Su diseño se enfoca en la facilidad de uso, asegurando que sea accesible para personas con diversos niveles de competencia tecnológica. La herramienta permitirá a los aprendices gestionar sus responsabilidades académicas, mientras que los instructores tendrán acceso a funcionalidades avanzadas para supervisar y evaluar el desempeño de los estudiantes.

Además, se adapta a dispositivos móviles y de escritorio, lo que garantiza un acceso universal para usuarios con diferentes recursos tecnológicos. Esto permite a los aprendices y equipos de trabajo mantenerse conectados, organizados y productivos sin importar su ubicación.
La visión de esta plataforma es proporcionar un sistema accesible, eficiente y adaptable que transforme la manera en que los aprendices e instructores del SENA organizan, gestionan y colaboran en sus proyectos académicos y profesionales.

La plataforma está diseñada para atender las necesidades específicas de tres perfiles principales de usuario: aprendices, instructores y administradores. Cada grupo tiene características y expectativas particulares que guian el diseño y la funcionalidad del sistema.


## 🏗️ 2. Arquitectura del Proyecto

El presente proyecto implementa una arquitectura de software basada en capas, complementada con el patrón Modelo–Vista–Controlador (MVC) adaptado al contexto de una API RESTful, y una clara separación cliente-servidor a través de un frontend desacoplado desarrollado en React. Esta combinación permite una solución modular, escalable y mantenible que facilita el trabajo colaborativo y la evolución continua del sistema.

### 2.1. 🔧 Backend: Arquitectura en Capas + Patrón MVC

El backend del sistema está desarrollado con Node.js, Express y MongoDB, estructurado en una arquitectura de capas que favorece la separación de responsabilidades. Cada capa cumple un rol específico:

- Modelo (models/): Define los esquemas de datos mediante Mongoose, representando entidades como Usuario, Proyecto, Tarea, Comentario, entre otros.
- Controlador (controllers/): Contiene la lógica de negocio y se encarga de procesar las solicitudes provenientes de las rutas y manipular los modelos.
- Rutas (routes/): Gestionan los endpoints de la API RESTful, conectando con sus respectivos controladores.
- Middlewares (middlewares/): Encargados de gestionar tareas transversales como la autenticación, autorización por roles, manejo centralizado de errores y validación de datos.
- Validadores (validators/): Utilizan express-validator para asegurar que los datos de entrada cumplan con las reglas establecidas.
- Configuración (config/): Centraliza la conexión a la base de datos MongoDB.
- Manejo de errores (error/): Define una clase personalizada para el control uniforme de errores.

Este diseño permite una implementación clara del patrón MVC en el backend, donde la vista es sustituida por respuestas JSON que pueden ser consumidas por cualquier cliente, especialmente por la aplicación frontend.

### 2.2. 🌐 Frontend: Arquitectura Modular y Cliente SPA

El frontend está desarrollado con React.js, bajo el enfoque de aplicación de una sola página (SPA). Su diseño modular se apoya en los siguientes principios:

- Componentización por roles: Existen componentes específicos para los tipos de usuario (admin, aprendiz, instructor), lo que permite un control claro de las interfaces y responsabilidades.
- Separación de responsabilidades:
   - components/: Contiene los bloques funcionales reutilizables.
   - pages/: Define las distintas vistas y pantallas de la aplicación.
   - services/: Gestiona la comunicación con la API del backend.
   - context/: Maneja el estado global de autenticación y otros contextos compartidos.
   - styles/, assets/: Centralizan los recursos visuales y de estilo.
- Gestión del estado: Se emplea el Context API para compartir datos entre componentes, especialmente para mantener el estado de autenticación del usuario.

Esta arquitectura desacoplada permite que el frontend se mantenga independiente del backend, favoreciendo futuras migraciones, reusabilidad de la API y pruebas por separado.

### 2.3. 🔄 Comunicación Cliente-Servidor

El proyecto sigue una arquitectura cliente-servidor, donde el cliente (frontend) realiza peticiones HTTP al servidor (backend) a través de endpoints definidos en la API REST. Esto permite un flujo claro de solicitudes y respuestas, soportando operaciones como autenticación, creación y asignación de tareas, gestión de proyectos, colaboración entre roles, notificaciones, carga de archivos y generación de reportes.

### 2.4. 📁 Estructura del Proyecto

Toda esta arquitectura se ve reflejada en una estructura de carpetas clara y organizada, que facilita la comprensión del sistema por parte de desarrolladores actuales y futuros. A continuación se muestra la jerarquía completa del proyecto:

```
Aplicación Web - Gestión de Tareas/
│
├── backend/                   # Carpeta principal del backend
│   ├── config/                # Configuración de conexión a MongoDB
│   ├── controllers/           # Lógica de negocio por recurso
│   ├── error/                 # Manejo de errores personalizados
│   ├── middlewares/           # Middlewares globales y de seguridad
│   ├── models/                # Modelos de datos (esquemas Mongoose)
│   ├── routes/                # Rutas de la API RESTful
│   ├── uploads/               # Archivos subidos por los usuarios (ignorado en git)
│   ├── validators/            # Validadores con express-validator
│   ├── package.json           # Dependencias y scripts
│   ├── server.js              # Punto de entrada del servidor
│   └── README.md              # Documentación del Backend
│
├── frontend/                  # Carpeta principal del frontend
│   ├── public/                # Archivos estáticos
│   ├── src/                   # Código fuente de la interfaz
│   │   ├── components/        # Componentes por rol y funcionalidad
│   │   ├── context/           # Manejo de estado global
│   │   ├── pages/             # Vistas principales
│   │   ├── services/          # Comunicación con la API
│   │   ├── styles/            # Estilos globales
│   │   ├── App.js             # Componente principal
│   │   └── index.js           # Punto de entrada del frontend
│   ├── package.json
│   └── README.md              # Documentación del Frontend
├── .env                       # Variables de entorno (ignorado en git)
├── .gitignore                 # Exclusiones de Git
└── README.md                  # Documentación general del proyecto

```


## ⚙️ 3. Funcionalidades Principales 

Las funcionalidades SENAPlanner están diseñadas para satisfacer las necesidades organizativas, colaborativas y de monitoreo de los usuarios finales (aprendices, instructores y administradores). Estas funciones son clave para garantizar que la plataforma cumpla con su propósito de optimizar la productividad y mejorar el desempeño de los equipos. A continuación, se describen las funcionalidades principales de manera detallada:

#### 📝 Crear Tareas
- Cada tarea tendrá atributos: nombre, descripción, prioridad, estado (pendiente, en progreso, completada) y fecha de vencimiento.
- Clasificación mediante etiquetas personalizadas.

#### 👥 Asignar Tareas
- Asignación a otros miembros del equipo o como tareas individuales.
- Soporte para asignación múltiple en tareas grupales.

#### 📊 Monitorear Tareas
- Visualización en tiempo real del estado de tareas.
- Métricas como porcentaje de avance y comparación entre tiempo estimado vs. tiempo real.

#### 🕓 Historial y Actividad
- Registro completo de modificaciones (usuario, fecha, cambios).
- Seguimiento de comentarios y notas relacionadas a cada tarea.

#### 📂 Agrupar Tareas
- Organización de tareas relacionadas dentro de un proyecto.
- Creación de subproyectos o fases dentro de un proyecto principal.

#### 🎯 Definir Objetivos y Plazos
- Inclusión de objetivos específicos, indicadores de éxito y plazos generales en cada proyecto.
- Soporte para objetivos SMART (específicos, medibles, alcanzables, relevantes y con límite de tiempo).

#### 📈 Progreso del Proyecto
- Visualización mediante gráficos y métricas (tareas completadas vs. pendientes, tiempo invertido).
- Indicadores de riesgos por retrasos detectados.

#### 🤝 Colaboración y Roles
- Asignación de roles: líder, colaborador, observador.
- Espacio centralizado para comentarios y discusiones por proyecto.

#### 🧩 Gestión de Flujos de Trabajo
- Interfaz drag-and-drop (arrastrar y soltar) para mover tareas entre columnas (pendiente, en progreso, en revisión, completada).
- Personalización de columnas según el proyecto.

#### 🚦 Vista de Prioridades
- Identificación de tareas críticas o urgentes mediante colores y etiquetas.
- Filtros por prioridad, responsable o estado.

#### ⏱ Seguimiento en Tiempo Real
- Actualización automática de cambios realizados por otros usuarios.
- Vistas grupales e individuales del flujo de trabajo.

#### 📱 Soporte Multidispositivo
- Diseño responsivo adaptado a pantallas grandes y pequeñas (desktop, tablet, móvil).

#### 🔔 Notificaciones
- Recordatorios de fechas límite.
- Avisos de nuevas tareas asignadas o cambios importantes.
- Notificaciones de comentarios o solicitudes de revisión.

#### 🎛 Personalización
- Configuración de frecuencia y medio de notificaciones (correo, push, avisos in-app).
- Posibilidad de silenciar tareas o proyectos específicos.

#### 🧠 Alertas Inteligentes
- Avisos predictivos, como riesgo de no cumplir plazos u otras anomalías detectadas.

#### 📥 Panel Centralizado de Notificaciones
- Vista cronológica de todos los eventos recientes dentro de la plataforma.

#### 📄 Reportes
- Progreso individual: tareas completadas por cada aprendiz.
- Rendimiento del equipo: métricas del desempeño grupal.
- Estado del proyecto: detalle de tareas completadas, retrasos y cumplimiento de objetivos.

#### 📊 Visualización Gráfica
- Gráficos de barras, líneas y pastel para visualizar métricas clave.
- Tablas exportables en formatos como CSV o PDF.

#### 🔄 Exportación e Integración
- Exportación de reportes para presentaciones o revisiones externas.
- usuario, tipo, mensaje, leída, fecha, origen

#### 🔐 Acceso por Rol
- Instructores: acceso a reportes detallados de aprendices bajo su cargo.
- Administradores: generación de estadísticas globales del sistema.

#### 💬 Mensajería Interna
- Chat en tiempo real entre usuarios.
- Notificaciones de mensajes importantes relacionados a tareas y proyectos.

#### 📎 Subida de Archivos
- Adjuntar documentos, imágenes o videos a tareas y proyectos.
- Control de versiones y almacenamiento seguro.


## 👥 4. Perfiles de Usuario

La plataforma está diseñada para atender las necesidades específicas de tres perfiles principales de usuario: aprendices, instructores y administradores. 

### 4.1. 🧑‍🎓 Aprendices (Usuarios Finales Primarios)
- Rol Principal:
   - Crear, gestionar y completar tareas.
   - Colaborar en proyectos grupales.
   - Consultar reportes y recibir retroalimentación.
- Expectativas:
   - Flujo de trabajo intuitivo.
   - Acceso a tableros, métricas y alertas.
   - Interfaz amigable para tareas escolares.

### 4.2. 👨‍🏫 Instructores (Supervisores)
- Rol Principal:
   - Supervisar proyectos de aprendices.
   - Evaluar, comentar y retroalimentar tareas.
   - Acceder a reportes e indicadores.
- Expectativas:
   - Vista global e individual de proyectos y tareas.
   - Herramientas de calificación y evaluación.
   - Notificaciones claras y filtradas.

### 4.3. 👨‍💻 Administradores (Gestores del Sistema)
- Rol Principal:
   - Gestión técnica de la plataforma.
   - Control de usuarios, roles, configuración.
   - Monitoreo y mantenimiento del sistema.
- Expectativas:
   - Control completo del sistema.
   - Acceso a estadísticas y reportes globales.
   - Ajustes y soporte técnico integral.

 
##

# 🚀 Instalación, Configuración y Ejecución del Proyecto

### Prerrequisitos para el Backend
- Node.js (v14 o superior)
- MongoDB
- Git

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/KennyRodMad/Aplicacion_Web_Gestion_de_Tareas.git
   ```

### Configuración

2. **Acceder al directorio Backend del proyecto**
   ```bash
   cd backend
   ```

3. **Instalar dependencias**
   ```bash
   npm install
   ```

4. **Configurar variables de entorno (Crear archivo .env)**
   ```bash
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/web_gestion_tareas
   JWT_SECRET=SISTEMAproyectosSENA2025
   ```

4. **Crear manualmente la carpeta archivos subidos`uploads/` en la raíz de `backend/`**
   ```bash
   mkdir uploads
   ```

### Ejecución

5. **Iniciar el servido de MongoDB**
   ```bash
   mongod
   ```

6. **Ejecutar el backeend con uno de los dos comandos (según se requiera)**
   ```bash
   npm run dev #Ejecutar en desarrollo con nodemon
   npm start #Ejecutar en producción
   ```

### Prerrequisitos para ejecución en el Frontend
- Backend de SENAPlanner ejecutándose en `http://localhost:5001`

7. **Acceder al directorio Frontend del proyecto**
   ```bash
   cd frontend
   ```

8. **Instalar dependencias**
   ```bash
   npm install
   ```

10. **Agregar en el archivo .env**
   ```bash
   REACT_APP_API_URL=http://localhost:5001
   ```

11. **Ejecutar en modo desarrollo**:
   ```bash
   npm start
   ```

12. **Abrir en el navegador**:
   La aplicación estará disponible en `http://localhost:3000`



