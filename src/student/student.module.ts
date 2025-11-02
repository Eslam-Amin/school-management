import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { LessonResolver } from 'src/lesson/lesson.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentService, LessonResolver],
})
export class StudentModule {}
