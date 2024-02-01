import { Box, Button, Modal, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
  contentConfirmBtn: string;
  bgColorConfirmBtn: string;
}

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderColor: 'common.white',
  p: 4,
};
export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  bgColorConfirmBtn,
  contentConfirmBtn,
  title,
  content,
}: ConfirmModalProps) {
  const { t } = useTranslation();
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiBox-root': {
          width: '499.07px',
          height: '195px',
          borderRadius: '19.8305px',
        },
      }}
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          sx={{ fontWeight: 700, fontSize: '19.83px', color: 'common.black' }}
          component="h2"
        >
          {title}
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{
            mt: 2,
            fontSize: '15.42px',
            fontWeight: '400',
          }}
        >
          {content}
        </Typography>
        <Box sx={{ display: 'flex', marginTop: '30px' }}>
          <Button
            onClick={onConfirm}
            variant="contained"
            sx={{
              position: 'absolute',
              width: '87.03px',
              backgroundColor: bgColorConfirmBtn,
              height: '40.76px',
              color: 'common.white',
              right: '127.8px',
              marginLeft: '282px',
              '&:hover': {
                backgroundColor: bgColorConfirmBtn,
              },
            }}
          >
            {contentConfirmBtn}
          </Button>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              position: 'absolute',
              width: '87.03px',
              right: '20.22px',
              height: '40.76px',
              color: 'common.black',
              borderColor: 'rgba(0, 0, 0, 0.25)',
              marginLeft: '282px',
              '&:hover': {
                borderColor: 'rgba(0, 0, 0, 0.25)',
              },
            }}
          >
            {t('cancel')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
