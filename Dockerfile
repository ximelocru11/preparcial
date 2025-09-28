# Usa Node en Alpine (ligero)
FROM node:18-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copia primero los manifests para cachear deps
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto que usa Next en dev
EXPOSE 3000

# ¡Aquí SÍ va 'dev', pero como CMD (en runtime), no en build!
CMD ["npm", "run", "dev"]
