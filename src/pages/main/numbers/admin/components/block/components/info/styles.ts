import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderRadius: 8,
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: baseColors.primaryWhite,
    padding: 20,
  },
  title: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    fontFamily: "PTSans-Regular",
    fontSize: 14,
  },
  link: {
    fontFamily: "PTSans-Bold",
    fontSize: 14,
    color: baseColors.primaryBlue,
  },
}));
