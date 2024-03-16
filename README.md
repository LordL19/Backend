# NestConnect - Backend - Univalle

Este proyecto es el backend de la aplicación NestConnect

## Intrucciones para correr el proyecto
1. correr el comando `npm install`
2. canbiar el nombre del archivo .env.example a .env
3. ejecutar el docker-compose con el comando `docker-compose up -d`
4. ejecutar el build de prisma con el comando `npx prisma migrate dev --name init` para una migración inicial
5. ejecutar el build de prisma con el comando `npx prisma migrate dev` para crear una nueva migración
6. ejecutar el comando `npx prisma migrate deploy` para aplicar las migraciones a la base de datos
7. ejecutar el comando `npm run dev`