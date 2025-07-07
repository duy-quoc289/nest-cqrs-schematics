import { Injectable } from '@nestjs/common';
import { Create<%= classify(name) %>Dto } from './dto/create-<%= dasherize(name) %>.dto';
import { Update<%= classify(name) %>Dto } from './dto/update-<%= dasherize(name) %>.dto';
import { <%= classify(name) %>Repository } from './repositories/<%= dasherize(name) %>.repository';

@Injectable()
export class <%= classify(name) %>Service {
  constructor(private readonly <%= camelize(name) %>Repository: <%= classify(name) %>Repository) {}

  async create(createDto: Create<%= classify(name) %>Dto) {
    return this.<%= camelize(name) %>Repository.create(createDto);
  }

  async findAll(page: number = 1, limit: number = 10) {
    return this.<%= camelize(name) %>Repository.findAll(page, limit);
  }

  async findOne(id: string) {
    return this.<%= camelize(name) %>Repository.findOne(id);
  }

  async update(id: string, updateDto: Update<%= classify(name) %>Dto) {
    return this.<%= camelize(name) %>Repository.update(id, updateDto);
  }

  async remove(id: string) {
    return this.<%= camelize(name) %>Repository.remove(id);
  }
}
