import { CircularProgress } from "@material-ui/core";
import { FC } from "react";
import { useStyles } from "./style";

const PageProgress:FC<{style?:string}> = ({style}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={style}>
      <CircularProgress className={classes.spinner} />
      </div>
    </div>
  );
};
export default PageProgress;
