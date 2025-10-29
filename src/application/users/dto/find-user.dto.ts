import { ApiProperty } from "@nestjs/swagger";

export class FindUserDto {
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