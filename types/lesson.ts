export type Lesson = {
  id: string;
  lessonName: string;
  lessonBody: string;
  lessonMaterial: string;
  chapterId: string;
  createdAt: Date;
  displayOrder: number;
  theoryCount: number;
  quizCount: number;
};

export type LessonByChapter = {
  chapterid: string;
  lessonList: Lesson[];
  lessonCount: number;
};
