import React, { useEffect, useRef, useState } from "react";
import { draw } from "nomnoml";

const initial_uml = `
#.mw: visual=transceiver fill=#8f8 dashed
// [<transceiver> Middleware]
#direction:right

[ User Interaction2 | [<actor> User]]->[<sender> Dispatch2 | [<state> Action]]
[<sender> Dispatch2 
  | [<state> Action]]->[<mw> Middleware #1 
    | [<transceiver> Logger]]
[<transceiver> Middleware #1 | 
  [<transceiver> Logger2]]->[<mw> Middleware #2 
  | [<transceiver> Analytics]]
[<transceiver> Middleware #2 | [<transceiver> Analytics2]]->[<receiver> Store2 | [<receiver> Reducer]->[State]]
`;

export default function UmlHook() {
  const canvas = useRef(null);
  const [uml, setUml] = useState("");
  useEffect(() => {
    setUml(initial_uml);
    if (canvas.current) {
      draw(canvas.current, initial_uml);
    }
  }, []);

  // 处理textarea的改变事件，更新Markdown文本
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDiagram = event.target.value;
    setUml(newDiagram);
    if (canvas.current) {
      try {
        draw(canvas.current, newDiagram);
      } catch (err) {
        console.log("nomnoml");
        console.log(err);
      }
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <textarea
        style={{ width: "50%", padding: "20px" }}
        value={uml}
        onChange={handleChange}
        placeholder="在这里输入Markdown文本"
      />
      <div style={{ width: "50%", padding: "20px", overflowY: "scroll" }}>
        <canvas ref={canvas}></canvas>
      </div>
    </div>
  );
}
