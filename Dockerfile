FROM node:carbon as build
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

FROM node:carbon
WORKDIR /usr/src/app
COPY --from=build /usr/src/app /usr/src/app
RUN ls .
EXPOSE 8080
CMD [ "npm", "run", "serve:prod" ]
