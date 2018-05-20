FROM node:carbon as build
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

FROM node:carbon
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package.json /usr/src/app/package.json
COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=build /usr/src/app/build /usr/src/app/build
RUN ls .
EXPOSE 8080
CMD [ "npm", "run", "serve:prod" ]
