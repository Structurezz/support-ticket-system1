import { IsString } from 'class-validator';

export class UpdateTicketDto {
    @IsString()
    status?: string; // Assuming you want to update the status of the ticket
}
