import { ApiProperty } from "@nestjs/swagger";

export class RoleResponseDto {
    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    readonly name: number;
}