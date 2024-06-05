import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ILogoProps {
  imgClass?: string;
  textClass?: string;
}

export interface ISpringProps {
  index?: number;
  className?: string;
  type?: "fade" | "slideUp" | "slideLeft" | "zoom";
  children: ReactNode;
}

export interface ISearchProps {
  placeholder?: string;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  wrapperClass?: string;
}
