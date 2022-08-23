import { useState, ChangeEvent, useCallback } from "react";

const defaultErrorsMessages = {
  required: "Поле обязательно для заполнения !",
  badFormat: "Неверный формат поля !",
};

/**
 * Хук валидации полей формы
 **/
export interface IFieldRule {
  required?: boolean;
  pattern?: RegExp;
}

export interface IErrorMessage {
  required?: string;
  pattern?: string;
}

interface IHookProps {
  initialValues: { [key: string]: string };
  rules: { [key: string]: IFieldRule };
  errorsMessages?: { [key: string]: IErrorMessage };
}

export const useForm = ({
  initialValues,
  rules,
  errorsMessages = {},
}: IHookProps) => {
  const [values, setValues] =
    useState<{ [key: string]: string }>(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (fieldValues: { [key: string]: string } = {}) => {
    const fieldKey = Object.keys(fieldValues)?.length
      ? Object.keys(fieldValues)[0]
      : "";
    let currentErrors: { [key: string]: string } = { ...errors };

    //есть ли правила для текущего поля
    if (rules[fieldKey]) {
      //проверки на определенные типы правил

      //проверка на обязательность
      if (rules[fieldKey]?.required && !fieldValues[fieldKey]) {
        currentErrors[fieldKey] =
          errorsMessages[fieldKey]?.required || defaultErrorsMessages.required;
        setErrors({
          ...currentErrors,
        });
        return;
      } else delete currentErrors[fieldKey];

      //проверка на регулярку
      if (rules[fieldKey]?.pattern && fieldValues[fieldKey]) {
        if (rules[fieldKey]?.pattern?.test(fieldValues[fieldKey]))
          delete currentErrors[fieldKey];
        else
          currentErrors[fieldKey] =
            errorsMessages[fieldKey]?.pattern ||
            defaultErrorsMessages.badFormat;
      } //else delete currentErrors[fieldKey];
    }
    setErrors({
      ...currentErrors,
    });
  };

  const handleInputValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const formIsValid = (): boolean => !Boolean(Object.keys(errors)?.length);

  const clearFields = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const clearField = useCallback((fieldName: string) => {
    setValues({
      ...values,
      [fieldName]: '',
    });
    let currentErrors: { [key: string]: string } = { ...errors }; 
    delete currentErrors[fieldName];
    setErrors({
      ...currentErrors,
    });
  }, [errors, values]);

  return {
    values,
    handleInputValue,
    errors,
    formIsValid,
    clearFields,
    clearField
  };
};

export default useForm;
