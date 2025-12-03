## Demo en Producción

Puedes ver el proyecto funcionando aquí:

🔗 **https://barberia-rho-seven.vercel.app/**

# **Barbería Landing + Sistema de Reservas + Panel Administrativo**

Proyecto completo para una barbería que incluye:

- **Landing page** (Frontend)
- **Sistema de reservas**
- **Panel administrativo** (en construcción)
- **Backend/Servidor propio** (Node + Express)
- **Base de datos** (Supabase)

El proyecto está dividido en dos carpetas principales:

- /frontend → React + Vite (Landing + Panel Admin)
- /backend → Node + Express + Supabase (API REST)

---

## Tabla de Contenidos

1. Descripción
2. Tecnologías
3. Instalación
4. Scripts Disponibles
5. Estructura del Proyecto
6. Funcionalidades
7. Contribuir
8. Licencia
9. Contacto

---

## Descripción

Este proyecto consiste en una **landing page profesional** para una barbería, junto con un **sistema de reservas** y un **panel de administración** para gestionar:

- Reservas
- Usuarios administradores
- Recuperación de contraseña
- Inicio de sesión seguro

El backend maneja autenticación, validación de tokens, envío de correos y consulta a la base de datos.

Todo está desarrollado con buenas prácticas, arquitectura organizada y diseño responsive.

---

## Tecnologías

### **Frontend**

- React
- Vite
- Tailwind CSS
- Sass
- JavaScript ES6+
- React Router
- EmailJS
- AOS Animations

### **Backend**

- Node.js
- Express
- Supabase (Base de datos PostgreSQL)
- JWT (tokens)
- Bcrypt (hashing de contraseñas)
- Nodemailer (envío de emails)
- Cors
- Dotenv

---

## Instalación

Para ejecutar el proyecto en entorno local:

1. Clonar el repositorio.
   git clone https://github.com/lucas22dossantos/Barberia-Landing-Reservas.git

2. Acceder al directorio.
   cd Barberia-Landing-Reservas

### Frontend

- cd frontend
- npm install

Iniciar en desarrollo:

- npm run dev

### Backend

- cd backend
- npm install

Variables de entorno requeridas:

- backend/.env

  - SUPABASE_URL=
  - SUPABASE_SERVICE_KEY=
  - JWT_SECRET=
  - EMAIL_HOST=
  - EMAIL_USER=
  - EMAIL_PASS=

Iniciar el backend:

- npm run dev

El servidor se iniciará en:

- http://localhost:4000 (o el puerto que tengas en el backend)

---

## Scripts Disponibles

### Frontend

- npm run dev → entorno desarrollo

- npm run build → build de producción

- npm run preview → previsualización

### Backend

- npm run dev → servidor con nodemon

- npm start → iniciar servidor en producción

---

## Funcionalidades

### Frontend

- Landing responsiva

- Sistema de reservas conectado a Supabase

- Animaciones suaves

- Panel administrativo (login, recuperación de contraseña, dashboard)

### Backend

- Autenticación con JWT

- Roles y permisos

- Recuperación de contraseña con token por correo

- Validación de enlaces expirados

- CRUD de reservas

- Manejo seguro de contraseñas

- Endpoints REST organizados

---

## Estructura del Proyecto

```
Barberia-Landing-Reservas/
│
├── frontend/                # Landing + Panel Admin
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── admin/
│   │   └── App.jsx
│   ├──.env
│   └── package.json
│
├── backend/                 # API REST
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── README.md
├── .gitignore

```

---

## Contribuir

1. Hacer un fork.
2. Crear una rama nueva.
   git checkout -b feature/nueva-funcionalidad
3. Realizar los cambios y hacer commit.
   git commit -m "Descripción de la mejora"
4. Subir la rama.
   git push origin feature/nueva-funcionalidad
5. Crear un Pull Request.

---

## Licencia

Este proyecto se encuentra bajo la licencia MIT.

---

## Contacto

Autor: Lucas dos Santos
GitHub: [https://github.com/lucas22dossantos](https://github.com/lucas22dossantos)

---
