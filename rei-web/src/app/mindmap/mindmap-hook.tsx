import React, { useState, useRef, useEffect } from "react";
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view";
import { Toolbar } from "markmap-toolbar";
import "markmap-toolbar/dist/style.css";

const transformer = new Transformer();
const initValue = `# markmap

## Links

- [Website](https://markmap.js.org/)
- [GitHub](https://github.com/gera2ld/markmap)

## Related Projects

- [coc-markmap](https://github.com/gera2ld/coc-markmap) for Neovim
- [markmap-vscode](https://marketplace.visualstudio.com/items?itemName=gera2ld.markmap-vscode) for VSCode
- [eaf-markmap](https://github.com/emacs-eaf/eaf-markmap) for Emacs

## Features

Note that if blocks and lists appear at the same level, the lists will be ignored.

### Lists

- **strong** ~~del~~ *italic* ==highlight==
- \`inline code\`
- [x] checkbox
- Katex: $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$ <!-- markmap: fold -->
  - [More Katex Examples](#?d=gist:af76a4c245b302206b16aec503dbe07b:katex.md)
- Now we can wrap very very very very long text based on \`maxWidth\` option

### Blocks

\`\`\`js
console('hello, JavaScript')
\`\`\`

| Products | Price |
|-|-|
| Apple | 4 |
| Banana | 2 |
`;

function renderToolbar(mm: Markmap, wrapper: HTMLElement) {
  while (wrapper?.firstChild) wrapper.firstChild.remove();
  if (mm && wrapper) {
    const toolbar = new Toolbar();
    toolbar.attach(mm);
    // Register custom buttons
    toolbar.register({
      id: "alert",
      title: "Click to show an alert",
      content: "Alert",
      onClick: () => alert("You made it!"),
    });
    toolbar.setItems([...Toolbar.defaultItems, "alert"]);
    wrapper.append(toolbar.render());
  }
}

export default function MindmapHook() {
  const [value, setValue] = useState(initValue);
  // Ref for SVG element
  const refSvg = useRef<SVGSVGElement>(null);
  // Ref for markmap object
  const refMm = useRef<Markmap>();
  // Ref for toolbar wrapper
  const refToolbar = useRef<HTMLDivElement>(null);
  // SVG是最终要画的图片，maindmap最终画在这个图片上面
  // transformer.transform将我写的markdown转成包可以读懂的结构，再由refMm转换成svg，svg放在SVG object上面，搞定

  useEffect(() => {
    const { root } = transformer.transform(value);
    if (refSvg.current) {
      if (!refMm.current) {
        refMm.current = Markmap.create(refSvg.current);
      }
      refMm.current.setData(root);
      refMm.current.fit();
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <textarea
        // className="w-full h-full border border-gray-400"
        value={value}
        onChange={handleChange}
        style={{ width: "50%", padding: "20px" }}
      />
      <svg
        // className="flex-1"
        ref={refSvg}
        style={{ width: "50%", padding: "20px", overflowY: "scroll" }}
      />
      {/* <div className="absolute bottom-1 right-1" ref={refToolbar}></div> */}
    </div>
  );
}
