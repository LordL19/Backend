FROM node:20.10-alpine AS DEP
WORKDIR /app
COPY ./package.json .
RUN npm install

FROM node:20.10-alpine AS BUILD
WORKDIR /app
COPY --from=DEP /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20.10-alpine AS DEP-PROD
WORKDIR /app
COPY --from=DEP /app/package.json .
RUN npm install --omit=dev

FROM node:20.10-alpine AS PROD
WORKDIR /app
COPY --from=DEP-PROD /app/node_modules ./node_modules
COPY --from=BUILD /app/dist .
EXPOSE 3000
CMD node app.js