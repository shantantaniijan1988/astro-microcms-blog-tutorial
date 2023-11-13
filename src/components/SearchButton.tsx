import { useState } from "preact/hooks";
import type { JSXInternal } from "preact/src/jsx";

const SearchButton = () => {
  const [value, setValue] = useState(
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("q") ?? ""
      : ""
  );

  const handleChange: JSXInternal.GenericEventHandler<HTMLInputElement> = (
    event: any
  ) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleSubmit: JSXInternal.GenericEventHandler<HTMLFormElement> = (
    event: any
  ) => {
    event.preventDefault();
    window.location.href = `/search?q=${value}`;
  };

  return (
    <form className="post-search" role="search" onSubmit={handleSubmit}>
      <label for="blog_search">記事を検索:</label>
      <input
        id="blog_search"
        type="search"
        value={value}
        onChange={handleChange}
      />
      <button type="submit">検索</button>
    </form>
  );
};

export default SearchButton;
