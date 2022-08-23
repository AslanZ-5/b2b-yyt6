import { CircularProgress } from "@material-ui/core";
import { useStyles } from "./style";

const PageProgress = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.spinner} />
    </div>
  );
};
export default PageProgress;
