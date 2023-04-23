import { useRouter } from "next/router";
import { useState } from "react";

const Comment = () => {
  const router = useRouter();
  const currentUrl = router.asPath;

  const [comments, setComments] = useState([]);

  const getComments = async () => {
    const response = await fetch(`/api/getComment?url=${currentUrl}`, {
      method: "GET",
    });
    const res = await response.json();
    setComments(res);
  };

  return (
    <div>
      <button
        onClick={() => {
          getComments();
        }}
      >
        コメント取得
      </button>
      {comments.map((comment: any) => (
        <div>{comment.text}</div>
      ))}
      <button
        onClick={(e) => {
          fetch("/api/addComment", {
            method: "POST",
            body: JSON.stringify({ text: "xxx", url: currentUrl }),
          });
        }}
      >
        コメント送信
      </button>
    </div>
  );
};

export default Comment;
