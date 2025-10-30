import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly surname: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly isActive: boolean;
}