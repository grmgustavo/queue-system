import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { Clinic } from './clinic.entity';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Get()
  findAll(): Promise<Clinic[]> {
    return this.clinicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Clinic> {
    return this.clinicsService.findOne(id);
  }

  @Post()
  create(@Body() clinic: Clinic): Promise<Clinic> {
    return this.clinicsService.create(clinic);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() clinic: Clinic): Promise<void> {
    return this.clinicsService.update(id, clinic);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.clinicsService.remove(id);
  }
}
