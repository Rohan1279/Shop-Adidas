import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { FaAngleDown, FaArrowDown, FaCheckCircle } from "react-icons/fa";
import { HiCheck } from "react-icons/hi";

const DropDownMenu = ({ array, selected, setSelected }) => {
  // const [selected, setSelected] = useState(array[1]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        {/* <Listbox.Label>Category:</Listbox.Label> */}
        <Listbox.Button className="relative w-full cursor-default rounded-md active:shadow-nm-inset bg-secondary-color border border-zinc-300 py-3 pl-3 pr-10 text-left  p-2  text-sm">
          <span className="block truncate">{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <FaAngleDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className=" max-h-60 w-full overflow-auto rounded-md bg-white py-1  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {array.map((item, itemIdx) => (
              <Listbox.Option
                key={itemIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {item.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <HiCheck
                          className="h-5 w-5 text-black"
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default DropDownMenu;
