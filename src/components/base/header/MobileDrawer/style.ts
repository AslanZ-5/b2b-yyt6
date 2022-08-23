import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    top: "55px !important",
    "& .MuiPaper-root.MuiDrawer-paper, & .MuiBackdrop-root": {
      height: "calc(100% - 55px)",
      marginTop: 55,
    },
    "& .MuiPaper-root.MuiDrawer-paper": {
      width: 255,
    },
    "& .MuiButtonBase-root.MuiTab-root.MuiTab-textColorInherit.MuiTab-labelIcon": {
      paddingLeft: 30,
    },
  },
});
