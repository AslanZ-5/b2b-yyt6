import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  searchBtn: {
    backgroundColor: baseColors.mainOrange,
    color: "#fff",
    margin: "0 auto",
    width: 100,
    height: 35,
    fontSize: 14,
    textTransform: "none",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: baseColors.mainOrange,
    },
  },
}));
