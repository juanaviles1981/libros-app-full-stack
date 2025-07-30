# 📚 Sistema de Gestión de Libros (En construcción)

Una aplicación web full-stack para gestionar una biblioteca personal, desarrollada con React, Node.js, Express y MongoDB, implementando autenticación JWT.

## 🚀 Características

- ✅ **Autenticación JWT**: Sistema de login seguro con tokens
- ✅ **CRUD de Libros**: Crear, leer, actualizar y eliminar libros
- ✅ **Base de datos MongoDB**: Persistencia de datos
- ✅ **Interface React**: Frontend moderno y responsivo
- ✅ **API REST**: Backend estructurado con Express
- ✅ **Rutas protegidas**: Acceso controlado mediante middleware

## 🛠️ Tecnologías

### Frontend
- **React** 18+ con Hooks
- **CSS3** para estilos
- **Fetch API** para comunicación con el backend

### Backend
- **Node.js** con ES6 modules
- **Express.js** para el servidor
- **MongoDB** con Mongoose ODM
- **JWT** (jsonwebtoken) para autenticación
- **CORS** habilitado

## 📋 Prerrequisitos

- Node.js 16+ 
- MongoDB (local o Atlas)
- npm o yarn

## 🔧 Instalación

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd sistema-libros
```

### 2. Instalar dependencias del backend
```bash
npm install express mongoose cors dotenv jsonwebtoken
```

### 3. Instalar dependencias del frontend
```bash
cd frontend
npm install
```

### 4. Configurar variables de entorno
Crear archivo `.env` en la raíz:
```env
MONGO_URI=mongodb://localhost:27017/libros
JWT_SECRET=tu_clave_secreta_aqui
PORT=5000
```

## 🚀 Uso

### 1. Iniciar el servidor backend
```bash
npm start
# o
node index.js
```

### 2. Iniciar el frontend
```bash
cd frontend
npm start
```

### 3. Acceder a la aplicación
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## 🔐 Credenciales de Prueba

Para probar la aplicación, utiliza:
- **Usuario**: `Juan`
- **Contraseña**: `Juan1981`

## 📁 Estructura del Proyecto

```
proyecto/
├── backend/
│   ├── models/
│   │   └── Libro.js          # Modelo de Mongoose
│   ├── routes/
│   │   ├── auth.js           # Rutas de autenticación
│   │   └── libros.js         # Rutas de libros
│   ├── middleware/
│   │   └── auth.js           # Middleware JWT
│   ├── index.js              # Servidor principal
│   └── .env                  # Variables de entorno
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Componente principal
│   │   └── App.css           # Estilos
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/verify` - Verificar token

### Libros (Requieren autenticación)
- `GET /api/libros` - Obtener todos los libros
- `POST /api/libros` - Crear nuevo libro

## 🧪 Cómo Funciona la Autenticación

1. **Login**: Usuario envía credenciales → Servidor valida → Devuelve JWT token
2. **Almacenamiento**: Frontend guarda token en localStorage
3. **Peticiones**: Cada request incluye `Authorization: Bearer <token>`
4. **Verificación**: Middleware verifica token antes de acceder a rutas protegidas

## 🚧 Funcionalidades en Desarrollo

- [ ] Registro de nuevos usuarios
- [ ] Recuperación de contraseñas
- [ ] Roles de usuario (admin/user)
- [ ] Edición de libros
- [ ] Eliminación de libros
- [ ] Búsqueda y filtros
- [ ] Paginación
- [ ] Carga de imágenes
- [ ] Categorías personalizadas

## 🤝 Contribuir

Este proyecto está en desarrollo activo. Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Notas de Desarrollo

- El usuario de prueba está hardcodeado en `routes/auth.js`
- Los tokens JWT expiran en 24 horas
- La aplicación usa autenticación stateless
- MongoDB debe estar corriendo para que funcione

## 📧 Contacto

Si tienes preguntas o sugerencias, no dudes en abrir un issue.

---

**Estado**: 🚧 En desarrollo activo