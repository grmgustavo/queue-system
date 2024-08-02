import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clinic } from './clinic.entity';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(Clinic)
    private clinicsRepository: Repository<Clinic>,
  ) {}

  findAll(): Promise<Clinic[]> {
    return this.clinicsRepository.find();
  }

  findOne(id: number): Promise<Clinic> {
    return this.clinicsRepository.findOne({ where: { id } });
  }

  async create(clinic: Clinic): Promise<Clinic> {
    return this.clinicsRepository.save(clinic);
  }

  async update(id: number, clinic: Clinic): Promise<void> {
    await this.clinicsRepository.update(id, clinic);
  }

  async remove(id: number): Promise<void> {
    await this.clinicsRepository.delete(id);
  }
}
