"use client";

import React, { useState } from "react";
import MindmapHook from "./mindmap-hook";

export default function Markmap() {
  return (
    <div className="flex flex-col h-screen p-2">
      <MindmapHook />
    </div>
  );
}
