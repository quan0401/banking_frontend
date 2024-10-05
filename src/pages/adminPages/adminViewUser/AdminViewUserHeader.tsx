import { IAuthDocument } from "@interfaces/features/auth.interface";
import { FC, ReactElement } from "react";

interface IAdminViewUserHeaderProps {
  user: IAuthDocument;
}

const AdminViewUserHeader: FC<IAdminViewUserHeaderProps> = ({
  user,
}): ReactElement => {
  return (
    <div className="flex items-center gap-3">
      <img
        className="rounded-full object-cover flex h-20 w-20 justify-center self-center md:h-24 md:w-24 lg:h-36 lg:w-36"
        src={user.profilePicture}
        alt="User Avatar"
      />
      <div>
        <h1 className="text-2xl font-bold">{user.username}</h1>
        <p className="text-sm text-gray-600">
          <a className="font-bold">Public Id: </a>
          {user.profilePublicId}
        </p>
        <p className="text-sm text-gray-600">
          <a className="font-bold">Id: </a>
          {user.id}
        </p>
      </div>
    </div>
  );
};

export default AdminViewUserHeader;
