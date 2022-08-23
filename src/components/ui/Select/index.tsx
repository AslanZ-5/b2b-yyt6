import { FC } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useStyles } from "./styles";

interface IProps {
  value: string;
  setValue: (value: string) => void;
  options: { label: string; value: string }[];
  styles?: any;
}

const CustomSelect: FC<IProps> = ({ value, setValue, options, styles }) => {
  const classes = useStyles(styles);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
  };
  return (
    <Select
      value={value}
      onChange={handleChange}
      className={`${classes.root} ${styles?.root || ''}`}
      MenuProps={{
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        getContentAnchorEl: null,
        className: `${classes.menu} ${styles?.menu || ''}`
      }}
    >
      <MenuItem value="" className={classes.emptyOption} />
      {options?.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          className={classes.option}
        >
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CustomSelect;
