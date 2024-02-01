import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import useMessage from '../hooks/useMessage';
import { useSelector } from 'react-redux';
import { confirmPopupEventState, infoNewAdmin, setConfirmPopup } from '../admin.slice';
import { dispatch } from 'src/common/redux/store';
import { useCreateAdmin } from '../hooks/useCreateAdmin';
import en from '../../common/locales/en';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalConfirmCreate() {
  const confirmPopupCreate = useSelector(confirmPopupEventState);
  const valueInfoNewAdmin = useSelector(infoNewAdmin);
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate } = useCreateAdmin({
    onSuccess: () => {
      showSuccessSnackbar(en.showSuccessCreate);
    },
    onError: () => {
      showErrorSnackbar(en.showFailCreate);
    },
  });
  const handleCreateAdmin = () => {
    mutate(valueInfoNewAdmin);
    dispatch(setConfirmPopup(false));
  };
  const handleClose = () => {
    dispatch(setConfirmPopup(false));
  };

  return (
    <>
      <Dialog
        open={confirmPopupCreate}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{en.save_change}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {en.confirm_changes}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ width: 450 }}>
          <Button variant="contained" color="error" onClick={handleCreateAdmin}>
            {en.save}
          </Button>
          <Button variant="contained" color="inherit" onClick={handleClose}>
            {en.cancel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
