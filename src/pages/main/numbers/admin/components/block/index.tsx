import { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import Numbers from "components/base/numbers/list";
import Button from "components/ui/Button";
import BackLink from "components/ui/BackLink";
import Select from "components/ui/Select";
import ButtonForNumbersDialog from "components/base/numbers/dialog";
import NumbersInfo from "components/base/numbers/info";
import { useAppSelector, useAppDispatch } from "store";
import { setSearch } from "store/slices/numbers";
import { routes } from "constants/routes";

import { OperationType } from "./types/OperationType";
import Block from "./components/block";
import { useStyles, useSelectStyles } from "./style";
import { useMemo } from "react";

const options = [
  {label: "Добавление блокировок", value: "block"},
  {label: "Удаление блокировок",value: "unblock"}
]

const BlockNumber: FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const selectClasses = useSelectStyles();

  const dispatch = useAppDispatch();
  const [showNumbersPage, setShowNumbersPage] = useState(true);
  const { list } = useAppSelector((state) => state.numbers);
  
  const [operationType, setOperationType] = useState<OperationType>("block");

  const buttonNextHandler = () => {
    setShowNumbersPage(false);
  };

  const buttonBackHandler = () => {
    setShowNumbersPage(true);
  };

  const openPersonalPage = () => {
    history.push(routes.personal.base)
  }

  const selectedNumbers = useMemo(() => list?.filter((item) => item.checked) || [], [list]);

  useEffect(() => {
    return function () {
      dispatch(setSearch(""));
    };
  }, [dispatch]);

  const titleComponent = ( 
    <Grid container alignItems="center" wrap="nowrap">
      <Box width="250px">
        <Select
          value={operationType}
          setValue={(value:string) => {
            if(value === "block" || value === "unblock")
            setOperationType(value)
          }}
          options={options}
          styles={selectClasses}
        />
      </Box>
    </Grid>
  );

  return (
    <>
      {showNumbersPage ? (
        <>
          <Box width="100%" mb="20px">
            <BackLink onClick={openPersonalPage}>Назад</BackLink>
          </Box>
          <Box mb="16px" mt="12px">
            <div className={classes.title}>Добавление блокировок</div>
          </Box>
          <Numbers />
          <div className={classes.buttonContainer}>
            {selectedNumbers?.length ? (
              <Button text="Далее" onClick={buttonNextHandler} />
            ) : null}
          </div>
          <div className={classes.iosMargin}></div>
        </>
      ) : (
        <>
          <Box width="100%" mb="20px">
            <BackLink onClick={buttonBackHandler}>Изменить выборку</BackLink>
          </Box>
          <Grid container justify="space-between" alignItems="center" wrap="nowrap">
            <Grid item xs={6}>
              {titleComponent}
            </Grid>
            <Grid container justify="flex-end" item xs={6} className={classes.icons}>
              <Box pr={4}>
                <NumbersInfo />
              </Box>
              <ButtonForNumbersDialog
                openNumbersPage={() => setShowNumbersPage(true)}
              />
              <img
                onClick={buttonBackHandler}
                className={classes.iconsImg}
                src="/images/icons/open-window.svg"
                alt=""
              />
            </Grid>
          </Grid>
          <Block operationType={operationType} successRedirect={buttonBackHandler}/>
        </>
      )}
    </>
  );
};

export default BlockNumber;
