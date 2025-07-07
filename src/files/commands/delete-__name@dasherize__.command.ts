import { ICommand, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { <%= classify(name) %>Service } from '../<%= dasherize(name) %>.service';

export class Delete<%= classify(name) %>Command implements ICommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(Delete<%= classify(name) %>Command)
export class Delete<%= classify(name) %>Handler implements ICommandHandler<Delete<%= classify(name) %>Command> {
  constructor(private readonly <%= camelize(name) %>Service: <%= classify(name) %>Service) {}

  async execute(command: Delete<%= classify(name) %>Command) {
    return this.<%= camelize(name) %>Service.remove(command.id);
  }
}
