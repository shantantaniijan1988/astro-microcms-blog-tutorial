import useSWR from "swr";
import { getBlogDetail } from "../library/microcms";

const BlogPreview = () => {
  const params = new URLSearchParams(window.location.search);
  const contentId = params.get("contentId");
  const draftKey = params.get("draftKey");

  const { data, error, isLoading, isValidating } = useSWR(
    contentId === null || draftKey === null
      ? null
      : ["/preview", contentId, draftKey],
    ([, contentId, draftKey]) => getBlogDetail(contentId, { draftKey })
  );

  if (error) return <div>エラーが発生しました</div>;

  if (isLoading) return <div>読み込み中...</div>;

  return (
    <div>
      <h1 class="title">{data?.title}</h1>
      <p class="publishedAt">{data?.publishedAt ?? data?.createdAt}</p>
      <div
        class="post"
        dangerouslySetInnerHTML={{ __html: data?.content ?? "" }}
      />

      {isValidating && <div>更新中...</div>}
    </div>
  );
};

export default BlogPreview;
