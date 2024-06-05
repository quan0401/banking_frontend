import {
  ChangeEvent,
  CSSProperties,
  ReactNode,
  Ref,
  KeyboardEvent,
  ReactElement,
  Dispatch,
  SetStateAction,
} from "react";

export interface IButtonProps {
  label?: string | ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  id?: string;
  className?: string;
  role?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (event?: any) => void;
  disabled?: boolean;
  testId?: string;
}

export interface ITextInputProps {
  id?: string;
  name?: string;
  type?: string;
  value?: string | number;
  ref?: Ref<HTMLInputElement>;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
  readOnly?: boolean;
  checked?: boolean;
  rows?: number;
  autoFocus?: boolean;
  maxLength?: number;
  min?: string | number;
  max?: string | number;
  onChange?: (event: ChangeEvent) => void;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyUp?: () => void;
  onKeyDown?: (event: KeyboardEvent) => void;
}

export interface ICustomToolTip {
  children: ReactElement;
  withArrow?: boolean;
  tooltipClass?: string;
  title?: string | ReactElement | ReactNode;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}
