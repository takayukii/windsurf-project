import { resolvers } from './resolvers';
import { describe, it, expect } from '@jest/globals';

describe('GraphQL Resolvers', () => {
  describe('Query', () => {
    it('hello should return greeting message', () => {
      expect(resolvers.Query.hello()).toBe('Hello from GraphQL!');
    });
  });
});
