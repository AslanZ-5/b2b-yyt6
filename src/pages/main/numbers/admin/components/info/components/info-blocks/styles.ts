import { makeStyles, Theme } from '@material-ui/core/styles';
import { baseColors } from 'constants/colors';

export const useStyles = makeStyles((theme: Theme) => ({
  infoBlockContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 8,
    boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.08)',
    backgroundColor: baseColors.primaryWhite,
    padding: '20px 24px',
    marginBottom: 20,
  },
  infoBlockLabel: {
    minWidth: '45%',
    paddingRight: 10,
    fontFamily: 'PTSans-Bold',
    fontSize: 16,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  infoBlockValue: {
    maxWidth: '180px',
    fontFamily: 'PTSans-Regular',
    fontSize: 16,
    wordBreak: 'break-word',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'pre-wrap',
  },
  infoBlockStatusValue: {
    fontFamily: 'PTSans-Regular',
    fontSize: 16,
    color: baseColors.primaryBlue,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  infoBlockRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
  },
}));
