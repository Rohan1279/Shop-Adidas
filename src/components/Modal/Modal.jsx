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
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
              className={`fixed inset-0 bg-secondary-color ${
                isOpen && "opacity-60"
              } `}
            />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
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
                <Dialog.Panel className="bg-secondary-color rounded-lg shadow-nm p-6 mx-4 md:mx-0 w-full md:w-2/3 lg:w-1/2">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">
                      {confirmMessage}
                    </h3>
                    <span className="mb-2 text-xl font-bold">{data?.name}</span>
                    <p className="text-red-400 mb-6 ">
                      This action cannot be undone.
                    </p>

                    <div className="space-x-3">
                      <button
                      onClick={()=>setIsOpen(false)}
                       className="w-1/3 px-4 py-2 shadow-nm active:shadow-nm-inset border border-gray-300  rounded-md transition-colors duration-200">
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="w-1/3 px-4 py-2 shadow-nm active:shadow-nm-inset border border-gray-300  rounded-md transition-colors duration-200"
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
