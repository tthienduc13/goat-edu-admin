import { CreateQuizForm } from '../../../_components/quiz/quiz-create-form';

interface CreateQuizPageProps {
  params: {
    subjectId: string;
    chapterId: string;
    lessonId: string;
    quizId: string;
  };
}

const CreateQuizPage = ({ params }: CreateQuizPageProps) => {
  return <CreateQuizForm params={params} />;
};
export default CreateQuizPage;
