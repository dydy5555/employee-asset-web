FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm -f install --frozen-lockfile

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm -f install --production --frozen-lockfile

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package*.json ./

EXPOSE 3600

CMD ["npm", "start"]
