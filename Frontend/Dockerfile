# Frontend/Dockerfile
FROM oven/bun:1

WORKDIR /app

COPY package.json ./
RUN bun install

COPY . .

EXPOSE 8080

# add --host and --port to make it accessible outside the container
CMD ["bun", "run", "dev", "--", "--host", "--port", "8080"]