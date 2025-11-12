FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

CMD [ "npm", "run", "dev" ]

# # Build the Vite app
# RUN npm run build

# # Serve the app with nginx
# FROM nginx:stable-alpine

# # Copy built files from previous stage
# COPY --from=build /app/dist /usr/share/nginx/html

# # Copy nginx config (optional)
# # COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Expose port
# EXPOSE 80

# # Start nginx
# CMD ["nginx", "-g", "daemon off;"]