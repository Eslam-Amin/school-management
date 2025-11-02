import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './inputs/lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });
    return this.lessonRepository.save(lesson);
  }

  async findAllLessonsPaginated(
    page: number,
    limit: number,
  ): Promise<{ lessons: Lesson[]; totalItems: number }> {
    const [lessons, totalItems] = await Promise.all([
      this.lessonRepository.find({
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.lessonRepository.count(),
    ]);
    return { lessons, totalItems };
  }

  async findAllLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async findOne(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOneBy({ id });
    if (!lesson) throw new NotFoundException('Lesson not found');
    return lesson;
  }
}
