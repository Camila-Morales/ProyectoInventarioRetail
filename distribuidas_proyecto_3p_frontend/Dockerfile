# Usa una imagen base de Node.js
FROM node:22.12.0 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json (o yarn.lock)
COPY package.json package-lock.json* ./

# Instala las dependencias
RUN npm install

# Copia todo el código de la aplicación
COPY . .

# Asegúrate de que Vite use el archivo .env correcto
# A veces es necesario copiar también el .env al contenedor
COPY .env .env

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen de servidor web para servir los archivos estáticos
FROM nginx:alpine

# Copia los archivos de la aplicación construida a la carpeta donde Nginx los servirá
COPY --from=build /app/dist /usr/share/nginx/html

# Expón el puerto en el que Nginx estará escuchando
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
