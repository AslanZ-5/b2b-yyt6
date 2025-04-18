import { makeStyles, Theme } from "@material-ui/core/styles";
import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: "50%",
    backgroundColor: baseColors.primaryWhite,
    border: `4px solid ${baseColors.primaryAqua}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    width: "100%",
    height: "75vh",
  },
}));
