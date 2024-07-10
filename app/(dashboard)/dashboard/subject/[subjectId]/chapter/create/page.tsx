import ChapterCreateForm from '../../../_components/chapter/chapter-create-form';

interface CreateChapterPageProps {
  params: { subjectId: string };
}

const CreateChapterPage = ({ params }: CreateChapterPageProps) => {
  return <ChapterCreateForm subjectId={params.subjectId} />;
};
export default CreateChapterPage;
