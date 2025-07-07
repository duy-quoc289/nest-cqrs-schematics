import { <%= classify(name) %>Repository } from './<%= dasherize(name) %>.repository';

export * from './<%= dasherize(name) %>.repository';

export const Repositories = [
  <%= classify(name) %>Repository,
];
