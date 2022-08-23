import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    "& .MuiInputBase-input": {
      padding: 12,
    },
    "& .MuiOutlinedInput-adornedEnd": {
      paddingRight: 4,
    },
  },
  searchBtn: {
    backgroundColor: baseColors.mainOrange,
    margin: "0 auto",
    width: 35,
    minWidth: 35,
    padding: 0,
    height: 35,
    "&:hover": {
      backgroundColor: baseColors.mainOrange,
    },
  },
}));
