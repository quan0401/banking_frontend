import { FC, ReactElement } from "react";
import { FaCircleNotch } from "react-icons/fa";

const CircularPageLoader: FC = (): ReactElement => {
  return (
    <div className="flex justify-center items-center z-50  h-full w-full">
      <FaCircleNotch
        className="animate-spin h-10 w-10 "
        size={40}
        color="#50b5ff"
      />
    </div>
  );
};

export default CircularPageLoader;
