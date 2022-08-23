import { FC, useEffect } from "react";

import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Search from "components/ui/Search";
import PageProgress from "components/ui/PageProgress";
import NumbersInfo from "components/base/numbers/info";
import CustomScrollbar from "components/ui/CustomScrollbar";

import { fetchNumbers, setData } from "store/slices/numbers";
import { useAppDispatch, useAppSelector } from "store";
import useCheckAdmin from "hooks/useCheckAdmin";

import useSorts from "./hooks/useSorts";
import useSearch from "./hooks/useSearch";
import useCheckboxes from "./hooks/useCheckboxes";

import { headerItems } from "./header-item/items";
import ListItem from "./list-item";
import HeaderItem from "./header-item";
import { useStyles } from "./style";

interface IProps {
  checkType?: "any" | "one";
}

const Numbers: FC<IProps> = ({ checkType = "any" }) => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { loading, list } = useAppSelector((state) => state.numbers);

  const { sortedList, setSortedList, columnHandler, columnStatus } = useSorts();
  const { searchValue, setSearchValue, executeSearch } = useSearch({
    setSortedList,
  });
  const { checkAll, checkboxHandler, handleAllCheckboxes } = useCheckboxes({
    checkType,
  });

  useCheckAdmin();

  useEffect(() => {
    if (!list) dispatch(fetchNumbers());
  }, [checkType, dispatch, list]);

  useEffect(() => {
    if (checkType === "one") {
      dispatch(
        setData(list?.map((item) => ({ ...item, checked: false })) || [])
      );
    }
    // eslint-disable-next-line
  }, [checkType]);

  if (loading) return <PageProgress />;

  return (
    <>
      <Box mb={3} width="100%">
        <Grid container alignItems="center" justify="space-between" spacing={2}>
          <Grid container item xs={12} sm={7}>
            <Search
              value={searchValue}
              setValue={setSearchValue}
              placeholder="Введите фамилию, номер, номер SIM-карты или лицевой счет"
              buttonHandler={executeSearch}
              startAdornment={
                <img src="/images/icons/search.svg" alt="reset" />
              }
              endAdornment={
                <Button className={classes.searchBtn} onClick={executeSearch}>
                  Поиск
                </Button>
              }
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <div className={classes.numbersInfo}>
              <NumbersInfo />
            </div>
          </Grid>
        </Grid>
      </Box>
      <CustomScrollbar showHorizontal>
        <>
          <div className={`${classes.listHeader} ${classes.listRow}`}>
            <div className={classes.checkboxField}>
              {checkType === "any" ? (
                <Checkbox
                  className={classes.checkbox}
                  checked={checkAll}
                  onChange={handleAllCheckboxes}
                  color="default"
                />
              ) : null}
            </div>
            <div className={classes.imgField}>Тип</div>
            {headerItems.map((item) => (
              <div key={item.className} className={classes[item.className]}>
                <HeaderItem
                  label={item.label}
                  fieldKey={item.fieldKey}
                  columnStatus={columnStatus}
                  columnHandler={columnHandler}
                />
              </div>
            ))}
          </div>
          <div>
            {sortedList?.map((item, index) => (
              <ListItem
                item={item}
                key={index}
                checkboxHandler={checkboxHandler}
              />
            ))}
          </div>
        </>
      </CustomScrollbar>
    </>
  );
};

export default Numbers;
