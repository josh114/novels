import { useGetNovelsQuery } from '../features/getNovelSlice';

const FetchNovel = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetNovelsQuery();
  let load;
  let errorMsg;
  let novel;
  if (isLoading) load = 'Loading...';
  if (isSuccess)
    novel = Object.values(data.entities).sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt)
    );
  if (isError) errorMsg = error.message;
  return { novel, errorMsg, load };
};

export default FetchNovel;
