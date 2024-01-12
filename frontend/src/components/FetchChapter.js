import { useGetSingleChapterQuery } from "../features/chapterSlice";

const FetchChapter = (chapterId) => {
  let chap;
  const { data, isLoading, isError, error, isSuccess } =
    useGetSingleChapterQuery(chapterId);
  if (isLoading) chap = "loading ..";
  if (isError) chap = error;
  if (isSuccess) {
    chap = Object.values(data.entities)[0];
    console.log(chap);
  }
  return chap;
};

export default FetchChapter;
