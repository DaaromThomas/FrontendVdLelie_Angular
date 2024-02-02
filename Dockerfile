FROM node:18.17.1-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
COPY . .
ARG API_URL
ENV API_URL=$API_URL
RUN sh replace.sh

FROM nginx:stable
COPY default.conf /etc/nginx/conf.d
COPY --from=build /app/dist/frontend-vd-lelie-angular/ /usr/share/nginx/html
EXPOSE 80
