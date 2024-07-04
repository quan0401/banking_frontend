import { IAuthDocument } from "@interfaces/features/auth.interface";
import { TimeAgo } from "@utils/timeago.utils";
import { FC, ReactElement } from "react";
import {
  FaMailBulk,
  FaMapMarkerAlt,
  FaPhone,
  FaRegClock,
  FaUserAlt,
} from "react-icons/fa";
interface IAdminViewUserBodyProps {
  user: IAuthDocument;
}

const AdminViewUserBody: FC<IAdminViewUserBodyProps> = ({
  user,
}): ReactElement => {
  return (
    <div className="border-grey border bg-widget">
      <div className="mb-1 flex justify-between border-b">
        <h4 className="flex py-2.5 pl-3.5 text-sm font-bold md:text-base">
          ABOUT ME
        </h4>
      </div>
      <ul className="mb-0 list-none pt-1.5">
        <li className="flex justify-between text-sm md:text-base mb-2">
          <div className="col-span-3 ml-3 flex pb-3">
            <FaMapMarkerAlt className="mr-2 mt-1" />
            <div className="mr-3 font-bold">Address</div>
          </div>
          <div className="mr-4">{user.homeAddress}</div>
        </li>
        <li className="flex justify-between text-sm md:text-base mb-2">
          <div className="col-span-3 ml-3 flex pb-3">
            <FaUserAlt className="mr-2 mt-1" />
            <div className="mr-3 font-bold">Member since</div>
          </div>
          <div className="mr-4">
            {TimeAgo.dayMonthYear(`${user.createdAt}`)}
          </div>
        </li>
        <li className="flex justify-between text-sm md:text-base mb-2">
          <div className="col-span-3 ml-3 flex pb-3">
            <FaRegClock className="mr-2 mt-1" />
            <div className="mr-3 font-bold">Cccd</div>
          </div>
          <div className="mr-4">{user.cccd}</div>
        </li>
        <li className="flex justify-between text-sm md:text-base mb-2">
          <div className="col-span-3 ml-3 flex pb-3">
            <FaPhone className="mr-2 mt-1" />
            <div className="mr-3 font-bold">Phone</div>
          </div>
          <div className="mr-4">{user.phone}</div>
        </li>
        <li className="flex justify-between text-sm md:text-base mb-2">
          <div className="col-span-3 ml-3 flex pb-3">
            <FaMailBulk className="mr-2 mt-1" />
            <div className="mr-3 font-bold">Email</div>
          </div>
          <div className="mr-4">{user.email}</div>
        </li>
      </ul>
    </div>
  );
};

export default AdminViewUserBody;
