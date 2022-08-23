import { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import Numbers from "components/base/numbers/list";
import Button from "components/ui/Button";
import BackLink from "components/ui/BackLink";
import { useAppSelector, useAppDispatch } from "store";
import { setSearch } from "store/slices/numbers";
import { routes } from "constants/routes";

import Change from "./components/change";
import { useStyles } from "./styles";

const SimCard: FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const { list } = useAppSelector((state) => state.numbers);
  const dispatch = useAppDispatch();
  const [showNumbersPage, setShowNumbersPage] = useState(true);
  const selectedNumbers = list?.filter((item) => item.checked) || [];

  const titleComponent = <div className={classes.title}>Замена SIM-карты</div>;

  const buttonNextHandler = () => {
    setShowNumbersPage(false);
  };

  const buttonBackHandler = () => {
    setShowNumbersPage(true);
  };

  const openPersonalPage = () => {
    history.push(routes.personal.base)
  }

  useEffect(() => {
    return function () {
      dispatch(setSearch(""));
    };
  }, [dispatch]);

  return (
    <>
      {showNumbersPage ? (
        <>
        <Box width="100%" mb="20px">
            <BackLink onClick={openPersonalPage}>Назад</BackLink>
          </Box>
          <Box mb="16px" mt="12px">
            {titleComponent}
          </Box>
          <Numbers checkType="one" />
          <div className={classes.buttonContainer}>
            {selectedNumbers?.length ? (
              <Button text="Далее" onClick={buttonNextHandler} />
            ) : null}
          </div>
        </>
      ) : (
        <>
          <Box width="100%" mb="20px">
            <BackLink onClick={buttonBackHandler}>Изменить номер</BackLink>
          </Box>
          <Box width="100%" mb="24px">
            <Grid
              container
              alignItems="center"
              justify="space-between"
              wrap="nowrap"
            >
              {titleComponent}
              <div className={classes.headerInfo}>
                Выбран номер:{" "}
                {selectedNumbers ? `+7${selectedNumbers[0]?.msisdn}` : null}
              </div>
            </Grid>
          </Box>
          <Change buttonBackHandler={buttonBackHandler}/>
        </>
      )}
    </>
  );
};

export default SimCard;
