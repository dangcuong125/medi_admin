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
import { useDeleteAdmin } from '../hooks/useDeleteAdmin';
import { useSelector } from 'react-redux';
import { confirmPopupEventState, selectIdsAdminState, setConfirmPopup } from '../admin.slice';
import { dispatch } from 'src/common/redux/store';
import en from '../../common/locales/en';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalConfirmDelete() {
  const confirmPopup = useSelector(confirmPopupEventState);
  const selectIdsDelete = useSelector(selectIdsAdminState)
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const mutationDelete = useDeleteAdmin({
    onSuccess: () => {
      showSuccessSnackbar(en.showSuccessDelete);
    },
    onError: () => {
      showErrorSnackbar(en.showFailDelete);
    },
  });   
  const handleDeleteAdmin = () => {
    for (let i = 0; i<selectIdsDelete.length; i++) {
        mutationDelete.mutate(selectIdsDelete[i])
    }
    dispatch(setConfirmPopup(false))
  };
  const handleClose = () => {
    dispatch(setConfirmPopup(false));
  };

  return (
    <>
      <Dialog
        open={confirmPopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Delete'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {en.confirm_delete}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ width: 450 }}>
          <Button variant="contained" color="error" onClick={handleDeleteAdmin}>
            {en.delete}
          </Button>
          <Button variant="contained" color="inherit" onClick={handleClose}>
           `{en.cancel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
