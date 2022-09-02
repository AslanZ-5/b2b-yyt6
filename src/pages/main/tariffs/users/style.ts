import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  tabs: {
    minHeight: 25,
    marginBottom: 36,
    "& .MuiButtonBase-root.MuiTab-root": {
      minWidth: "auto",
      marginRight: 20,
      fontSize: 20,
      minHeight: 20,
      padding: 0,
      textTransform: "none",
      fontFamily: "PTSans-Bold",
      "&.Mui-selected": {
        color: baseColors.primaryBlack,
      },
      "& .MuiTab-wrapper": {
        alignItems: "flex-start",
      },
    },
  },
  indicator: {
    backgroundColor: baseColors.primaryBlue,
  },
}));
