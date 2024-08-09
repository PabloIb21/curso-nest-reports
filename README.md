# Ejecutar en dev

1. Clonar el repositorio
2. Instalar dependencias ```npm install```
3. Clonar `.env.template` y renombrar a `.env` y completar las variables de entorno
4. Levantar la base de datos `docker compose up -d`
5. Generar el prisma client `npx prisma generate`
6. Ejecutar proyecto `npm run start:dev`