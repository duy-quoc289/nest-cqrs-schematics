import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { <%= classify(name) %>Service } from '../<%= dasherize(name) %>.service';

export class Get<%= classify(name) %>sQuery implements IQuery {
  constructor(
    public readonly page: number = 1,
    public readonly limit: number = 10,
  ) {}
}

@QueryHandler(Get<%= classify(name) %>sQuery)
export class Get<%= classify(name) %>sHandler implements IQueryHandler<Get<%= classify(name) %>sQuery> {
  constructor(private readonly <%= camelize(name) %>Service: <%= classify(name) %>Service) {}

  async execute(query: Get<%= classify(name) %>sQuery) {
    return this.<%= camelize(name) %>Service.findAll(query.page, query.limit);
  }
}
