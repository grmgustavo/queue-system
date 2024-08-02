import { Module, forwardRef } from '@nestjs/common';
import { PatientsModule } from '../patients/patients.module';
import { ClinicsModule } from '../clinics/clinics.module';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';

@Module({
  imports: [forwardRef(() => PatientsModule), forwardRef(() => ClinicsModule)],
  providers: [QueueService],
  exports: [QueueService],
  controllers: [QueueController],
})
export class QueueModule {}
