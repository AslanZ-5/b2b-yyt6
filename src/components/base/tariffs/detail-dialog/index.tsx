import { FC } from "react";

import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";

import TariffDetail from "components/base/tariffs/detail";
import { Tariff } from "types/Tariff";
import PageProgress from "components/ui/PageProgress";
import CustomScrollbar from "components/ui/CustomScrollbar";

import { useStyles } from "./styles";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  tariff: Tariff | null;
  isOwn?: boolean;
}

const InfoDialog: FC<IProps> = ({ open, setOpen, tariff, isOwn }) => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.container}
      open={open}
      id="tariffInfoDialog"
      onClose={() => setOpen(false)}
    >
      <>
        {!tariff?.id ? (
          <PageProgress />
        ) : (
          <>
            <Grid
              className={classes.header}
              container
              justify="space-between"
              alignItems="center"
            >
              <div className={classes.title}>Информация о тарифе</div>
              <div className={classes.button} onClick={() => setOpen(false)}>
                <CloseIcon />
              </div>
            </Grid>
            <Box width="800px">
              <CustomScrollbar showVertical height="70vh">
                <Box width="95%">
                  <TariffDetail id={tariff.id.toString()} isOwn={isOwn} />
                </Box>
              </CustomScrollbar>
            </Box>
          </>
        )}
      </>
    </Dialog>
  );
};

export default InfoDialog;
