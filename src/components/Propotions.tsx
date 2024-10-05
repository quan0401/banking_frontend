// import { TimeAgo } from "@utils/timeago.utils";
// import { formatLargeNumber } from "@utils/utils.service";
// import { FC, ReactElement, useState } from "react";
// import { FaAngleUp, FaAngleDown } from "react-icons/fa";
// import { FaCirclePlus } from "react-icons/fa6";

// const Propotions: FC = (): ReactElement => {
//   const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

//   return (
//     <div
//       onClick={() => setToggleDropdown(!toggleDropdown)}
//       className="flex justify-between px-2 py-3 rounded-lg hover:opacity-80"
//     >
//       <button className="flex items-center">
//         {toggleDropdown ? <FaAngleUp /> : <FaAngleDown />}
//         <div className="ml-4 flex flex-col items-start">
//           <p className="font-bold text-lg flex items-center justify-between">
//             {transaction.transactionType === 1 ? "Top Up" : "Withdraw"}{" "}
//             <FaCirclePlus className="text-green" />
//           </p>
//           <p className="line-clamp-1 text-gray">
//             {TimeAgo.dayWithTime(`${transaction.transactionDate}`)}
//           </p>
//           <p className="line-clamp-1 text-gray">
//             {savingPlan.title} | {savingPlan.interestRate}%
//           </p>
//         </div>
//       </button>

//       <div className="flex items-center">
//         <div>
//           <p className="font-bold text-lg flex items-center justify-end">
//             <span>{transaction.transactionType === 1 ? `+` : "-"}</span>
//             <span>{formatLargeNumber(transaction.amount as number)}</span>
//           </p>
//           <p
//             className={`line-clamp-1 text-gray font-semibold text-end ${
//               transaction.isSuccessful === 1 ? "text-green" : "text-rose-400"
//             }`}
//           >
//             {transaction.isSuccessful === 1
//               ? "Successful"
//               : "Pending or Failed"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Propotions;
