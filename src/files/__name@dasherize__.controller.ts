import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Create<%= classify(name) %>Dto, Update<%= classify(name) %>Dto } from './dto';
import { 
  Create<%= classify(name) %>Command,
  Update<%= classify(name) %>Command,
  Delete<%= classify(name) %>Command 
} from './commands';
import { 
  Get<%= classify(name) %>Query,
  Get<%= classify(name) %>sQuery 
} from './queries';

@Controller('<%= dasherize(name) %>')
export class <%= classify(name) %>Controller {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createDto: Create<%= classify(name) %>Dto) {
    return this.commandBus.execute(new Create<%= classify(name) %>Command(createDto));
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10
  ) {
    return this.queryBus.execute(new Get<%= classify(name) %>sQuery(Number(page), Number(limit)));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.queryBus.execute(new Get<%= classify(name) %>Query(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateDto: Update<%= classify(name) %>Dto
  ) {
    return this.commandBus.execute(new Update<%= classify(name) %>Command(id, updateDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.commandBus.execute(new Delete<%= classify(name) %>Command(id));
  }
}
