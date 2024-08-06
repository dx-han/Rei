import React, { useEffect, useRef, useState } from "react";
import { Config, TopLevelSpec, compile } from "vega-lite";
import vegaEmbed from "vega-embed";
import { parse } from "jsonc-parser";

const vegaLiteSpec: TopLevelSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: {
    values: [
      { a: "A", b: 28 },
      { a: "B", b: 55 },
      { a: "C", b: 43 },
      { a: "D", b: 91 },
      { a: "E", b: 81 },
      { a: "F", b: 53 },
      { a: "G", b: 19 },
      { a: "H", b: 87 },
      { a: "I", b: 52 },
    ],
  },
  mark: "bar",
  encoding: {
    x: { field: "a", type: "nominal", axis: { labelAngle: 0 } },
    y: { field: "b", type: "quantitative" },
  },
};

const config: Config = {
  bar: {
    color: "firebrick",
  },
};

const vegaSpec = compile(vegaLiteSpec, { config }).spec;

export default function ChartHook() {
  const [value, setValue] = useState("");
  const vegaChart = useRef(null);
  useEffect(() => {
    if (vegaChart.current) {
      vegaEmbed(vegaChart.current, vegaSpec);
    }
  }, []);

  // 处理textarea的改变事件，更新Markdown文本
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    console.log(event.target.value);
    const obj = parse(event.target.value);
    if (vegaChart.current) {
      vegaEmbed(vegaChart.current, compile(obj, { config }).spec);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <textarea
        style={{ width: "50%", padding: "20px" }}
        value={value}
        onChange={handleChange}
        placeholder="在这里输入Markdown文本"
      />
      <div
        style={{ width: "50%", padding: "20px", overflowY: "scroll" }}
        ref={vegaChart}
      ></div>
    </div>
  );
}
