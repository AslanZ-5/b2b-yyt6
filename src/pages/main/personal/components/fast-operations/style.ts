import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  itemWrapper: {
    borderRadius: 8,
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
    padding: 14,
    minHeight: 120,
    "&:hover": {
      cursor: "pointer",
    },
  },
  title: {
    fontFamily: "PTSans-Regular",
    fontSize: 16,
    textAlign: "center",
    alignSelf: "stretch",
  },
  img: {
    maxWidth: "100%",
    marginBottom: 4,
  },
}));
