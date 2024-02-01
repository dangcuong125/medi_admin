import { Chip } from '@mui/material';

export function ActiveChip() {
  return (
    <>
      <Chip
        sx={{
          color: '#229A16',
          backgroundColor: '#E4F8DD',
          fontWeight: 'bold',
          borderRadius: '7px',
        }}
        label="Active"
      />
    </>
  );
}

export function BannedChip() {
  return (
    <>
      <Chip
        sx={{
          color: '#B72136',
          backgroundColor: '#FCDFDE',
          fontWeight: 'bold',
          borderRadius: '7px',
        }}
        label="Banned"
      />
    </>
  );
}
