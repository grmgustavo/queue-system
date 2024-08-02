import { Injectable } from '@nestjs/common';
import { Clinic } from 'src/clinics/clinic.entity';
import { ClinicsService } from 'src/clinics/clinics.service';
import { Patient, Priority } from 'src/patients/patient.entity';
import { PatientsService } from 'src/patients/patients.service';

@Injectable()
export class QueueService {
  private highPriorityQueue: Patient[] = [];
  private mediumPriorityQueue: Patient[] = [];
  private lowPriorityQueue: Patient[] = [];

  constructor(
    private readonly patientsService: PatientsService,
    private readonly clinicsService: ClinicsService,
  ) {
    this.startWorkers();
  }

  async enqueuePatient(patient: Patient) {
    switch (patient.priority) {
      case Priority.HIGH:
        this.highPriorityQueue.push(patient);
        break;
      case Priority.MEDIUM:
        this.mediumPriorityQueue.push(patient);
        break;
      case Priority.LOW:
        this.lowPriorityQueue.push(patient);
        break;
    }
  }

  async getQueueStatus() {
    return {
      highPriorityQueue: this.highPriorityQueue,
      mediumPriorityQueue: this.mediumPriorityQueue,
      lowPriorityQueue: this.lowPriorityQueue,
    };
  }

  async startWorkers() {
    const clinics: Clinic[] = await this.clinicsService.findAll();

    clinics.forEach((clinic) => {
      setInterval(async () => {
        await this.processQueue(clinic);
      }, clinic.timePerPatient * 1000);
    });
  }

  async processQueue(clinic: Clinic) {
    let patient: Patient;

    if (this.highPriorityQueue.length > 0) {
      patient = this.highPriorityQueue.shift();
    } else if (this.mediumPriorityQueue.length > 0) {
      patient = this.mediumPriorityQueue.shift();
    } else if (this.lowPriorityQueue.length > 0) {
      patient = this.lowPriorityQueue.shift();
    }

    if (patient) {
      patient.attended = true;
      await this.patientsService.update(patient.id, patient);
      console.log(`Clinic ${clinic.id} attended patient ${patient.id}`);
    }
  }
}
