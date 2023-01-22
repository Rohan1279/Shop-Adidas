import React from "react";
import { PhotoView } from "react-photo-view";
const elementSize = 400;
const MyComponent = () => {
  return (
    <PhotoView
      width={elementSize}
      height={elementSize}
      render={({ scale, attrs }) => {
        const width = attrs.style.width;
        const offset = (width - elementSize) / elementSize;
        const childScale = scale === 1 ? scale + offset : 1 + offset;

        return (
          <div {...attrs}>
            <div
              style={{
                transform: `scale(${childScale})`,
                width: elementSize,
                transformOrigin: "0 0",
              }}
            >
              <div>Hello world</div>
              <button>button</button>
              <input onMouseDown={(e) => e.stopPropagation()} />
            </div>
          </div>
        );
      }}
    >
      <button primary>Click</button>
    </PhotoView>
  );
};

export default MyComponent;
