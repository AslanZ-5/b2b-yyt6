import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { baseColors } from "constants/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      boxShadow: "none",
      "& .MuiToolbar-regular": {
        minHeight: 55,
        "&.MuiToolbar-gutters": {
          padding: 0,
          "@media (max-width:960px)": {
            padding: "0 10px",
          },
        },
      },
      "& .MuiAppBar-colorPrimary": {
        background: "transparent",
      },
    },
    headerContainer: {
      background: baseColors.primaryGradient,
    },
    toolbar: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    },
    logoutPopper: {
      zIndex: 10000,
    },
    exitBtn: {
      minWidth: 35,
      height: 35,
      boxShadow: "none",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
      },
      "@media (max-width:767px)": {
        display: "none",
      },
    },
    menuButton: {
      padding: 5,
      "& .MuiIconButton-edgeStart": {
        margin: 0,
      },
      "@media (min-width:768px)": {
        display: "none",
      },
    },
    phoneNumberSelect: {
      minWidth: 181,
      marginRight: 20,
      borderRadius: 5,
      border: "1px solid rgba(240, 240, 240, 0.3)",
      "&:before, &:after": {
        content: "none",
      },
      "& .MuiSelect-select.MuiSelect-select": {
        fontFamily: "PTSans-Bold",
        color: baseColors.primaryWhite,
        fontSize: 14,
        paddingLeft: 16,
      },
      "& .MuiSvgIcon-root.MuiSelect-icon": {
        color: baseColors.primaryWhite,
      },
      "@media (max-width:767px)": {
        "& .MuiSelect-select.MuiSelect-select": {
          paddingLeft: 5,
        },
        minWidth: 140,
        marginRight: 20,
      },
    },
    selectSubTitle: {
      fontSize: 12,
      fontFamily: "PTSans-Regular",
      textAlign: "center",
      cursor: "pointer",
      marginBottom: 10,
      whiteSpace: "pre-wrap",
    },
    selectItem: {
      paddingTop: 10,
      paddingBottom: 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      width: "auto",
      minWidth: 250,
      fontFamily: "PTSans-Bold",
      borderTop: `1px solid ${baseColors.secondaryGrey}`,
      "&.Mui-selected.MuiMenuItem-gutters.MuiListItem-gutters.MuiListItem-button.Mui-selected, &.Mui-selected.MuiMenuItem-gutters.MuiListItem-gutters.MuiListItem-button.Mui-selected:hover, &.MuiMenuItem-gutters.MuiListItem-gutters.MuiListItem-button:hover":
        {
          background: baseColors.primaryWhite,
        },
    },
    lastSelectItem: {
      fontFamily: "PTSans-Regular",
      fontSize: 14,
      padding: 10,
      display: "flex",
      justifyContent: "center",
      color: baseColors.primaryBlue,
      height: 66,
      borderTop: `1px solid ${baseColors.secondaryGrey}`,
      "&.Mui-selected.MuiMenuItem-gutters.MuiListItem-gutters.MuiListItem-button.Mui-selected, &.MuiMenuItem-gutters.MuiListItem-gutters.MuiListItem-button:hover":
        {
          background: baseColors.primaryWhite,
        },
    },
    exitMenu: {
      background: baseColors.primaryWhite,
      padding: 0,
      minWidth: 251,
      borderRadius: 5,
      boxShadow: "2px 2px 23px 0px rgba(0,0,0,0.08)",
    },
    exitMenuItem: {
      listStyle: "none",
      width: "100%",
      minHeight: 65,
      lineHeight: "65px",
      textAlign: "center",
      "&:first-child": {
        cursor: "pointer",
        borderBottom: `1px solid ${baseColors.secondaryGrey}`,
        paddingTop: 20,
        "& p": {
          fontSize: 14,
        },
        "& p:nth-child(2)": {
          fontWeight: "bold",
        },
      },
    },
    textBtn: {
      padding: 0,
      color: baseColors.primaryBlue,
      fontFamily: "PTSans-Bold",
      width: "100%",
      minHeight: "65px",
      lineHeight: "65px",
      textTransform: "none",
    },
    companyName: {
      fontFamily: "PTSans-Bold",
      fontSize: 16,
      lineHeight: 2,
      letterSpacing: 0.19,
      color: baseColors.primaryWhite,
      paddingLeft: 60,
      maxWidth: "60%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",

      "@media (max-width:830px)": {
        paddingLeft: 10,
      },

      "@media (max-width:725px)": {
        display: "none",
      },
    },
    accountSelect: {
      display: "flex",
      alignItems: "center",

      "@media (max-width: 725px)": {
        flexBasis: "auto",
        marginLeft: "auto",
        width: "fit-content",
      },
    },
  })
);
