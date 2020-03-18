import { IsDateString, IsOptional } from 'class-validator';

export class ListUsage {
  @IsDateString()
  @IsOptional()
  before?: string;

  @IsDateString()
  @IsOptional()
  after?: string;
}
