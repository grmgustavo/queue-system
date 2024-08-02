import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}

  findAll(): Promise<Patient[]> {
    return this.patientsRepository.find();
  }

  findOne(id: number): Promise<Patient> {
    return this.patientsRepository.findOne({ where: { id: id } });
  }

  async create(patient: Patient): Promise<Patient> {
    return this.patientsRepository.save(patient);
  }

  async update(id: number, patient: Patient): Promise<Patient> {
    await this.patientsRepository.update(id, patient);
    return this.patientsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.patientsRepository.delete(id);
  }
}
