import { UserResponseDto } from './../../user/dto/user-response.dto';

export type SignInResponseDto = { token: string; user: UserResponseDto };
