import { ApiProperty } from "@nestjs/swagger";

export class AccessRequestResponseDto {
    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    readonly requestNumber: string;

    @ApiProperty()
    readonly requester: string;

    @ApiProperty()
    readonly reasonToRequest: string;

    @ApiProperty()
    readonly reasonToReject: string;

    @ApiProperty()
    readonly requestStatus: string;
}