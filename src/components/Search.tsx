import { ISearchProps } from "@interfaces/components.interface";
import Button from "@shared/button/Button";
import TextInput from "@shared/inputs/TextInput";
import PropTypes from "prop-types";
import { FC, ReactElement } from "react";
import { FaTimes } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Search: FC<ISearchProps> = ({
  placeholder = "Search...",
  query,
  setQuery,
  wrapperClass,
}): ReactElement => {
  return (
    <div className={`relative ${wrapperClass || ""}`}>
      <TextInput
        className="field-input !pr-[60px]"
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
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
