"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const server_1 = require("@apollo/server");
const aws_lambda_1 = require("@as-integrations/aws-lambda");
const schema_1 = require("../graphql/schema");
const resolvers_1 = require("../graphql/resolvers");
const server = new server_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: resolvers_1.resolvers,
});
exports.handler = (0, aws_lambda_1.startServerAndCreateLambdaHandler)(server, aws_lambda_1.handlers.createAPIGatewayProxyEventRequestHandler());
