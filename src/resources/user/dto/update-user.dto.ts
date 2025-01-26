import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Role } from 'src/enums/Role';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  roles?: Role[];
}
