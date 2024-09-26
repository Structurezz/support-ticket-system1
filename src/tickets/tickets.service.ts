import { Injectable, NotFoundException } from '@nestjs/common';
import { Ticket, TicketDocument } from './ticket.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
    constructor(@InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>) {}

    async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
        const ticket = new this.ticketModel(createTicketDto);
        return ticket.save(); // This works because 'ticket' is of type TicketDocument
    }

    async findAll(): Promise<Ticket[]> {
        return this.ticketModel.find().exec();
    }

    async findById(id: string): Promise<TicketDocument> { // Return type changed to TicketDocument
        const ticket = await this.ticketModel.findById(id);
        if (!ticket) {
            throw new NotFoundException('Ticket not found');
        }
        return ticket; // 'ticket' is of type TicketDocument
    }

    async update(id: string, updateTicketDto: UpdateTicketDto): Promise<TicketDocument> { // Return type changed
        const ticket = await this.findById(id);
        Object.assign(ticket, updateTicketDto);
        return ticket.save(); // This works because 'ticket' is of type TicketDocument
    }

    async updateStatus(id: string, status: string): Promise<TicketDocument> { // Return type changed
        const ticket = await this.findById(id);
        ticket.status = status;
        return ticket.save(); // This works because 'ticket' is of type TicketDocument
    }

    async delete(id: string): Promise<void> {
        const result = await this.ticketModel.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            throw new NotFoundException('Ticket not found');
        }
    }
}
