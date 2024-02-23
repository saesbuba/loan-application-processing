FROM node:20.5.0-alpine3.18
RUN addgroup nodeapp && adduser -S -G nodeapp nodeapp
USER nodeapp
WORKDIR /app/
COPY --chown=nodeapp package*.json .
RUN npm install
COPY --chown=nodeapp . .
EXPOSE 3000
RUN npm run build
CMD ["npm", "start"]