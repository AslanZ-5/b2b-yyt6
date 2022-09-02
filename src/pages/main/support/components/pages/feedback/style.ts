import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderRadius: 8,
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: baseColors.primaryWhite,
    padding: "24px 30px",
  },
  label: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
  },
  field: {
    marginBottom: 24,
  },
}));
