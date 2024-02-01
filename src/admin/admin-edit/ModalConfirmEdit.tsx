import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { confirmPopupEventState, infoEditAdmin, setConfirmPopup } from '../admin.slice';
import { useEditAdmin } from '../hooks/useEditAdmin';
import useMessage from '../hooks/useMessage';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalConfirmEdit() {
  const confirmPopupEdit = useSelector(confirmPopupEventState);
  const dataEditAdmin = useSelector(infoEditAdmin)
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate, isSuccess } = useEditAdmin({
    onSuccess: () => {
      showSuccessSnackbar('Successfully Changed Information');
    },
    onError: () => {
      showErrorSnackbar('Change Information Failed');
    },
  });
  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.admin.list);
  }, [isSuccess]);

  const handleEditAdmin = () => {
    mutate({ data: dataEditAdmin })
    dispatch(setConfirmPopup(false))
  };
  const handleClose = () => {
    dispatch(setConfirmPopup(false));
  };


  return (
    <>
      <Dialog
        open={confirmPopupEdit}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Save Changes'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure want to save changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ width: 450 }}>
          <Button variant="contained" color="error" onClick={handleEditAdmin}>
            Save Changes
          </Button>
          <Button variant="contained" color="inherit" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
