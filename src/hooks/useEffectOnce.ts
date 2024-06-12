import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

type IResponse<T> = { message: string } & { [key: string]: T };

export const useEffectOnce = <T>(
  callback: () => Promise<AxiosResponse<IResponse<T>>>
): IResponse<T> | null => {
  const [result, setResult] = useState<IResponse<T> | null>(null);
  useEffect(() => {
    callback()
      .then((res) => {
        setResult(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [callback]);
  return result;
};
