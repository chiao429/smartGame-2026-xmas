FROM node:20-alpine AS app-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

FROM node:20-alpine AS server-deps
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev

FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=app-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=8080
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 game
COPY --from=builder --chown=game:nodejs /app/out ./out
COPY --from=server-deps --chown=game:nodejs /app/server/node_modules ./server/node_modules
COPY --chown=game:nodejs server/index.js ./server/index.js
USER game
EXPOSE 8080
CMD ["node", "server/index.js"]
