import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { fetchAppInfo } from "store/slices/app";

const useFetchAppInfo = () => {
  const { loading } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAppInfo());
  }, [dispatch]);

  return { loading };
};

export default useFetchAppInfo;
