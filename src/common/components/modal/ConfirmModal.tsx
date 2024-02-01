import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from '@mui/material';

export const ConfirmModal = ({
  open,
  handleClose,
  handleOnAgree,
  type,
  colorType,
}: {
  open: boolean;
  handleClose: () => void;
  handleOnAgree:() => void;
  type:string,
  colorType:boolean,
}) => {
  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{
          sx: {
            backgroundColor: 'black!important',
            opacity: '0.2!important',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure to ${type}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Thao tác này sẽ không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit" variant="contained">Cancel</Button>
          <Button onClick={()=>{handleClose();handleOnAgree();}}   color={colorType ? "success" :"error"} autoFocus variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};