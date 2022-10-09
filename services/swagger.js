const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LMBS",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: [`${path.join(__dirname, "../docs/*.js")}`],
};

module.exports = {
  swaggerJsDoc,
  swaggerUi,
  swaggerSpec,
};
