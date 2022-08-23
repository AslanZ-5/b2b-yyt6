import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { setData } from "store/slices/numbers";

type ReturnValue = {
  checkboxHandler: (icc: number) => void;
  handleAllCheckboxes: () => void;
  checkAll: boolean;
};

const useCheckboxes = ({
  checkType,
}: {
  checkType: "any" | "one";
}): ReturnValue => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.numbers);
  const [checkAll, setCheckAll] = useState(
    list?.every((item) => item.checked) || false
  );

  const checkboxHandler = (msisdn: number) => {
    dispatch(
      setData(
        list?.map((item) => {
          return item.msisdn === msisdn
            ? { ...item, checked: !item.checked }
            : checkType === "any"
            ? item
            : { ...item, checked: false };
        }) || []
      )
    );
  };

  const handleAllCheckboxes = () => {
    dispatch(
      setData(list?.map((item) => ({ ...item, checked: !checkAll })) || [])
    );
    setCheckAll((prev) => !prev);
  };

  useEffect(() => {
    const allNumbersCount = list?.length || 0;
    const selectedNumbersCount =
      list?.filter((item) => item.checked)?.length || 0;
    if (
      allNumbersCount !== 0 &&
      selectedNumbersCount !== 0 &&
      allNumbersCount === selectedNumbersCount
    )
      setCheckAll(true);
    else setCheckAll(false);
  }, [list]);

  return { checkboxHandler, handleAllCheckboxes, checkAll };
};

export default useCheckboxes;
