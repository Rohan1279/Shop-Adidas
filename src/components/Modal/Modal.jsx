import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function Modal({
  isOpen,
  setIsOpen,
  closeModal,
  openModal,
  children,
  data,
  confirmButtonText,
  confirmMessage,
}) {
  return (
    <>
      {children}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={`fixed inset-0 bg-secondary-color   ${
                isOpen && "opacity-60 "
              } `}
            />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto backdrop-blur-sm">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="mx-4 w-full rounded-lg bg-secondary-color p-6 shadow-nm md:mx-0 md:w-2/3 lg:w-1/3">
                  <div className="text-center">
                    <h3 className="mb-2 text-lg font-medium">
                      {confirmMessage}
                    </h3>
                    <span className="mb-2 text-xl font-bold">{data?.name}</span>
                    <p className="mb-6 text-sm font-medium tracking-wider text-red-400 ">
                      (This action cannot be undone)
                    </p>

                    <div className="space-x-3">
                      <button
                        // type="button"
                        onClick={() => setIsOpen(false)}
                        className="w-1/3 rounded-md border border-gray-300 px-4 py-2 shadow-nm  transition-colors duration-200 active:shadow-nm-inset"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="w-1/3 rounded-md border border-gray-300 px-4 py-2 shadow-nm  transition-colors duration-200 active:shadow-nm-inset"
                        onClick={closeModal}
                      >
                        {confirmButtonText}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
