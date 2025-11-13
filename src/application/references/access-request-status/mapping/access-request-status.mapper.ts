import { AccessRequestStatusResponseDto } from "../dto/access-request-status-response.dto";
import { AccessRequestStatus } from "../entities/access-request-status.entity";

export function mapToAccessRequestStatusResponseDto(accessRequestStatus: AccessRequestStatus): AccessRequestStatusResponseDto {
    return {
        id: accessRequestStatus.id,
        code: accessRequestStatus.code,
    }
}