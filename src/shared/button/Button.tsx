import { IButtonProps } from "@interfaces/shared.interface";
import { FC, ReactElement } from "react";

const Button: FC<IButtonProps> = (props): ReactElement => {
  const { id, label, className, disabled, role, type, testId, onClick } = props;
  return (
    <button
      data-testid={testId}
      id={id}
      className={className}
      disabled={disabled}
      role={role}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
