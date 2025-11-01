import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PaginationInfoType {
  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  itemsPerPage: number;
}
