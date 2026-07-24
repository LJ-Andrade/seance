# Guía de túnel temporal para demos

Esta guía permite compartir la versión local de Seamce mediante una URL HTTPS temporal, sin desplegar cambios a producción.

## Cuándo usarlo

Usalo para mostrar avances puntuales a clientes o desarrolladores. No es un entorno de producción: la URL cambia cada vez que se reinicia el túnel y deja de funcionar cuando se cierra la terminal o se apaga la computadora.

## Requisitos

- Estar en la carpeta `web` del repositorio.
- Tener instaladas las dependencias del proyecto (`npm install`).
- Tener Node.js y acceso a internet.

## Iniciar la demo

Abrí dos terminales en la carpeta `web`.

En la primera, iniciá el sitio:

```powershell
npm run dev
```

Esperá hasta ver que Next.js está disponible en `http://localhost:3000`.

En la segunda, ejecutá el túnel:

```powershell
npx --yes wrangler tunnel quick-start http://127.0.0.1:3000
```

El comando mostrará una dirección similar a esta:

```text
https://palabras-aleatorias.trycloudflare.com
```

Esa es la URL que podés enviar para revisar la demo. Para abrir la versión en español, agregá `/es` al final.

## Detener la demo

En ambas terminales, presioná `Ctrl + C`:

1. Primero detené el túnel.
2. Después detené el servidor de Next.js.

Al detener cualquiera de los dos procesos, la URL deja de funcionar.

## Seguridad y límites

- Cualquier persona que tenga la URL puede acceder a la demo mientras esté activa.
- No compartas datos reales, claves, archivos privados ni información sensible en el entorno local expuesto.
- No uses este mecanismo para producción, campañas ni revisiones que requieran una URL estable.
- Para una demo estable y con control de acceso, usá un entorno de staging desplegado en el proveedor de hosting elegido.
