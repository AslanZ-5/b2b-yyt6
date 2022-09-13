import { Box, Grid, useMediaQuery } from "@material-ui/core";
import { smMq } from "constants/breakpoints";
import { useStyles } from "./styles";

export const LoginFooter = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery(smMq);

  return (
    <Box alignItems="flex-start">
      <Grid className={classes.root}>
        <a className={classes.number} href="tel:+79900070707">
          <Box className={classes.elementContainer}>
            {!isMobile ? (
              <img src={"/images/icons/hotLine.svg"} alt="ico" />
            ) : (
              <img src={"/images/icons/hotLineGradient.svg"} alt="ico" />
            )}
            <div className={classes.elementHotline}>
              <span className={classes.elementDescription}>
                +7(990) 007-07-07{" "}
                {isMobile && (
                  <div className={classes.hotLineText}>ГОРЯЧАЯ ЛИНИЯ</div>
                )}
              </span>
            </div>
          </Box>
        </a>
        {!isMobile && (
            <a  className={classes.number} href="tel:0770">
          <Box className={classes.elementContainer}>
              <img src={"/images/icons/hotLineShort.svg"} alt="ico" />
              <span className={classes.elementDescription}>0770</span>
          </Box>
            </a>
        )}

        <Box className={classes.elementContainer}>
          {isMobile && (
            <a href="https://t.me/Seven7Telecom">
              <img src={"/images/icons/socialTG.svg"} alt="ico" />
            </a>
          )}
          <a href="https://vk.com/seventelecom">
            <img src={"/images/icons/socialVK.svg"} alt="ico" />
          </a>
          {!isMobile && (
            <span className={classes.elementDescription}>
              <div className={classes.socialText}>мы вконтакте</div>
            </span>
          )}
        </Box>
        <span className={classes.elementDescription}>
          <div className={classes.acceptRulesText}>
            Продолжая использовать наш сайт, вы даете согласие на обработку
            файлов Cookies
          </div>
        </span>
      </Grid>
    </Box>
  );
};
