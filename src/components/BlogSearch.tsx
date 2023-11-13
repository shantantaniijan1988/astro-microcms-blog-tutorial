import useSWR from "swr";
import { useState } from "preact/hooks";
import { getBlogs } from "../library/microcms";

const LIMIT = 10;

const BlogSearch = () => {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");

  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useSWR(
    q === null ? null : ["/search", q],
    ([, q]) =>
      getBlogs({
        fields: ["id", "title"],
        q,
        limit: LIMIT,
        offset: (page - 1) * LIMIT,
      })
  );

  if (error) return <div>エラーが発生しました</div>;

  if (isLoading) return <div>読み込み中...</div>;

  return (
    <div className="blog-search">
      {data?.contents.length !== 0 ? (
        <div>
          <ul>
            {data?.contents.map(({ id, title }) => (
              <li key={id}>
                <a href={id}>{title}</a>
              </li>
            ))}
          </ul>
          {data?.totalCount !== undefined && (
            <nav className="pagination">
              <ul>
                {Array.from({
                  length: Math.ceil(data.totalCount / LIMIT),
                }).map((_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => setPage(i + 1)}
                      disabled={page === i + 1}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      ) : (
        <div>検索結果はありません</div>
      )}
    </div>
  );
};

export default BlogSearch;
