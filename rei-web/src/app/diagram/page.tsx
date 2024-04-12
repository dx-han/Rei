"use client";

import React, { useEffect, useRef } from "react";
// import DiagramHook from "./diagram-hook";
import dynamic from "next/dynamic";

const DynamicDiagramHook = dynamic(() => import("./diagram-hook"), {
  ssr: false,
});

export default function Uml() {
  return (
    <React.Fragment>
      {/* <DiagramHook /> */}
      <DynamicDiagramHook />
    </React.Fragment>
  );
}
