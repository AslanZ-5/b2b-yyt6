import { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

import Search from "components/ui/Search";
import { useAppDispatch } from "store";
import { setSearch } from "store/slices/numbers";
import { routes } from "constants/routes";
import { useStyles } from "./style";

const NumbersSearch: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("");

  const setNumberToStore = () => {
    dispatch(setSearch(inputValue));
    history.push(routes.services.admin.connection);
  };

  return (
    <Search
      value={inputValue}
      setValue={setInputValue}
      placeholder="Введите фамилию, номер, номер SIM-карты или лицевой счет"
      buttonHandler={setNumberToStore}
      startAdornment={<img src="/images/icons/search.svg" alt="reset" />}
      endAdornment={
        <Button className={classes.searchBtn} onClick={setNumberToStore}>
          Поиск
        </Button>
      }
    />
  );
};

export default NumbersSearch;
