import { AccessRequestResponseDto } from "../dto/access-request-response.dto";
import { AccessRequest } from "../entities/access-request.entity";

export function mapToAccessRequestResponseDto(accessRequest: AccessRequest): AccessRequestResponseDto {
    return {
        id: accessRequest.id,
        requestNumber: accessRequest.requestNumber,
        url: accessRequest.Url,
        requester: accessRequest.requester.name + ' ' + accessRequest.requester.surname,
        reasonToRequest: accessRequest.reasonToRequest,
        reasonToReject: accessRequest.reasonToReject,
        requestStatus: accessRequest.requestStatus.code
    }
}