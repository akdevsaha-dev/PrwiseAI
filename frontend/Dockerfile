# Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build the application
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

RUN pnpm build

# Production stage
FROM node:20-slim AS runner

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Set environment to production
ENV NODE_ENV=production

# Copy necessary files from builder
# Next.js standalone output is more efficient, but let's stick to standard build for now
# and just copy what's needed for 'pnpm start'
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Re-install only production dependencies to keep image small
RUN pnpm install --prod --frozen-lockfile

# Expose port
EXPOSE 3001

# Start command
CMD ["pnpm", "start", "-p", "3001"]
