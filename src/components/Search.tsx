import { ISearchProps } from "@interfaces/components.interface";
import Button from "@shared/button/Button";
import TextInput from "@shared/inputs/TextInput";
import { FC, ReactElement } from "react";
import { FaTimes } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Search: FC<ISearchProps> = ({
  placeholder = "Search...",
  query,
  setQuery,
  wrapperClass,
}): ReactElement => {
  const currentUrlParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate(); // Updated to useNavigate

  return (
    <div className={`relative ${wrapperClass || ""}`}>
      <TextInput
        className="field-input !pr-[60px]"
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          currentUrlParams.set("query", (e.target as HTMLInputElement).value);
          setQuery((e.target as HTMLInputElement).value);
          navigate(
            `${window.location.pathname}?${currentUrlParams.toString()}`
          ); // Updated to use navigate
        }}
      />
      <Button
        className={`field-btn text-red !right-[40px] transition ${
          query ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setQuery("")}
        aria-label="Clear all"
        label={<FaTimes />}
      />
      <Button className="field-btn icon" label={<FaMagnifyingGlass />} />
    </div>
  );
};

export default Search;
