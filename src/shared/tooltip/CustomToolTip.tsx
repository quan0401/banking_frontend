// components
import Tooltip from "@mui/material/Tooltip";
import { FC } from "react";
import { ICustomToolTip } from "@interfaces/shared.interface";

const CustomTooltip: FC<ICustomToolTip> = ({
  children,
  withArrow = true,
  tooltipClass,
  title,
  open = false,
  setOpen,
  ...props
}) => {
  return (
    <Tooltip
      // TransitionComponent={Fade}
      arrow={withArrow}
      classes={{
        popper: "px-[15px]",
        tooltip: `!bg-widget shadow !rounded-md !p-0 !font-body !text-body-text`,
        arrow: "!text-widget",
      }}
      enterTouchDelay={0}
      leaveTouchDelay={5000}
      title={title}
      open={open}
      {...props}
    >
      <div>{children}</div>
    </Tooltip>
  );
};

export default CustomTooltip;
