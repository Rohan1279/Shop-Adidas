import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { FaAngleDown, FaArrowDown, FaCheckCircle } from "react-icons/fa";
import { HiCheck } from "react-icons/hi";

const DropDownMenu = ({
  array,
  selectedData,
  setSelectedData,
  error,
  setError,
  multiple,
  formControl,
}) => {
  // console.log("selectedData", selectedData);
  // console.log("array", array);
  return (
    <Listbox
      value={selectedData}
      onChange={setSelectedData}
      as={Fragment}
      disabled={error}
      multiple={multiple}
      by="id" // to show default selected options for multiple selection
    >
      <div className="relative">
        <Listbox.Button
          className={({ open }) =>
            `relative min-h-min w-full cursor-default rounded-r-md bg-secondary-color py-3 pl-2  text-left text-sm   focus:ring-0  ${
              !error && "active:shadow-nm-inset"
            } ${open && "shadow-nm-inset"} `
          }
        >
          <span
            className={`text-sm text-gray-500 disabled:text-gray-300 ${
              error && "text-gray-300 "
            }`}
          >
            {multiple && selectedData?.length !== 0 ? (
              selectedData
                ?.sort((a, b) => {
                  // sort id wise
                  return parseInt(a.id) - parseInt(b.id);
                })
                .map((item, idx) => (
                  // <span className="bg-red-300 mx-1">{item.name}</span>
                  <span
                    key={item.id}
                    className="m-1 inline-flex items-center gap-1.5 rounded-md  border border-gray-400 bg-gray-300/60 py-1.5 pl-3 pr-2 text-xs font-medium text-gray-500 transition-all hover:bg-gray-200/50"
                  >
                    <span>{item.name}</span>
                    {/* //! CROSS_BUTTON */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        const newSelected = selectedData.filter(
                          (obj) => obj.id !== item.id
                        );
                        setSelectedData(newSelected);
                      }}
                      type="button"
                      className="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-gray-400 hover:text-gray-900  active:shadow-nm-inset"
                    >
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </div>
                  </span>
                ))
            ) : multiple && selectedData?.length === 0 ? (
              <span
                className={`text-sm text-gray-500 disabled:text-gray-300 ${
                  error && "text-gray-300"
                }`}
              >
                Choose an option
              </span>
            ) : selectedData?.name ? (
              <span className="flex items-center justify-start gap-x-2">
                {selectedData?.hex && (
                  <span
                    style={{ backgroundColor: `${selectedData?.hex}` }}
                    className={`h-4 w-4 rounded-sm`}
                  ></span>
                )}
                <span
                  className={`block truncate  ${
                    selectedData ? "font-medium " : "font-normal"
                  }`}
                >
                  {selectedData.name}
                </span>
              </span>
            ) : (
              "Choose an option"
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
          <Listbox.Options className=" absolute z-50 mt-1 max-h-60 w-full   overflow-auto rounded-b-md bg-secondary-color  py-1 px-1 shadow-nm focus:outline-none sm:text-sm">
            {array?.map((item, idx) => (
              <Listbox.Option
                key={item.id}
                className={({ active, selected }) =>
                  `relative my-1 cursor-default select-none py-2 pl-10 pr-4 focus:outline-none  ${
                    active
                      ? "rounded-md text-gray-900 shadow-nm-inset"
                      : "text-gray-500"
                  } 
                  ${selected && "rounded-md text-gray-900 shadow-nm-inset"} `
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
                    <span className="flex items-center justify-start gap-x-2">
                      {item?.hex && (
                        <span
                          style={{ backgroundColor: `${item?.hex}` }}
                          className={`mr-2 h-4 w-4 rounded-sm`}
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
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default DropDownMenu;
