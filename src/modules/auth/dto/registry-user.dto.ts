import {IsEmail, IsString, IsUrl, IsURLOptions, Length} from 'class-validator';

export class RegistryUserDto {
  @IsString()
  @Length(4, 20, {
    message: '',
  })
  readonly name: string;
  @IsUrl({protocols: ['http', 'https']})
  readonly avatar: string;
  @IsString()
  readonly 'user_name': string;
  @IsEmail()
  readonly email: string;
  @IsString()
  @Length(6, 30)
  readonly password: string;
}
