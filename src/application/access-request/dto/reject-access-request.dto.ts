import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class RejectAccessRequestDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(500)
    reason?: string;
}