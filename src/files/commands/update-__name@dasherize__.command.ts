import { ICommand, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Update<%= classify(name) %>Dto } from '../dto/update-<%= dasherize(name) %>.dto';
import { <%= classify(name) %>Service } from '../<%= dasherize(name) %>.service';

export class Update<%= classify(name) %>Command implements ICommand {
  constructor(
    public readonly id: string,
    public readonly updateDto: Update<%= classify(name) %>Dto,
  ) {}
}

@CommandHandler(Update<%= classify(name) %>Command)
export class Update<%= classify(name) %>Handler implements ICommandHandler<Update<%= classify(name) %>Command> {
  constructor(private readonly <%= camelize(name) %>Service: <%= classify(name) %>Service) {}

  async execute(command: Update<%= classify(name) %>Command) {
    return this.<%= camelize(name) %>Service.update(command.id, command.updateDto);
  }
}
