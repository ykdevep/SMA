# SMA
SMA


Paso 0: Preparar entorno de desarrollo

Instalar Node.js® y npm (https://nodejs.org/en/download/)

Verificar que está corriendo como mínimo node 6.9.x y npm 3.x.x (Mi entorno está en node.js 8.9.0 lts)
    node -v 
    npm -v 

Instalar Mongo DB (Versión 3.4)
Paso 1: Descargar el proyecto de github

git clone https://github.com/ykdevep/SMA.git
Paso 2: Instalar las dependencias del cliente

npm install -g @angular/cli
cd semeat/cliente
npm install --save
Paso 3: Instalar las dependencias del servidor

cd ../server
npm install --save
Paso 4: Iniciar backend

Iniciar en modo desarrollo puerto 3000 (npm run start:watch)
Iniciar en modo producción puerto 3000 (npm run start)
Paso 5: Iniciar frontend

cd ../cliente
Iniciar en modo desarrollo puerto 4200 (ng serve)
Iniciar en modo producción puerto 4000
    npm run build:ssr
    npm run serve:ssr
