export type TheoryFlashCardContent = {
  id: string;
  question: string;
  answer: string;
  theoryId: string;
  status: string;
  createAt: Date;
  updateAt: Date;
};

export type FlashcardContent = {
  id: string;
  frontHTML: string | JSX.Element;
  backHTML: string | JSX.Element;
};
