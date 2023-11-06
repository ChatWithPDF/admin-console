import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { RemoveRedEye } from '@mui/icons-material';

const ViewFeedback = ({ feedback }: { feedback: any }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color={feedback ? "success" : "error"} onClick={handleClickOpen}>
        <RemoveRedEye />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>View Feedback</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Quantitative Feedback"
            type="number"
            value={feedback?.rating || 0}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Qualitative Feedback"
            value={feedback?.review || ''}
            InputProps={{ readOnly: true }}
            fullWidth
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewFeedback;
