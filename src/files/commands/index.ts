import { Create<%= classify(name) %>Handler } from './create-<%= dasherize(name) %>.command';
import { Update<%= classify(name) %>Handler } from './update-<%= dasherize(name) %>.command';
import { Delete<%= classify(name) %>Handler } from './delete-<%= dasherize(name) %>.command';

export * from './create-<%= dasherize(name) %>.command';
export * from './update-<%= dasherize(name) %>.command';
export * from './delete-<%= dasherize(name) %>.command';

export const CommandHandlers = [
  Create<%= classify(name) %>Handler,
  Update<%= classify(name) %>Handler,
  Delete<%= classify(name) %>Handler,
];
