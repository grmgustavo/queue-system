import { Controller, Post, Get, Param } from '@nestjs/common';
import { QueueService } from './queue.service';
import { PatientsService } from '../patients/patients.service';
import { Patient } from '../patients/patient.entity';

@Controller('queue')
export class QueueController {
  constructor(
    private readonly queueService: QueueService,
    private readonly patientsService: PatientsService,
  ) {}

  @Post('enqueue/:id')
  async enqueue(@Param('id') id: number): Promise<Patient> {
    console.log('Enqueueing patient with id:', id);
    const patient = await this.patientsService.findOne(id);
    await this.queueService.enqueuePatient(patient);
    return patient;
  }

  @Get('status')
  async getQueueStatus() {
    return this.queueService.getQueueStatus();
  }
}
