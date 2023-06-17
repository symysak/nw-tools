# ビルドする
FROM node:20 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# 依存パッケージのインストールを行う
FROM node:20 as deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# 本番環境
FROM gcr.io/distroless/nodejs20-debian11
WORKDIR /app
ENV NODE_ENV production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=nonroot:nonroot /app/dist ./dist
COPY --chown=nonroot:nonroot ./cache.json .
USER nonroot
EXPOSE 3001
CMD ["dist/app.js"]