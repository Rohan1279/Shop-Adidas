import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

function DelayedFadeInComponent({ children }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const nodes = document.querySelectorAll(
      "body, section, article, header, footer, aside, nav, main, div, h2, p"
    );
    let loadedCount = 0;
    nodes.forEach((node) => {
      if (node.complete) {
        loadedCount++;
      } else {
        node.addEventListener("load", () => {
          loadedCount++;
          if (loadedCount === nodes.length) {
            setLoaded(true);
          }
        });
      }
    });

    if (loadedCount === nodes.length) {
      setLoaded(true);
    }
  }, []);

  return (
    <Transition
      show={loaded}
      enter="transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      {children}
    </Transition>
  );
}

export default DelayedFadeInComponent;
