import Logo from "@components/Logo";
import media from "@assets/login.webp";
import Button from "@shared/button/Button";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center lg:p-[60px] ">
      <div className="flex flex-col max-w-[320px] justify-center items-center">
        <Logo imgClass="w-[60px]" textClass="text-[28px]" />
        <p className=" text-center tracking-[0.2px] font-semibold text-lg leading-6 max-w-[540px] my-7">
          Page Not Found
        </p>
        <Button
          className="btn btn--primary mb-10"
          label="Navigate Back"
          onClick={() => navigate(-1)}
        />
        <img className="max-w-[780px]" src={media} alt="media" />
      </div>
    </div>
  );
};

export default PageNotFound;
