import { makeStyles, Theme } from '@material-ui/core/styles';
import { baseColors } from 'constants/colors';

export const additionalClassName = {
  borderRadius: '30px',
  width: '217px',
  background: 'linear-gradient(93.01deg, #54A9E2 0%, #70DBA3 100%)',
};

export const additionalClassNameSms = {
  fontFamily: 'SF Pro Display Regular',
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '100%',
  textTransform: 'uppercase',
  color: baseColors.brandBlue,
  margin: '0 auto',
  cursor: 'pointer',
};

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiDialog-paper': {
      width: 317,
      maxHeight: 450,
      borderRadius: 8,
      boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.08)',
      padding: 25,
    },
  },
  title: {
    fontFamily: 'PTSans-Regular',
    fontWeight: 400,
    fontSize: 20,
    lineHeight: '22.4px',
    marginBottom: 20,
    textAlign: 'start',
    width:'100%',
  },
  pageProgress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '300px',
    height: '200px',
  },
  inputDescription: {
    textAlign: 'center',
    fontSize: '12px',
    color: baseColors.primaryGrey,
    margin: '5px 0 10px 0',
  },
  phone: {
    fontFamily: 'PTSans-Bold',
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  requestErrors: {
    fontFamily: 'PTSans-Bold',
    fontSize: 14,
    marginBottom: 12,
    color: baseColors.error,
  },
  timer: {
    fontFamily: 'PTSans-Bold',
    fontSize: 14,
    marginBottom: 20,
    color: baseColors.primaryBlue,
  },
  input: {
    display: 'flex',
    columnGap: '10px',
    alignContent: 'center',
    justifyContent: 'space-around',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: `1px solid ${baseColors.secondaryGrey}`,
      },
    },
    '& .MuiInputBase-input': {
      fontSize: '16px',
      fontWeight: 'bold',
    },
  },
  filledInput: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: `1px solid ${baseColors.brandBlue}`,
      },
    },
    '& .MuiInputBase-input': {
      color: baseColors.brandBlue,
    },
  },
  filledInputError: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: `1px solid ${baseColors.fieldError}`,
        color: baseColors.fieldError,
      },
    },
    '& .MuiInputBase-input': {
      color: baseColors.fieldError,
    },
  },
  passwordInputImg: {
    display: 'flex',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));
