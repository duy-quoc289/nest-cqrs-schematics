import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { <%= classify(name) %>Controller } from './<%= dasherize(name) %>.controller';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';
import { CommandHandlers } from './commands';
import { QueryHandlers } from './queries';<% if (includeRepository) { %>
import { Repositories } from './repositories';<% } %>

@Module({
  imports: [CqrsModule],
  controllers: [<%= classify(name) %>Controller],
  providers: [
    <%= classify(name) %>Service,<% if (includeRepository) { %>
    ...Repositories,<% } %>
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [
    <%= classify(name) %>Service,<% if (includeRepository) { %>
    ...Repositories,<% } %>
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class <%= classify(name) %>Module {}
