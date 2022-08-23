import { FC, useState, useEffect } from "react";

import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Input from "components/ui/Input";
import Button from "components/ui/Button";
import InfoDialog from "components/ui/InfoDialog";

import { useCRUDRequest } from "hooks/useRequest";
import { editSim } from "api/sim-card";
import { useAppSelector } from "store";
import { masks } from "constants/masks";

import { useStyles } from "./styles";
import { formatPhone1 } from "helpers/formatPhone";

interface IProps{
  buttonBackHandler: () => void;
}

const Form: FC<IProps> = ({buttonBackHandler}) => {
  const classes = useStyles();

  const { list } = useAppSelector((state) => state.numbers);
  const selectedNumber = list?.filter((item) => item.checked)[0] || null;

  const [icc, setIcc] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const { loading, data, errors, callback } = useCRUDRequest({ api: editSim });

  const changeSimCard = async () => {
    await callback({ msisdn: selectedNumber?.msisdn?.toString() || "", icc });
    setOpenConfirmDialog(false);
  };

  const checkDisableButton = () => {
    return agreement && icc && icc.replace(/_/g, "").length >= 19 && !loading;
  };

  useEffect(() => {
    if (!errors?.message && data) {
      setOpenSuccessDialog(true);
    }
  }, [data, errors?.message]);

  useEffect(() => {
    if (errors?.message) {
      setOpenErrorDialog(true);
    }
  }, [data, errors?.message]);

  const successDialogButtonHandler = () => {
    setOpenSuccessDialog(false)
    buttonBackHandler();
  }

  return (
    <>
      <InfoDialog
        type="changeSimSuccess"
        show={openSuccessDialog}
        title="SIM-карта успешно изменена"
        handleClose={successDialogButtonHandler}
        downButton={{
          callback: successDialogButtonHandler,
          text: "Ок"
        }}
        upButton={{
          show: false,
        }}
      />
      <InfoDialog
        type="changeSimError"
        show={openErrorDialog}
        title={`Номер SIM-карты\nнедействителен или\nуже был использован`}
        handleClose={() => setOpenErrorDialog(false)}
        downButton={{
          text: "Ок",
          callback: () => setOpenErrorDialog(false),
        }}
        upButton={{
          show: false,
        }}
      />
      <InfoDialog
        show={openConfirmDialog}
        title={`Проверьте данные для\nзамены SIM-карты`}
        handleClose={() => setOpenConfirmDialog(false)}
        downButton={{
          text: "Отмена",
          callback: () => setOpenConfirmDialog(false),
        }}
        upButton={{
          text: "Подтвердить",
          callback: changeSimCard,
        }}
      >
        <Box width="100%" mb="20px" textAlign="center">
          <div className={classes.confirmDialogLabel}>Номер телефона:</div>
          <div className={classes.confirmDialogText}>{formatPhone1(selectedNumber?.msisdn?.toString() || '')}</div>
        </Box>
        <Box width="100%" textAlign="center">
          <div className={classes.confirmDialogLabel}>Номер SIM-карты</div>
          <div className={classes.confirmDialogText}>{`ICC ${icc}`}</div>
        </Box>
      </InfoDialog>
      <Input
        name="icc"
        value={icc}
        setValue={(e) => setIcc(e.target.value)}
        mask={masks.icc}
        startAdornment={
          <Box width="100%" paddingRight={1}>
            <img src="/images/icons/search.svg" alt="reset" />
          </Box>
        }
      />
      {errors?.message ? (
        <div className={classes.error}>
          <img src="/images/icons/info-grey.svg" alt="" />
          <span className={classes.errorText}>{errors?.message}</span>
        </div>
      ) : null}
      <Box width="100%" mt="30px" mb="30px">
        <FormControlLabel
          style={{ pointerEvents: "none" }}
          id="userServicesCheckbox"
          className={classes.checkbox}
          control={
            <Checkbox
              style={{ pointerEvents: "auto" }}
              checked={agreement}
              onChange={(e) => setAgreement(e.target.checked)}
              color="default"
            />
          }
          label={
            <span className={classes.checkBoxLabel}>
              Я ознакомлен с условиями проведения операции и принимаю{" "}
              <span className={classes.checkBoxLink}>
                правила использования системы
              </span>
            </span>
          }
        />
      </Box>
      <Button
        text="Заменить SIM-карту"
        onClick={() => setOpenConfirmDialog(true)}
        additionalClasses={{
          width: "200px",
        }}
        disabled={!checkDisableButton()}
      />
    </>
  );
};

export default Form;
