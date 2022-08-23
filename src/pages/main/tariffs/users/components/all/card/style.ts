import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderRadius: 8,
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: "#ffffff",
    "&:hover": {
      cursor: "pointer",
    },
  },
  content: {
    padding: 16,
  },
  mainImg: {
    maxWidth: "100%",
    maxHeight: 100,
    objectFit: "cover",
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  name: {
    fontFamily: "PTSans-Bold",
    fontSize: 16,
    lineHeight: 1.5,
    color: "#131313",

    marginBottom: 6,
  },
  description: {
    fontFamily: "PTSans-Regular",
    fontSize: 12,
    lineHeight: 1.3,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
    minHeight: 31,

    marginBottom: 16,
  },
  quotasContainer: {
    height: 80
  },
  slider: {
    width: "92%",
    margin: "0 auto",
    marginTop: 15,
    height: 31,
  },
  regularPrice: {
    textAlign: "center",
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    lineHeight: 2,
    marginBottom: 22,
  },
  boldPrice: {
    fontFamily: "PTSans-Bold",
    fontSize: 20,
    lineHeight: 2,
    color: "#010101",
  },
  buttonMore: {
    textAlign: "center",
  },
}));

export const useQuotaStyles = makeStyles((theme: Theme) => ({
  mainImg: {
    width: 24,
  },
}));
