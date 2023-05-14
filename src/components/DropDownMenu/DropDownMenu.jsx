import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { FaAngleDown, FaArrowDown, FaCheckCircle } from "react-icons/fa";
import { HiCheck } from "react-icons/hi";

const DropDownMenu = ({
  array,
  selected,
  setSelected,
  error,
  setError,
  multiple,
  formControl,
}) => {
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
            `relative w-full cursor-default min-h-min rounded-r-md bg-secondary-color py-3 pl-2  focus:ring-0 text-left   text-sm  ${
              !error && "active:shadow-nm-inset"
            } ${open && "shadow-nm-inset"} `
          }
        >
          <span
            className={`text-sm text-gray-500 disabled:text-gray-300 ${
              error && "text-gray-300 "
            }`}
          >
            {multiple && selected?.length !== 0 ? (
              selected
                ?.sort((a, b) => {
                  // sort id wise
                  return parseInt(a.id) - parseInt(b.id);
                })
                .map((item, idx) => (
                  // <span className="bg-red-300 mx-1">{item.name}</span>
                  <span
                    key={item.id}
                    className="inline-flex items-center border border-gray-400 gap-1.5  py-1.5 pl-3 pr-2 rounded-md text-xs text-gray-500 font-medium bg-gray-300/60 m-1 hover:bg-gray-200/50 transition-all"
                  >
                    <span>{item.name}</span>
                    {/* //! CROSS_BUTTON */}w
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        const newSelected = selected.filter(
                          (obj) => obj.id !== item.id
                        );
                        setSelected(newSelected);
                        // formControl._fields.selectedClothSize =
                        //   formControl._fields.selectedClothSize.filter(
                        //     (size, index) => size.name !== item.name
                        //   );
                        // formControl._formValues.selectedClothSize =
                        //   formControl._formValues.selectedClothSize.filter(
                        //     (size, index) => size.name !== item.name
                        //   );
                        // console.log(
                        //   formControl._fields.selectedClothSize,
                        //   formControl._formValues.selectedClothSize
                        // );

                        // formControl._fields.selectedClothSize[idx]?.price._f.ref.value = "0"
                        // formControl._formValues.selectedClothSize[idx]?.price = "0"
                        // formControl._fields.selectedClothSize[idx]?.quantity._f.ref.value = "0"
                        // formControl._formValues.selectedClothSize[idx]?.quantity = "0"
                      }}
                      type="button"
                      className="flex-shrink-0 h-4 w-4 inline-flex items-center justify-center rounded-full active:shadow-nm-inset border border-gray-400 hover:text-gray-900  ml-1"
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
          <Listbox.Options className=" absolute max-h-60 w-full overflow-auto rounded-b-md   bg-secondary-color shadow-nm py-1  focus:outline-none sm:text-sm z-50 mt-1 px-1">
            {array.map((item) => (
              <Listbox.Option
                // disabled={error}
                // onClick={() => setError(false)}
                key={item.id}
                className={({ active, selected }) =>
                  `relative focus:outline-none cursor-default select-none py-2 pl-10 pr-4 my-1  ${
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
                          className={`w-4 h-4 rounded-sm mr-2`}
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
