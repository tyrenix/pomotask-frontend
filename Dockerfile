FROM node:22
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . ./code
ENV NEXT_HOST="https://pt.tyrenix.ru"
ENV NEXT_PUBLIC_DOMAIN="https://pt.tyrenix.ru"
ENV NEXT_PUBLIC_NEXT_HOST="https://pt.tyrenix.ru"
ENV NEXT_PUBLIC_API_HOST="https://pt.tyrenix.ru/api"
ENV NEXT_PUBLIC_IS_DEV="NO"
RUN cd ./code && npm run build
RUN mv ./code/.next .next
RUN mv ./code/public .
RUN rm -r ./code
EXPOSE 3000
CMD ["npm", "run", "start"]
