import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from 'constants/colors';

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    "& .MuiDialog-paper": {
      padding: 25,
      borderRadius: 12,
      maxWidth: 800
    },
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontFamily: "PTSans-Bold",
    fontSize: 22,
    color: baseColors.primaryBlack,
  },
  button: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
