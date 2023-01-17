import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 27,
  },
  topText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  bottomText: {
    fontSize: 14,
    color: baseColors.primaryGrey,
  },
  detailSectionDivider: {
    height: 3,
    backgroundColor: baseColors.lightGrey,
    border: "none",
    margin: "20px 0",
  },
}));
