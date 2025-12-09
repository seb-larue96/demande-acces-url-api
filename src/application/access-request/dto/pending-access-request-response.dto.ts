import { ApiProperty } from "@nestjs/swagger";

export class PendingAccessRequestResponseDto {
    @ApiProperty()
    readonly id: number;
    
    @ApiProperty()
    readonly url: string;

    @ApiProperty()
    readonly requesterEmail: string;

    @ApiProperty()
    readonly reasonToRequest: string;

    @ApiProperty()
    readonly requestStatus: string;
}