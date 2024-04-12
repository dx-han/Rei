import React, { useEffect, useRef } from "react";

export default function SheetHook() {
  useEffect(() => {
    // 确保在客户端加载Luckysheet
    const initializeLuckySheet = () => {
      // 动态加载LuckySheet的JS
      const luckyScript = document.createElement("script");
      luckyScript.src =
        "https://cdn.jsdelivr.net/npm/luckysheet/dist/luckysheet.umd.js"; // 调整为你的实际路径
      document.body.appendChild(luckyScript);
      const luckyPluginScript = document.createElement("script");
      luckyPluginScript.src =
        "https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/js/plugin.js"; // 调整为你的实际路径
      document.body.appendChild(luckyPluginScript);

      luckyScript.onload = () => {
        // 初始化LuckySheet
        window.luckysheet.create({
          container: "luckysheet", // 页面上元素的ID
        });
      };
    };

    initializeLuckySheet();
  }, []);
  return (
    <div>
      <div
        id="luckysheet"
        style={{
          margin: "0px",
          padding: "0px",
          position: "absolute",
          width: "100%",
          height: "100%",
          left: "0px",
          top: "0px",
        }}
      ></div>
    </div>
  );
}
