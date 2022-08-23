import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { TransitionProps } from "@material-ui/core/transitions";
import CloseIcon from "@material-ui/icons/Close";
import PageProgress from "components/ui/PageProgress";

import { useStyles } from "./style";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IButton {
  text?: string;
  show?: boolean;
  callback?: () => void;
  disabled?: boolean;
}

interface IProps {
  title: string;
  description?: string;
  show: boolean;
  handleClose: () => void;
  upButton?: IButton;
  downButton?: IButton;
  type?:
    | "success"
    | "error"
    | "noEmail"
    | "createPassword"
    | "notEnoughMoney"
    | "changeSimSuccess"
    | "changeSimError"
    | "requestSuccess"
    | "mailing";
  loading?: boolean;
  children?: React.ReactNode;
}

const upButtonDefaultValue = {
  text: "Ок",
  show: true,
  callback: () => {},
  disabled: false,
};

const downButtonDefaultValue = {
  text: "Отмена",
  show: true,
  callback: () => {},
  disabled: false,
};

const InfoDialog: React.FC<IProps> = ({
  title,
  description,
  show,
  handleClose,
  upButton = upButtonDefaultValue,
  downButton = downButtonDefaultValue,
  type,
  loading = false,
  children,
}) => {
  const classes = useStyles();
  const upButtonParams = { ...upButtonDefaultValue, ...upButton };
  const downButtonParams = { ...downButtonDefaultValue, ...downButton };

  return (
    <Dialog
      classes={{ root: classes.root, paper: classes.paper }}
      open={show}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
    >
      {loading ? (
        <PageProgress />
      ) : (
        <>
          <Grid container justify="flex-end" alignItems="center">
            <IconButton onClick={handleClose} className={classes.closeBtn}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <DialogContent>
            {type ? <img src={`/images/dialogs/${type}.svg`} alt="img" /> : null}
            <Typography className={classes.title} component="h4">
              {title}
            </Typography>
            {description ? (
              <DialogContentText className={classes.description}>
                {description}
              </DialogContentText>
            ) : null}
            {children ? children : null}
          </DialogContent>
          <DialogActions>
            <Box width="100%" textAlign="center">
              <Box width="100%" mb="20px">
                <Button
                  style={upButtonParams?.show ? {} : { display: "none" }}
                  className={`${classes.btn} ${classes.upBtn}`}
                  onClick={upButtonParams?.callback || undefined}
                  disabled={upButtonParams?.disabled}
                >
                  {upButtonParams?.text}
                </Button>
              </Box>
              <Button
                style={downButtonParams?.show ? {} : { display: "none" }}
                className={`${classes.btn} ${classes.downBtn}`}
                onClick={downButtonParams?.callback}
                disabled={downButtonParams?.disabled}
              >
                {downButtonParams?.text}
              </Button>
            </Box>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default memo(InfoDialog);
