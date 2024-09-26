import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from './ticket.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto'; // Ensure this DTO is defined

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @Post()
    async create(@Body() createTicketDto: CreateTicketDto) {
        try {
            return await this.ticketsService.create(createTicketDto);
        } catch (error) {
            console.error('Error creating ticket:', error.message);
            throw new HttpException('Failed to create ticket', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async findAll(): Promise<Ticket[]> {
        return this.ticketsService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Ticket> {
        try {
            return await this.ticketsService.findById(id);
        } catch (error) {
            console.error('Error finding ticket:', error.message);
            throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
        }
    }

    @Put(':id') // Define the PUT route here
    async update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto): Promise<Ticket> {
        try {
            return await this.ticketsService.update(id, updateTicketDto);
        } catch (error) {
            console.error('Error updating ticket:', error.message);
            throw new HttpException('Failed to update ticket', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch(':id/status')
    async updateStatus(@Param('id') id: string, @Body('status') status: string): Promise<Ticket> {
        try {
            return await this.ticketsService.updateStatus(id, status);
        } catch (error) {
            console.error('Error updating ticket status:', error.message);
            throw new HttpException('Failed to update ticket status', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        try {
            return await this.ticketsService.delete(id);
        } catch (error) {
            console.error('Error deleting ticket:', error.message);
            throw new HttpException('Failed to delete ticket', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
