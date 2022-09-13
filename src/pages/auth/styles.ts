import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    padding: "130px 140px 10px 92px",
    flexWrap: "nowrap",
    "@media (max-width:1280px)": {
      padding: "100px 92px 10px 92px",
    },
    "@media screen and (max-width:770px)": {
      flexWrap: "wrap",
      padding: "50px 16px 0px 16px",
      columnGap: "16px",
    },
  },
  loginForm: {
    padding: "80px 30px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    alignSelf: "flex-start",
    alignItems: "flex-start",
    minWidth: "343px",
    boxSizing: "border-box",
    maxWidth: "408px",
    marginRight: "16px",
    "@media (max-width:1280px)": {
      padding: "105px 25px",
    },
    "@media (max-width:768px)": {
      maxWidth: "343px",
      padding: "105px 15px",
      margin: "0px 0px 5px 0px",
    },
    "@media (max-width:734px)": {
      maxWidth: "343px",
      margin: "20px 0px 5px 0px",
      padding: "50px 15px",
    },
  },
  loginFooter: {
    height: "110px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "20px",
    "@media (max-width:1280px)": {
      justifyContent: "center",
    },
    "@media (max-width:434px)": {
      marginTop: "100px",
      padding: "0 16px",
      marginBottom: "42px",
    },
  },
});
