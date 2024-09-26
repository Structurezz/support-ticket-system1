import { Controller, Post, Body, InternalServerErrorException } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @Post()
    async create(@Body() createTicketDto: CreateTicketDto) {
        try {
            return await this.ticketsService.create(createTicketDto);
        } catch (error) {
            console.error('Error creating ticket:', error); // Log the error for debugging
            throw new InternalServerErrorException('Could not create ticket');
        }
    }
}
