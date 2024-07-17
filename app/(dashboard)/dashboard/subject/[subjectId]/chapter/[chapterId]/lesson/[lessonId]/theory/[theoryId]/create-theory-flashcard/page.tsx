import { CreateFlashcardContentForm } from '../../../_components/theory-flashcard/create-theory-flashcard';

interface CreateFlashcardPageProps {
  params: {
    subjectId: string;
    chapterId: string;
    lessonId: string;
    theoryId: string;
  };
}

const CreateFlashcardPage = ({ params }: CreateFlashcardPageProps) => {
  return (
    <div className="flex min-h-[calc(100vh-64px)]  w-full flex-col gap-y-10 p-8">
      <CreateFlashcardContentForm theoryId={params.theoryId} />
      {/* subject : {params.subjectId}, chapter : {params.chapterId}, lesson :{' '}
      {params.lessonId}, theoryId : {params.theoryId} */}
    </div>
  );
};

export default CreateFlashcardPage;
