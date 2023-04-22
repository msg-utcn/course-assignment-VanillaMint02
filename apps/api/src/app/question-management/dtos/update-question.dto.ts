import {ApiProperty} from "@nestjs/swagger";

export class UpdateQuestionDto {

  @ApiProperty({
    description : 'the title of your question',
    example : 'InaccessibleObjectException',
    required:true,

  })

  title: string;
  @ApiProperty({
    description : 'the content of your question',
    example :'why does InaccessibleObjectException happen when I try to run my code?',
    required:true,
  })
  content: string;
}
