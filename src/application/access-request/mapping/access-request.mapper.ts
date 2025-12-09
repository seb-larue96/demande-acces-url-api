import { PendingAccessRequestResponseDto } from "../dto/pending-access-request-response.dto";
import { AccessRequestResponseDto } from "../dto/access-request-response.dto";
import { AccessRequest } from "../entities/access-request.entity";

export function mapToAccessRequestResponseDto(accessRequest: AccessRequest): AccessRequestResponseDto {
    return {
        id: accessRequest.id,
        requestNumber: accessRequest.requestNumber,
        url: accessRequest.url,
        requester: accessRequest.requester.name + ' ' + accessRequest.requester.surname,
        reasonToRequest: accessRequest.reasonToRequest,
        reasonToReject: accessRequest.reasonToReject,
        requestStatus: accessRequest.requestStatus.code
    }
}

export function mapToAccessRequestPendingResponseDto(accessRequest: AccessRequest): PendingAccessRequestResponseDto {
    return {
        id: accessRequest.id,
        url: accessRequest.url,
        requesterEmail: accessRequest.requester.email,
        reasonToRequest: accessRequest.reasonToRequest,
        requestStatus: accessRequest.requestStatus.code
    }
}