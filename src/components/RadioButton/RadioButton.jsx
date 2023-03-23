import { useState, Fragment } from "react";
import { RadioGroup } from "@headlessui/react";
import { FaCheckCircle } from "react-icons/fa";

// const roles = ["Buyer", "Seller"];
function RadioButton({ roles, userRole, setUserRole, buyerImg, sellerImg }) {
  //   const [role, setUserRole] = useState(roles[0]);
  console.log(userRole);
  return (
    <RadioGroup value={userRole} onChange={setUserRole}>
      {roles.map((userRole) => (
        /* Use the `active` state to conditionally style the active option. */
        /* Use the `checked` state to conditionally style the checked option. */
        <RadioGroup.Option key={userRole} value={userRole} as={Fragment}>
          {({ active, checked }) => (
            <button
              type="button"
              className={`${
                checked
                  ? "bg-blue-400 text-white shadow-md shadow-blue-300 "
                  : "bg-secondary-color text-black"
              } inline-flex cursor-pointer w-1/2  items-center justify-center   p-1 rounded-md transition-all duration-300 space-x-2 `}
            >
              {/* {checked && <FaCheckCircle></FaCheckCircle>} */}
              <img
                src={userRole === "Buyer" ? `${buyerImg}` : `${sellerImg}`}
                // src={`${role=== "Buyer" ? }`}
                alt=""
                className="w-10 h-10"
              />
              <p className="text-lg ">{userRole}</p>
            </button>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}
export default RadioButton;
