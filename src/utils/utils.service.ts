import countries, { LocalizedCountryNames } from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import millify from "millify";
import { toast } from "react-toastify";
import isEqual from "react-fast-compare";
import { cloneDeep } from "lodash";
import axios, { AxiosResponse } from "axios";

countries.registerLocale(enLocale);

export const lowerCase = (str: string): string => {
  return str.toLowerCase();
};

export const firstLetterUppercase = (str: string): string => {
  const valueString = lowerCase(`${str}`);
  return `${valueString.charAt(0).toUpperCase()}${valueString
    .slice(1)
    .toLowerCase()}`;
};

export const formatCamelCaseToTitle = (camelCaseString: string): string => {
  // Split the string at each point a capital letter appears
  const words = camelCaseString.split(/(?=[A-Z])/);

  // Convert the first letter of each word to uppercase and the rest to lowercase
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  // Join the words back together with a space
  return formattedWords.join(" ");
};

export const replaceSpacesWithDash = (title: string): string => {
  const lowercaseTitle: string = lowerCase(`${title}`);
  return lowercaseTitle.replace(/\/| /g, "-"); // replace / and space with -
};

export const replaceDashWithSpaces = (title: string): string => {
  const lowercaseTitle: string = lowerCase(`${title}`);
  return lowercaseTitle.replace(/-|\/| /g, " "); // replace - / and space with -
};

export const replaceAmpersandWithSpace = (title: string): string => {
  return title.replace(/&/g, "");
};

export const replaceAmpersandAndDashWithSpace = (title: string): string => {
  const titleWithoutDash = replaceDashWithSpaces(title);
  return titleWithoutDash.replace(/&| /g, " ");
};

export const categories = (): string[] => {
  return [
    "Graphics & Design",
    "Digital Marketing",
    "Writing & Translation",
    "Video & Animation",
    "Music & Audio",
    "Programming & Tech",
    "Photography",
    "Data",
    "Business",
  ];
};

export const countriesList = (): string[] => {
  const countriesObj: LocalizedCountryNames<{ select: "official" }> =
    countries.getNames("en", { select: "official" });
  return Object.values(countriesObj);
};

export const saveToSessionStorage = (data: string, email: string): void => {
  window.sessionStorage.setItem("isLoggedIn", data);
  window.sessionStorage.setItem("loggedInUser", email);
};

export const getDataFromSessionStorage = (key: string) => {
  const data: string = window.sessionStorage.getItem(key) as string;
  return JSON.parse(data);
};

export const saveToLocalStorage = (key: string, data: string): void => {
  window.localStorage.setItem(key, data);
};

export const getDataFromLocalStorage = (key: string): any => {
  const data = window.localStorage.getItem(key) as string;
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
};

export const deleteFromLocalStorage = (key: string): void => {
  window.localStorage.removeItem(key);
};

export const degreeList = (): string[] => {
  return [
    "Associate",
    "B.A.",
    "B.Sc.",
    "M.A.",
    "M.B.A.",
    "M.Sc.",
    "J.D.",
    "M.D.",
    "Ph.D.",
    "LLB",
    "Certificate",
    "Other",
  ];
};

export const languageLevel = (): string[] => {
  return ["Basic", "Conversational", "Fluent", "Native"];
};

export const yearList = (maxOffset: number): string[] => {
  const years: string[] = [];
  const currentYear: number = new Date().getFullYear();
  for (let i = 0; i <= maxOffset; i++) {
    const year: number = currentYear - i;
    years.push(`${year}`);
  }
  return years;
};

export const monthList = (): string[] => {
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
};

export const shortenLargeNumbers = (
  data: number | undefined,
  precision: number = 0
): string => {
  if (data === undefined) {
    return "0";
  }
  // 100,000,000 => 100M
  return millify(data, { precision });
};

export const formatLargeNumber = (number: number) => {
  return number.toLocaleString("de-DE"); // 'de-DE' uses dots as thousand separators
};

export const rating = (num: number): number => {
  // convert to decimal
  if (num) {
    return Math.round(num * 10) / 10;
  }
  return 0.0;
};

export const validURL = (str: string): boolean => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

export const isEmptyObj = (
  obj: Record<string, any>,
  excludedKeys: string[] = []
) => {
  for (var key in obj) {
    if (excludedKeys.indexOf(key) >= 0) continue;
    if (obj[key] !== null && obj[key] !== "") {
      return false;
    }
  }
  return true;
};

export const objWithAllValuesPresent = (
  obj: Record<string, any>,
  excludedKeys: string[] = []
): boolean => {
  for (const key in obj) {
    if (excludedKeys.indexOf(key) >= 0) continue;
    if (obj[key] === null || obj[key] === "") {
      return false;
    }
  }
  return true;
};

export const myCompareObjs = (
  a: Record<string, any>,
  b: Record<string, any>,
  excepFields: string[] = []
): boolean => {
  const clonedA = cloneDeep(a);
  const clonedB = cloneDeep(b);
  for (const field of excepFields) {
    delete clonedA[field];
    delete clonedB[field];
  }
  console.log("isEqual(clonedA, clonedB)", isEqual(clonedA, clonedB));
  return isEqual(clonedA, clonedB);
};

export const showSuccessToast = (message: string): void => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};

export const showErrorToast = (message: string): void => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};

export const isValidUrl = (string: string): boolean => {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }
  return true;
};

export const reactQuillUtils = () => {
  const modules = {
    toolbar: [
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };
  const formats: string[] = ["bold", "italic", "list", "bullet"];
  return { modules, formats };
};

export const expectedGigDelivery = (): string[] => {
  return [
    "1 Day Delivery",
    "2 Days Delivery",
    "3 Days Delivery",
    "4 Days Delivery",
    "5 Days Delivery",
    "6 Days Delivery",
    "7 Days Delivery",
    "10 Days Delivery",
    "14 Days Delivery",
    "21 Days Delivery",
    "30 Days Delivery",
    "45 Days Delivery",
    "60 Days Delivery",
    "75 Days Delivery",
    "90 Days Delivery",
  ];
};

export const generateRandomNumber = (length: number): number => {
  return (
    Math.floor(Math.random() * (9 * Math.pow(10, length - 1))) +
    Math.pow(10, length - 1)
  );
};

export const bytesToSize = (bytes: number): string => {
  const sizes: string[] = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) {
    return "n/a";
  }
  const i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10);
  if (i === 0) {
    return `${bytes} ${sizes[i]}`;
  }
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};

export const getFileBlob = async (url: string): Promise<AxiosResponse> => {
  const response: AxiosResponse = await axios.get(url, {
    responseType: "blob",
  });
  return response;
};

export const downloadFile = (blobUrl: string, fileName: string): void => {
  const link: HTMLAnchorElement = document.createElement("a");
  link.href = blobUrl;
  link.setAttribute("download", `${fileName}`);
  // Append to html link element page
  document.body.appendChild(link);
  // Start download
  link.click();
  // Clean up and remove link
  if (link.parentNode) {
    link.parentNode.removeChild(link);
  }
};

export const handleFilterError = (
  field: string,
  validationErrors: Record<string, string>[]
): string[] => {
  const errors: string[] = [];

  for (const error of validationErrors) {
    if (Object.keys(error)[0] === field) {
      errors.push(`${error[field]}`);
    }
  }

  return errors;
};
