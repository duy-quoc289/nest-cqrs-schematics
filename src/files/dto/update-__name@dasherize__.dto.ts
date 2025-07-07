import { PartialType } from '@nestjs/mapped-types';
import { Create<%= classify(name) %>Dto } from './create-<%= dasherize(name) %>.dto';

export class Update<%= classify(name) %>Dto extends PartialType(Create<%= classify(name) %>Dto) {}
