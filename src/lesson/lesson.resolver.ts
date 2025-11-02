import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonType } from './types/lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './inputs/lesson.input';
import { PaginationInput } from 'src/inputs/pagination.input';
import { PaginatedLessonsType } from './types/paginatedLessons.type';
import { PaginationInfoType } from 'src/types/paginationInfo.type';
import { AssignStudentsToLessonInput } from './inputs/assignStudentsToLesson.input';
import { Lesson } from './lesson.entity';
import { StudentService } from 'src/student/student.service';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Mutation((returns) => LessonType)
  createLesson(@Args('body') body: CreateLessonInput) {
    const lesson = this.lessonService.createLesson(body);
    return lesson;
  }

  @Query((returns) => [LessonType])
  lessons() {
    return this.lessonService.findAllLessons();
  }

  @Query(() => PaginationInfoType)
  async pagination(@Args() { page = 1, limit = 10 }: PaginationInput) {
    const { totalItems } = await this.lessonService.findAllLessonsPaginated(
      page,
      limit,
    );
    return {
      currentPage: page,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      itemsPerPage: limit,
    };
  }

  @Query((returns) => PaginatedLessonsType)
  async lessonsPaginated(@Args() { page = 1, limit = 10 }: PaginationInput) {
    const { lessons, totalItems } =
      await this.lessonService.findAllLessonsPaginated(page, limit);
    return {
      lessons,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    };
  }

  @Query((returns) => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.findOne(id);
  }

  @Mutation((returns) => LessonType)
  assignStudentToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    return this.lessonService.assignStudentToLesson(lessonId, studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.findMany(lesson.students);
  }
}
