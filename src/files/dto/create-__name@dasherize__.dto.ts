import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class Create<%= classify(name) %>Dto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  // TODO: Add more properties as needed
}
