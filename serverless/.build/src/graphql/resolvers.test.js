"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers_1 = require("./resolvers");
const globals_1 = require("@jest/globals");
(0, globals_1.describe)('GraphQL Resolvers', () => {
    (0, globals_1.describe)('Query', () => {
        (0, globals_1.it)('hello should return greeting message', () => {
            (0, globals_1.expect)(resolvers_1.resolvers.Query.hello()).toBe('Hello from GraphQL!');
        });
    });
});
