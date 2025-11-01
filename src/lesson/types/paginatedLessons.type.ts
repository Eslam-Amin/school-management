import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationInfoType } from 'src/types/paginationInfo.type';
import { LessonType } from './lesson.type';

@ObjectType()
export class PaginatedLessonsType {
  @Field(() => [LessonType])
  lessons: LessonType[];

  @Field(() => PaginationInfoType)
  pagination: PaginationInfoType;
}
