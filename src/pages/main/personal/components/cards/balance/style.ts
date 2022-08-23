import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  defaultBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",

    backgroundImage: "url(/images/cards/balanceCard.svg)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: 10,

    height: 196,
    color: "#fff",
  },
  defaultTitle: {
    width: "80%",
    margin: "0 auto",
    marginTop: 13,
    textAlign: "center",

    fontFamily: "PTSans-Regular",
    fontSize: 16,
    lineHeight: 1.2,
  },
  balanceCard: {
    boxSizing: "border-box",
    width: "100%",
    color: "#fff",
    backgroundColor: "transparent",
    boxShadow: "none",
    overflow: "visible",
    backgroundImage: "url(/images/cards/balanceCard.svg)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: "PTSans-Bold",
    lineHeight: 1.72,
    letterSpacing: "0.22 px",
  },
  text: {
    fontSize: 12,
    fontFamily: "PTSans-Regular",
    lineHeight: 1.5,
    letterSpacing: "0.14px",
    marginBottom: 50,
    opacity: 0.5,
  },
  balance: {
    fontSize: 30,
    fontFamily: "PTSans-Bold",
    lineHeight: 1.23,
  },
  reload: {
    cursor: "pointer",
  },
  rotation: {
    animation: `$myEffect 1500ms linear infinite`,
  },
  "@keyframes myEffect": {
    "100%": {
      opacity: 1,
      transform: "rotate(360deg)",
    },
  },
}));
