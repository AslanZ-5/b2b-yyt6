import { FC, useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import Numbers from "components/base/numbers/list";
import ButtonForNumbersDialog from "components/base/numbers/dialog";
import { useAppSelector, useAppDispatch } from "store";
import useCheckAdmin from "hooks/useCheckAdmin";
import { setSearch } from "store/slices/numbers";

import Tariffs from "./components/tariffs";
import { useStyles } from "./style";

const TariffsActions: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.numbers);
  const [showNumbersPage, setShowNumbersPage] = useState(true);

  useCheckAdmin();

  const buttonNextHandler = () => {
    setShowNumbersPage(false);
  };

  const buttonBackHandler = () => {
    setShowNumbersPage(true);
  };

  const selectedNumbers = list?.filter((item) => item.checked)?.length || 0;

  useEffect(() => {
    return function () {
      dispatch(setSearch(""));
    };
  }, [dispatch]);

  return (
    <>
      {showNumbersPage ? (
        <>
          <div className={classes.title}>Сменить тариф</div>
          <Numbers />
          <div className={classes.buttonContainer}>
            {selectedNumbers ? (
              <Button
                className={classes.buttonNext}
                onClick={buttonNextHandler}
              >
                Далее
              </Button>
            ) : null}
          </div>
          <div className={classes.iosMargin}></div>
        </>
      ) : (
        <>
          <div
            className={classes.backLink}
            onClick={buttonBackHandler}
            id="adminTariffsBackLink"
          >
            <img src="/images/icons/back-pointer.svg" alt="" />
            <span>Изменить выборку</span>
          </div>
          <Grid container justify="space-between" alignItems="center">
            <div className={classes.title} id="adminTariffsTitle">
              Сменить тариф
            </div>
            <div className={classes.icons}>
              <ButtonForNumbersDialog
                openNumbersPage={() => setShowNumbersPage(true)}
              />
              <img
                onClick={buttonBackHandler}
                className={classes.iconsImg}
                src="/images/icons/open-window.svg"
                alt=""
              />
            </div>
          </Grid>
          <Tariffs />
        </>
      )}
    </>
  );
};

export default TariffsActions;
