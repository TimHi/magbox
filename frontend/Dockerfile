# Build stage
FROM node:lts-alpine as build

ARG MODE=production
ENV NODE_ENV=$MODE

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN if [ "$MODE" = "production" ]; then \
      npm run build; \
    elif [ "$MODE" = "test" ]; then \
      npm run build:test; \
    else \
      npm run build:dev; \
    fi

# Runtime stage with NGINX
FROM nginx as runtime
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
