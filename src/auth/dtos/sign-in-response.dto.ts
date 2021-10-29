import { UserResponseDto } from '../../user/dtos/user-response.dto';

export type SignInResponseDto = { token: string; user: UserResponseDto };
