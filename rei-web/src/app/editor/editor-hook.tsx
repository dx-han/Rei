import React, { useState, useEffect, useRef } from "react";
import Markdown from "react-markdown";

export default function EditorHook() {
  const localstorageId = "markdown";
  const [markdown, setMarkdown] = useState("");

  // 使用useEffect在组件加载时设置Markdown文本
  useEffect(() => {
    const savedMarkdown = localStorage.getItem(localstorageId);
    if (savedMarkdown) {
      setMarkdown(savedMarkdown);
    }
  }, []);

  // 处理textarea的改变事件，更新Markdown文本
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMarkdown = event.target.value;
    setMarkdown(newMarkdown);
    localStorage.setItem("markdown", newMarkdown);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <textarea
        style={{ width: "50%", padding: "20px" }}
        value={markdown}
        onChange={handleChange}
        placeholder="在这里输入Markdown文本"
      />
      <div style={{ width: "50%", padding: "20px", overflowY: "scroll" }}>
        {/* 使用ReactMarkdown组件渲染Markdown文本 */}
        <Markdown>{markdown}</Markdown>
      </div>
    </div>
  );
}
