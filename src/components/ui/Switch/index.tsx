import { FC } from "react";

import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch, { SwitchProps, SwitchClassKey } from "@material-ui/core/Switch";

import { baseColors } from "constants/colors";
import { useStyles } from "./styles";

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 37,
      height: 22,
      padding: 0,
      margin: 0,
      "& .MuiSwitch-switchBase": {
        top: 2,
        left: 2,
      },
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: baseColors.primaryBlue,
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: baseColors.primaryBlue,
        border: `6px solid ${baseColors.primaryWhite}`,
      },
    },
    thumb: {
      width: 16,
      height: 16,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: baseColors.lightGrey,
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  })
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

interface IProps {
  value: boolean;
  setValue: (value: boolean) => void;
  label?: string;
}

const SwitchUI: FC<IProps> = ({ value, setValue, label }) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.checked);
  };

  return (
    <FormGroup className={classes.root}>
      <FormControlLabel
        control={<IOSSwitch checked={value} onChange={handleChange} />}
        label={label}
      />
    </FormGroup>
  );
};

export default SwitchUI;
