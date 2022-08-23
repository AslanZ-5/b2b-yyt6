import { FC } from "react";
import Grid from "@material-ui/core/Grid";

import Checkbox from "components/ui/Checkbox";
import Input from "components/ui/Input";
import DatePicker from "components/ui/DatePicker";
import { masks } from "constants/masks";

import { IInitFields } from "../block/initData";
import { useStyles } from "../block/styles";
import { OperationType } from "../../types/OperationType";
import { useStyles as useLocalStyles } from "./styles";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

interface IProps {
  fields: IInitFields;
  setFields: (fields: IInitFields) => void;
  values: {
    [key: string]: string;
  };
  setValues: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  valuesErrors: {
    [key: string]: string;
  };
  operationType: OperationType
}

const Fields: FC<IProps> = ({
  fields,
  setFields,
  values,
  setValues,
  valuesErrors,
  operationType
}) => {
  const classes = useStyles();
  const localClasses = useLocalStyles();

  return (
    <div className={localClasses.container}>
      {operationType === "block" && <Grid container alignItems="center" justify="space-between" spacing={2}>
        <Grid item sm={6} xs={12}>
          <Checkbox
            value={fields.install.checked}
            setValue={(newValue) =>
              setFields({
                ...fields,
                install: { ...fields.install, checked: newValue },
              })
            }
            label={
              <span className={classes.checkBoxLabel}>
                Отложить блокировку до
              </span>
            }
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <DatePicker
            value={fields.install.value}
            setValue={(newValue) =>
              setFields({
                ...fields,
                install: { ...fields.install, value: newValue },
              })
            }
            readOnly={!fields.install.checked}
          />
        </Grid>
      </Grid>}
      <Grid container alignItems="flex-start" justify="space-between" spacing={2}>
        <Grid item sm={6} xs={12}>
          <Checkbox
            value={fields.remove.checked}
            setValue={(newValue) =>
              setFields({
                ...fields,
                remove: { ...fields.remove, checked: newValue },
              })
            }
            label={
              <span className={classes.checkBoxLabel}>
                Отложить разблокировку до
              </span>
            }
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <DatePicker
            value={fields.remove.value}
            setValue={(newValue) =>
              setFields({
                ...fields,
                remove: { ...fields.remove, value: newValue },
              })
            }
            readOnly={!fields.remove.checked}
            error={fields.remove.error}
            helperText={fields.remove.error ? fields.remove.helperText : ''}
            minDate={tomorrow}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="center" justify="space-between" spacing={2}>
        <Grid item sm={6} xs={12}>
          <Checkbox
            value={fields.info.checked}
            setValue={(newValue) =>
              setFields({
                ...fields,
                info: { ...fields.info, checked: newValue },
              })
            }
            label={
              <span className={classes.checkBoxLabel}>Проинформировать</span>
            }
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Input
            value={values.phone}
            setValue={setValues}
            name="phone"
            placeholder="Телефон"
            mask={masks.phone}
            readOnly={!fields.info.checked}
            {...(valuesErrors?.phone
              ? { error: true, helperText: valuesErrors.phone }
              : { error: false, helperText: "" })}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="center" justify="space-between" spacing={2}>
        <Grid item sm={6} xs={12}></Grid>
        <Grid item sm={6} xs={12}>
          <Input
            value={values.email}
            setValue={setValues}
            name="email"
            placeholder="Почта"
            readOnly={!fields.info.checked}
            {...(valuesErrors?.email
              ? { error: true, helperText: valuesErrors.email }
              : { error: false, helperText: "" })}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Fields;
