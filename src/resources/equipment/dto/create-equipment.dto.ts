import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEquipmentDto {
  @IsNotEmpty()
  @IsInt()
  clientId: number;

  @IsNotEmpty()
  @IsInt()
  createdById: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  equipmentType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  model?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  version?: string;

  @IsOptional()
  @IsInt()
  cc?: number;

  @IsOptional()
  @IsInt()
  yearVersion?: number;

  @IsOptional()
  @IsInt()
  yearModel?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  color?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  plate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  serial?: string;
}
