import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

const initial_diagram = `
flowchart LR
    Start --> Stop
`;

export default function DiagramHook() {
  const [diagram, setDiagram] = useState("");

  useEffect(() => {
    setDiagram(initial_diagram);
    mermaid.initialize({
      startOnLoad: true,
      securityLevel: "loose",
    });
    mermaid.contentLoaded();
    console.log(233);
  }, []);

  useEffect(() => {
    const element = document.getElementById("mermaid-main");
    if (element) {
      element.removeAttribute("data-processed");
    }
    mermaid.contentLoaded();
  }, [diagram]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDiagram(event.target.value);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <textarea
        style={{ width: "50%", padding: "20px" }}
        value={diagram}
        onChange={handleChange}
        placeholder="在这里输入Markdown文本"
      />
      <div style={{ width: "50%", padding: "20px", overflowY: "scroll" }}>
        <pre className="mermaid" id="mermaid-main">
          {diagram}
        </pre>
      </div>
    </div>
  );
}
