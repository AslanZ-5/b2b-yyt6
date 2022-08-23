import { FC, useState, useEffect } from "react";
import { useParams } from "react-router";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Numbers from "components/base/numbers/list";
import ButtonForNumbersDialog from "components/base/numbers/dialog";
import { useAppSelector, useAppDispatch } from "store";
import { setSearch } from "store/slices/numbers";

import useRedirect from "./hooks/useRedirect";
import Services from "./components/services";
import { useStyles } from "./style";

const All: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.numbers);
  const { type }: { type: "connection" | "disconnection" | undefined } =
    useParams();
  const [showNumbersPage, setShowNumbersPage] = useState(true);

  useRedirect();

  const buttonNextHandler = () => {
    setShowNumbersPage(false);
  };

  const buttonBackHandler = () => {
    setShowNumbersPage(true);
  };

  const selectedNumbers = list?.filter((item) => item.checked)?.length || 0;

  const titleComponent = (
    <div className={classes.title} id="adminServicesTitle">
      {type === "connection" ? "Подключение" : "Отключение"} услуги
    </div>
  );

  useEffect(() => {
    return function () {
      dispatch(setSearch(""));
    };
  }, [dispatch]);

  return (
    <>
      {showNumbersPage ? (
        <>
          {titleComponent}
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
            id="adminServicesBackLink"
          >
            <img src="/images/icons/back-pointer.svg" alt="" />
            <span>Изменить выборку</span>
          </div>
          <Grid container justify="space-between" alignItems="center">
            {titleComponent}
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
          <Services type={type} />
        </>
      )}
    </>
  );
};

export default All;
