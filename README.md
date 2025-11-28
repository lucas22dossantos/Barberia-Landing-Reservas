## Demo en Producción

Puedes ver el proyecto funcionando aquí:

🔗 **https://barberia-rho-seven.vercel.app/**

# **Barbería Landing con Sistema de Reservas**

Landing page para una barbería desarrollada con **React** y **Vite**. Incluye un **sistema de reservas**, diseño **responsive**, animaciones suaves y navegación moderna orientada a la experiencia del usuario.

---

## Tabla de Contenidos

1. Descripción
2. Tecnologías
3. Instalación
4. Uso
5. Funcionalidades
6. Estructura del Proyecto
7. Contribuir
8. Licencia
9. Contacto

---

## Descripción

Este proyecto consiste en una landing page para una barbería con el objetivo de mostrar servicios, destacar el estilo visual y permitir a los usuarios **solicitar un turno mediante un formulario**. La aplicación está diseñada para funcionar correctamente en dispositivos móviles, tablets y escritorio. Incluye animaciones suaves, componentes reutilizables y diseño responsive.

---

## Tecnologías

- React
- Vite
- Tailwind CSS
- Sass
- JavaScript ES6+
- Supabase (para almacenamiento de reservas)
- EmailJS (para notificaciones por correo)
- ESLint

---

## Instalación

Para ejecutar el proyecto en entorno local:

1. Clonar el repositorio.
   git clone [https://github.com/lucas22dossantos/Barberia-Landing-Reservas.git](https://github.com/lucas22dossantos/Barberia-Landing-Reservas.git)

2. Acceder al directorio.
   cd Barberia-Landing-Reservas

3. Instalar dependencias.
   npm install

4. Iniciar el servidor de desarrollo.
   npm run dev

Luego abrir la URL que muestre la terminal (por defecto [http://localhost:5173](http://localhost:5173)).

---

## Uso

Cuando el servidor está en funcionamiento, se puede navegar por las secciones de la landing.
El formulario de reservas permite ingresar datos del cliente y el servicio deseado, con la opción de elegir un barbero específico o "Cualquiera".
Los datos se guardan en Supabase, y al confirmar la reserva se muestra un modal de notificación al usuario con opción de editar los datos antes de enviar.

---

## Funcionalidades

- Diseño responsive: se adapta a móviles, tablets y desktop.

- Sistema de reservas:

  - Selección de barbero o "Cualquiera".

  - Validaciones de formulario.

  - Confirmación de reserva con opción de editar datos.

  - Guardado de reservas en base de datos Supabase.

  - Feedback al usuario mediante modal personalizado.

- Formulario de contacto:

  - Mensajes enviados con modal de confirmación.

- Secciones de servicios y equipo con animaciones suaves.

- Navegación fluida y scroll animado.

---

## Estructura del Proyecto

```
Barberia-Landing-Reservas/
│
├─ public/
│   └─ index.html
│
├─ src/
│   ├─ components/        Componentes reutilizables (Navbar, Footer, Formulario, etc.)
│   ├─ pages/             Vistas principales del sitio
│   ├─ styles/            Configuración y estilos de Tailwind
│   └─ App.jsx
│
├─ .gitignore
├─ package.json
├─ vite.config.js
└─ tailwind.config.js
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
