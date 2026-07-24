# Sexta Compañía de Bomberos — Puerto Nuevo

Landing page en React preparada para publicarse desde un repositorio de GitHub
mediante Netlify.

## Desarrollo local

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

Para validar la versión de producción:

```bash
npm run lint
npm run build
npm run preview
```

## Publicación en Netlify

1. Crear un repositorio nuevo en la cuenta de GitHub que administrará el sitio.
2. Subir el contenido de esta carpeta como raíz del repositorio.
3. En Netlify, elegir **Add new site → Import an existing project** y conectar ese
   repositorio.
4. Netlify leerá `netlify.toml`: el comando es `npm run build` y la carpeta
   publicada es `dist`.
5. En **Site configuration → Environment variables**, agregar:
   - `GEMINI_API_KEY`: clave de Google AI Studio.
   - `GEMINI_MODEL`: opcional; por defecto `gemini-2.5-flash`.
   - `VITE_DONATION_URL`: URL oficial del portal de donaciones.
6. Hacer un nuevo deploy después de cambiar variables que empiecen por `VITE_`.

Los formularios de contacto y postulación usan Netlify Forms. Sus envíos aparecen
en la sección **Forms** del sitio.

## Revisión obligatoria antes de publicar

Este proyecto proviene de un prototipo y contiene información institucional que
debe confirmarse con la Compañía:

- nombre oficial, fecha de fundación y estadísticas;
- dirección, coordenadas, correo, horarios y zonas de cobertura;
- requisitos de admisión y duración de la formación;
- testimonios, fotografías y descripción del material mayor;
- montos, destino y URL oficial de donaciones.

Las respuestas del asistente son orientativas. No deben presentarse como
instrucciones oficiales de evacuación ni reemplazar a los organismos de
emergencia. Para emergencias en Chile se debe llamar al 132.
