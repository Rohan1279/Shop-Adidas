import { Tab } from "@headlessui/react";
import React, { Fragment } from "react";

const MyProducts = () => {
  return (
    <div>
      <h3 className="text-3xl text-center">MyProducts</h3>
      <Tab.Group>
      <Tab.List>
        <Tab as={Fragment}>
          {({ selected }) => (
            /* Use the `selected` state to conditionally style the selected tab. */
            <button
              className={
                selected ? 'bg-blue-500 text-white' : 'bg-white text-black'
              }
            >
              Tab 1
            </button>
          )}
        </Tab>
        {/* ...  */}
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>Content 1</Tab.Panel>
        {/* ... */}
      </Tab.Panels>
    </Tab.Group>
    </div>
  );
};

export default MyProducts;
