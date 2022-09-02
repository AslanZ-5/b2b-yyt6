import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: 4,
    "& .MuiAccordion-root": {
      boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
      backgroundColor: baseColors.primaryWhite,
    },
    "& .MuiAccordionSummary-root": {
      borderRadius: 8,
      backgroundColor: baseColors.primaryWhite,
      padding: 25,
    },
    "& MuiCollapse-container": {
      backgroundColor: baseColors.primaryWhite,
    },
    "& .MuiAccordionDetails-root": {
      padding: "0 25px 25px 25px",
    },
    "& .MuiAccordionSummary-content": {
      margin: 0,
    },
  },
  answer: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
    whiteSpace: "pre-wrap"
  },
  question: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
  },
}));
