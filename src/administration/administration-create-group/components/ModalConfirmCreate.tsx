import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useSelector } from 'react-redux';
import useMessage from '../../../common/hooks/useMessage';
import { useCreateGroupPolicy } from '../hooks/useCreateGroupPolicy';
import { resetCreateGroupPolicy, selectConfirmPopup, selectInfoCreateGroup, setConfirmPopup } from '../reducer';
import en from 'src/common/locales/en';
import { useDispatch } from 'src/common/redux/store';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalConfirmCreate() {
    const valueNewGroupPolicy = useSelector(selectInfoCreateGroup);
    const isConfirmPopup = useSelector(selectConfirmPopup)
    const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
    const dispatch = useDispatch();
    const { mutate } = useCreateGroupPolicy({
        onSuccess: () => {
            showSuccessSnackbar(en.success_create_new_group_policy);
            dispatch(resetCreateGroupPolicy)
        },
        onError: () => {
            showErrorSnackbar(en.fail_create_new_group_policy);
        },
    });
    const handleCreateGroupPolicy = () => {
        mutate(valueNewGroupPolicy);
        dispatch(setConfirmPopup(false));
    };
    const handleClose = () => {
        dispatch(setConfirmPopup(false));
    };

    return (
        <>
            <Dialog
                open={isConfirmPopup}
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
                    <Button variant="contained" color="success" onClick={handleCreateGroupPolicy}>
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
