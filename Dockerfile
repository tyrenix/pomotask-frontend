FROM node:22
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . ./code
ENV NEXT_HOST="https://pt.dilacraft.ru"
RUN cd ./code && npm run build
RUN mv ./code/.next .next
RUN mv ./code/public .
RUN rm -r ./code
EXPOSE 3000
CMD ["npm", "run", "start"]