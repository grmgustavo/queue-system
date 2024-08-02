import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Patient } from './patient.entity';
import { QueueService } from 'src/queue/queue.service';

@Controller('patients')
export class PatientsController {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly queueService: QueueService,
  ) {}

  @Get()
  findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Patient> {
    return this.patientsService.findOne(id);
  }

  @Post()
  async create(@Body() patient: Patient): Promise<Patient> {
    const newPatient = await this.patientsService.create(patient);
    await this.queueService.enqueuePatient(newPatient);
    return newPatient;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() patient: Patient): Promise<Patient> {
    return this.patientsService.update(id, patient);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.patientsService.remove(id);
  }

  @Post('enqueue')
  async enqueue(@Body() patient: Patient): Promise<Patient> {
    const newPatient = await this.patientsService.create(patient);
    await this.queueService.enqueuePatient(newPatient);
    return newPatient;
  }
}
