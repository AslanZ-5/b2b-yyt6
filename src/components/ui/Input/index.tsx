import { FC, ChangeEvent } from "react";
import MaskedInput, { maskArray } from "react-text-mask";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";

import { useStyles } from "./style";

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
  mask: maskArray;
}

function TextMaskCustom(props: TextMaskCustomProps) {
  const { inputRef, mask, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask}
    />
  );
}

interface IProps {
  value: string;
  setValue: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  name: string;
  placeholder?: string;
  buttonHandler?: () => void;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  additionalStyles?: any;
  error?: boolean;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  mask?: maskArray;
  readOnly?: boolean;
  type?: string;
}

const CustomInput: FC<IProps> = ({
  value,
  setValue,
  name,
  placeholder,
  buttonHandler,
  startAdornment,
  endAdornment,
  additionalStyles,
  error,
  helperText,
  multiline,
  rows,
  mask,
  readOnly,
  type = "text",
}) => {
  const classes = useStyles();

  return (
      <FormControl
      className={`${classes.formControl} ${
        additionalStyles?.formControl || ""
      }`}
      variant="outlined"
    >
      <OutlinedInput
        value={value}
        onChange={(event) => setValue(event)}
        className={classes.input}
        name={name}
        type={type}
        startAdornment={
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        }
        onKeyDown={(e) =>
          e.keyCode === 13 && buttonHandler ? buttonHandler() : null
        }
        placeholder={placeholder || ""}
        multiline={multiline}
        rows={rows}
        inputComponent={mask ? (TextMaskCustom as any) : undefined}
        inputProps={{
          mask: mask,
          autocomplete: 'new-password'
        }}
        readOnly={readOnly}
      />
      {error ? (
        <FormHelperText error id={`accountId-error-${name}`}>
          {helperText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default CustomInput;
