import { useGetSingleChapterQuery } from "../features/chapterSlice";


class ChapterService {
    async fetchChapter(chapterId) {
        const {data, isLoading, isSuccess, isError, error} = useGetSingleChapterQuery(chapterId);
        if (data) console.log(data);
        return {
            data,
            isLoading,
            isSuccess,
            isError,
            error
        }
    }
}
export default new ChapterService()