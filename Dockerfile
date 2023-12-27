
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock ./
RUN  yarn install --frozen-lockfile --production=true

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# non-secret environment configuration FOR THE CLIENT
ARG NEXT_PUBLIC_TRACKD_RELATIVE
ENV NEXT_PUBLIC_TRACKD_RELATIVE ${NEXT_PUBLIC_TRACKD_RELATIVE}
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn run build

FROM node:18-alpine AS runner
WORKDIR /app

# non-secret environment configuration FOR THE SERVER
ARG OPENTSDB_HOST
ENV OPENTSDB_HOST ${OPENTSDB_HOST}
ARG LOKI_HOST
ENV LOKI_HOST ${LOKI_HOST}
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
