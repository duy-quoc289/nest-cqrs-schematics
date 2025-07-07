import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { <%= classify(name) %>Service } from '../<%= dasherize(name) %>.service';

export class Get<%= classify(name) %>Query implements IQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(Get<%= classify(name) %>Query)
export class Get<%= classify(name) %>Handler implements IQueryHandler<Get<%= classify(name) %>Query> {
  constructor(private readonly <%= camelize(name) %>Service: <%= classify(name) %>Service) {}

  async execute(query: Get<%= classify(name) %>Query) {
    return this.<%= camelize(name) %>Service.findOne(query.id);
  }
}
