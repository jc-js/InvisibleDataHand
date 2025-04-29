FROM node:20-alpine

WORKDIR /app
RUN rm -rf node_modules package-lock.json
COPY package.json package-lock.json ./
RUN npm ci

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]