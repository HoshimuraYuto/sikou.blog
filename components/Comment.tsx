import { useRouter } from "next/router";
import { useState } from "react";

type CommentProps = {
  created_at: string;
  name: string;
  text: string;
};

const Comment = () => {
  const router = useRouter();
  const currentUrl = router.asPath.split("#")[0];

  const [name, setName] = useState("Anonymous");
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    const response = await fetch(
      `/api/getComment?` + `name=${name}&text=${text}&url=${currentUrl}`,
      {
        method: "GET",
      }
    );
    const res = await response.json();
    setComments(res);
  };

  return (
    <div className="mt-10">
      <button
        className="nx-block nx-px-3 nx-py-2 nx-bg-black/[.05] dark:nx-bg-gray-50/10"
        onClick={() => {
          getComments();
        }}
      >
        コメント取得
      </button>
      <br />
      {comments.map((comment: CommentProps, index) => (
        <div className="border-b border-gray-300 border-solid dark:border-gray-600">
          <div>{index + 1}</div>
          <div>{comment.name}</div>
          <div>{comment.text}</div>
        </div>
      ))}
      <div className="mt-10">
        <div>
          <label htmlFor="name">名前</label>
          <input
            id="name"
            type="text"
            className="nx-block nx-px-3 nx-py-2 nx-bg-black/[.05] dark:nx-bg-gray-50/10"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <br />
        <div>
          <label htmlFor="comment">コメント</label>
          <textarea
            id="comment"
            className="nx-block nx-px-3 nx-py-2 nx-bg-black/[.05] dark:nx-bg-gray-50/10"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
      </div>
      <br />
      <button
        className="nx-block nx-px-3 nx-py-2 nx-bg-black/[.05] dark:nx-bg-gray-50/10"
        onClick={async () => {
          if (name != "" && text != "") {
            await fetch("/api/addComment", {
              method: "POST",
              body: JSON.stringify({ name: name, text: text, url: currentUrl }),
            });
            await getComments();
          }
        }}
      >
        コメント送信
      </button>
    </div>
  );
};

export default Comment;
