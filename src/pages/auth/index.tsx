import React from "react";
import { useMediaQuery } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { useStyles } from "./styles";
import LoginAccount from "components/base/auth";
import { mdMq } from "constants/breakpoints";
import { LoginFooter } from "components/base/auth/footer";

const Auth: React.FC = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery(mdMq);

  return (
    <Box justifyContent="center">
      <Grid className={classes.root} container justify="center">
        <Box className={classes.loginForm}>
          <LoginAccount />
        </Box>
        <Box maxWidth="832px" maxHeight="505px">
          {isMobile ? (
            <img src="/images/cards/AuthCardMobile.svg" alt="login" />
          ) : (
            <img src="/images/cards/AuthCard.svg" alt="login" />
          )}
        </Box>
      </Grid>
      <Grid className={classes.loginFooter}>
        <LoginFooter />
      </Grid>
    </Box>
  );
};

export default Auth;
