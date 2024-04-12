"use client";

import React, { useState } from "react";
import MarkmapHook from "./markmap-hook";

export default function Markmap() {
  return (
    <div className="flex flex-col h-screen p-2">
      <MarkmapHook />
    </div>
  );
}
