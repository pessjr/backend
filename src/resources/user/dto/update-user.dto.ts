import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { RolesEnum } from 'src/enums/RolesEnum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  roles?: RolesEnum[];
}
