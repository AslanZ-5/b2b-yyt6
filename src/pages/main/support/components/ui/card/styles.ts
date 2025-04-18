import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderRadius: 8,
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: baseColors.primaryWhite,
    padding: "20px 24px 21px 20px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  card: {
    overflow: "visible",
    boxShadow: "none",
  },
  title: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
    paddingLeft: 10,
  },
  description: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
    color: baseColors.primaryGrey,
    paddingLeft: 40,
  },
}));
