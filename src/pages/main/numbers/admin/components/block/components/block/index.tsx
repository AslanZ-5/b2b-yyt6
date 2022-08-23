import { FC, useState, useEffect, useCallback } from "react";
import format from "date-fns/format";
import isAfter from "date-fns/isAfter";
import isEqual from 'date-fns/isEqual'

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Button from "components/ui/Button";
import Checkbox from "components/ui/Checkbox";
import InfoDialog from "components/ui/InfoDialog";
import PageProgress from "components/ui/PageProgress";

import useForm from "hooks/useForm";
import { useAppSelector } from "store";
import { useCRUDRequest } from "hooks/useRequest";
import { blockNumber } from "api/numbers";

import Fields from "../fields";
import Info from "../info";
import Warning from "../warning";
import { initFields, getFormInitData } from "./initData";
import { OperationType } from "../../types/OperationType";
import { useStyles } from "./styles";


interface IProps{
  operationType: OperationType;
  successRedirect: () => void;
}

const Block: FC<IProps> = ({operationType, successRedirect}) => {
  const classes = useStyles();
  const { user } = useAppSelector((state) => state.user);
  const { list } = useAppSelector((state) => state.numbers);
  const [agreement, setAgreement] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [fields, setFields] = useState(initFields);
  const {
    values,
    handleInputValue: setValues,
    errors,
  } = useForm(getFormInitData(user));
  const {loading, data: responseData, errors: responseErrors, callback} = useCRUDRequest({api: blockNumber})
  const selectedNumbers = list?.filter((item) => item.checked)?.map(item => item.msisdn) || [];


  const handleSubmit = async() => {
    let data: {
      operationType: OperationType;
      data: {
        inform: boolean;
        msisdn: string[];
        email: string;
        phone: string;
        blockDate?: string;
        unblockDate: string;
      };
    } = {
      operationType,
      data: {
        inform: fields.info.checked,
        msisdn: selectedNumbers?.map(item => item.toString()) || [],
        email: fields.info.checked ? values.email : '',
        phone: fields.info.checked ? (values?.phone?.match(/\d+/g)?.join('') || '') : '',
        unblockDate: fields.remove.checked ? fields.remove.value ? format(fields.remove.value, "yyyy-MM-dd 00:00:00") : '' : ''
      }
    }
    if(operationType === "block") data = {...data, data: {...data.data, blockDate: fields.install.checked ? fields.install.value ? format(fields.install.value, "yyyy-MM-dd 00:00:00") : '' : ''}};
    await callback(data)
  }

  const checkDates = useCallback(() => {
    return Boolean(fields.install.checked && 
      fields.remove.checked && 
      fields.install.value && 
      fields.remove.value &&
      (isAfter(fields.install.value, fields.remove.value) || isEqual(fields.install.value, fields.remove.value)))
  }, [fields.install.checked, fields.install.value, fields.remove.checked, fields.remove.value]);

  useEffect(() => {
    if (!responseErrors?.message && responseData) {
      setOpenSuccessDialog(true);
    }
  }, [responseData, responseErrors?.message]);

  useEffect(() => {
    if (responseErrors?.message) {
      setOpenErrorDialog(true);
    }
  }, [responseData, responseErrors?.message]);

  useEffect(() => {
    if(checkDates()){
      setFields(prev => ({
        ...prev,
        remove: {
          ...prev.remove,
          error: true
        }
      }))
    }else{
      setFields(prev => ({
        ...prev,
        remove: {
          ...prev.remove,
          error: false
        }
      }))
    }
  }, [checkDates])

  if(loading) return <PageProgress/>

  return (
    <>
      <InfoDialog
        type="success"
        show={openSuccessDialog}
        title="Операция успешно выполнена"
        handleClose={() => {
          setOpenSuccessDialog(false)
          successRedirect()
        }}
        downButton={{
          callback: () => {
            setOpenSuccessDialog(false)
            successRedirect()
          },
          text: "Ок"
        }}
        upButton={{
          show: false,
        }}
      />
      <InfoDialog
        type="error"
        show={openErrorDialog}
        title="Во время операции произошла ошибка"
        description="Попробуйте позже."
        handleClose={() => setOpenErrorDialog(false)}
        downButton={{
          callback: () => setOpenErrorDialog(false),
        }}
        upButton={{
          show: false,
        }}
      />
      <Box width="100%" mt={2}>
        <Grid
          container
          alignItems="flex-start"
          justify="space-between"
          spacing={2}
        >
          <Grid item xs={12} sm={4}>
            <Info />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Fields
              fields={fields}
              setFields={setFields}
              values={values}
              setValues={setValues}
              valuesErrors={errors}
              operationType={operationType}
            />
          </Grid>
        </Grid>
      </Box>
      <Box width="100%" mt="30px" mb="20px">
        <Warning />
      </Box>
      <Box width="100%" mb="18px">
        <Checkbox
          value={agreement}
          setValue={setAgreement}
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
        text={operationType === 'block' ? "Установить блокировку" : "Снять блокировку"}
        onClick={handleSubmit}
        additionalClasses={{
          width: "200px",
        }}
        disabled={!agreement || checkDates()}
      />
      <Box width="100%" pb="25px"></Box>
    </>
  );
};

export default Block;
