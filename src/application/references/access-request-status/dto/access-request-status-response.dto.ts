import { ApiProperty } from "@nestjs/swagger";

export class AccessRequestStatusResponseDto {
    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    readonly code: string;
}