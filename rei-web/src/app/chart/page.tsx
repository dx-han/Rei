"use client";

import React, { useState } from "react";
import ChartHook from "./chart-hook";

export default function Markmap() {
  return (
    <div className="flex flex-col h-screen p-2">
      <ChartHook />
    </div>
  );
}
