import { Injectable } from '@nestjs/common';
import { Create<%= classify(name) %>Dto } from './dto/create-<%= dasherize(name) %>.dto';
import { Update<%= classify(name) %>Dto } from './dto/update-<%= dasherize(name) %>.dto';<% if (includeRepository) { %>
import { <%= classify(name) %>Repository } from './repositories/<%= dasherize(name) %>.repository';<% } %>

@Injectable()
export class <%= classify(name) %>Service {<% if (includeRepository) { %>
  constructor(private readonly <%= camelize(name) %>Repository: <%= classify(name) %>Repository) {}<% } %>

  async create(createDto: Create<%= classify(name) %>Dto) {<% if (includeRepository) { %>
    return this.<%= camelize(name) %>Repository.create(createDto);<% } else { %>
    // TODO: Implement create logic
    return {
      id: Date.now().toString(),
      ...createDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };<% } %>
  }

  async findAll(page: number = 1, limit: number = 10) {<% if (includeRepository) { %>
    return this.<%= camelize(name) %>Repository.findAll(page, limit);<% } else { %>
    // TODO: Implement find all logic with pagination
    return {
      data: [],
      total: 0,
      page,
      limit,
      totalPages: 0,
    };<% } %>
  }

  async findOne(id: string) {<% if (includeRepository) { %>
    return this.<%= camelize(name) %>Repository.findOne(id);<% } else { %>
    // TODO: Implement find one logic
    return {
      id,
      name: `Sample <%= classify(name) %>`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };<% } %>
  }

  async update(id: string, updateDto: Update<%= classify(name) %>Dto) {<% if (includeRepository) { %>
    return this.<%= camelize(name) %>Repository.update(id, updateDto);<% } else { %>
    // TODO: Implement update logic
    return {
      id,
      ...updateDto,
      updatedAt: new Date(),
    };<% } %>
  }

  async remove(id: string) {<% if (includeRepository) { %>
    return this.<%= camelize(name) %>Repository.remove(id);<% } else { %>
    // TODO: Implement delete logic
    return {
      id,
      deleted: true,
      deletedAt: new Date(),
    };<% } %>
  }
}
