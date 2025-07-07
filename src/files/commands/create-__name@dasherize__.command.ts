import { ICommand, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Create<%= classify(name) %>Dto } from '../dto/create-<%= dasherize(name) %>.dto';
import { <%= classify(name) %>Service } from '../<%= dasherize(name) %>.service';

export class Create<%= classify(name) %>Command implements ICommand {
  constructor(public readonly createDto: Create<%= classify(name) %>Dto) {}
}

@CommandHandler(Create<%= classify(name) %>Command)
export class Create<%= classify(name) %>Handler implements ICommandHandler<Create<%= classify(name) %>Command> {
  constructor(private readonly <%= camelize(name) %>Service: <%= classify(name) %>Service) {}

  async execute(command: Create<%= classify(name) %>Command) {
    return this.<%= camelize(name) %>Service.create(command.createDto);
  }
}
