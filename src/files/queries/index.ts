import { Get<%= classify(name) %>Handler } from './get-<%= dasherize(name) %>.query';
import { Get<%= classify(name) %>sHandler } from './get-<%= dasherize(name) %>s.query';

export * from './get-<%= dasherize(name) %>.query';
export * from './get-<%= dasherize(name) %>s.query';

export const QueryHandlers = [
  Get<%= classify(name) %>Handler,
  Get<%= classify(name) %>sHandler,
];
