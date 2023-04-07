import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { FaAngleDown, FaArrowDown, FaCheckCircle } from "react-icons/fa";
import { HiCheck } from "react-icons/hi";

const DropDownMenu = ({ array, selected, setSelected, error, multiple }) => {
  // const [selected, setSelected] = useState(array[1]);
  // multiple && console.log(selected);
  // if (multiple && error) {
  //   setSelected([]);
  // }


  return (
    <Listbox
      value={selected}
      onChange={setSelected}
      as={Fragment}
      disabled={error}
      multiple={multiple}
    >
      <div className="relative">
        <Listbox.Button
          className={({ open }) =>
            `relative w-full cursor-default h-11 rounded-r-md bg-secondary-color py-3 pl-3 pr-10 text-left  p-2  text-sm ${
              !error && "active:shadow-nm-inset"
            } ${open && "shadow-nm-inset"}`
          }
        >
          <span
            className={`text-sm text-gray-500 disabled:text-gray-300 ${
              error && "text-gray-300"
            }`}
          >
            {multiple && selected?.length !== 0 ? (
              selected
                ?.sort((a, b) => {
                  // sort id wise
                  return parseInt(a.id) - parseInt(b.id);
                })
                .map((item) => item.name)
                .join(", ")
            ) : multiple && selected?.length === 0 ? (
              <span
                className={`text-sm text-gray-500 disabled:text-gray-300 ${
                  error && "text-gray-300"
                }`}
              >
                Choose an option
              </span>
            ) : selected?.name ? (
              <span className="flex justify-start items-center gap-x-2">
                {selected?.hex && (
                  <span
                    style={{ backgroundColor: `${selected?.hex}` }}
                    className={`w-4 h-4 rounded-sm`}
                  ></span>
                )}
                <span
                  className={`block truncate  ${
                    selected ? "font-medium " : "font-normal"
                  }`}
                >
                  {selected.name}
                </span>
              </span>
            ) : (
              "Choose and option"
            )}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <FaAngleDown
              className={`h-5 w-5 text-gray-400 ${error && " text-zinc-300"}`}
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition transform ease-in ease-out duration-100"
          enterFrom="opacity-0 -translate-y-3"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className=" absolute max-h-60 w-full overflow-auto rounded-b-md bg-secondary-color shadow-nm py-1  focus:outline-none sm:text-sm z-50 mt-1 px-1">
            {array.map((item, itemIdx) => (
              <Listbox.Option
                // disabled={error}

                key={itemIdx}
                className={({ active, selected }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 my-1  ${
                    active
                      ? "text-gray-900 shadow-nm-inset rounded-md"
                      : "text-gray-500"
                  } 
                  ${selected && "shadow-nm-inset rounded-md text-gray-900"} `
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <HiCheck
                          className="h-5 w-5 text-black"
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                    <span className="flex justify-start items-center gap-x-2">
                      {item?.hex && (
                        <span
                          style={{ backgroundColor: `${item?.hex}` }}
                          className={`w-4 h-4 rounded-sm`}
                        ></span>
                      )}
                      <span
                        className={`block truncate  ${
                          selected ? "font-medium " : "font-normal"
                        }`}
                      >
                        {item.name}
                      </span>
                    </span>
                  </>
                )}
                {/* {({ active, selected }) => (
                  <li
                    className={`${
                      active ? "bg-blue-500 text-white" : "bg-white text-black"
                    }`}
                  >
                    {selected && (
                      <HiCheck
                        className="h-5 w-5 text-black"
                        aria-hidden="true"
                      />
                    )}
                    {item.name}
                  </li>
                )} */}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default DropDownMenu;
