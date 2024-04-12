"use client";

import React, { useEffect, useState } from "react";
import init, { fibonacci_wasm } from "rei-lib";

function fib_js(n: number): number {
  if (n <= 2) {
    return 1;
  }
  return fib_js(n - 2) + fib_js(n - 1);
}

export default function Test() {
  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");

  useEffect(() => {
    init().then(() => {
      setAns1("");
      setAns2("");
    });
  });

  let js_test = (n: number) => {
    let begin = new Date().getTime();
    let result = fib_js(n);
    let end = new Date().getTime();
    console.log(`fib js(${n}) = ${result}, running time = ${end - begin} ms`);
    setAns1(`fib js(${n}) = ${result}, running time = ${end - begin} ms`);
  };

  let wasm_test = (n: number) => {
    let begin = new Date().getTime();
    let result = fibonacci_wasm(n);
    let end = new Date().getTime();
    console.log(`fib wasm(${n}) = ${result}, running time = ${end - begin} ms`);
    setAns2(`fib wasm(${n}) = ${result}, running time = ${end - begin} ms`);
  };

  return (
    <>
      <div>hello</div>
      <div>world</div>
      <button onClick={() => js_test(43)}>JS</button>
      <p>{ans1}</p>
      <button onClick={() => wasm_test(43)}>WASM</button>
      <p>{ans2}</p>
    </>
  );
}
