import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: 4,
    "& .MuiAccordion-root": {
      boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
      backgroundColor: "#ffffff",
    },
    "& .MuiAccordionSummary-root": {
      borderRadius: 8,
      backgroundColor: "#ffffff",
      padding: 25,
    },
    "& MuiCollapse-container": {
      backgroundColor: "#ffffff",
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
