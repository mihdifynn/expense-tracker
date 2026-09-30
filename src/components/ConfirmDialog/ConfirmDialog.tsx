import { buttonSx as styles } from "@/lib/styles";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";



interface Props {
  open: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
  action: () => void | Promise<void>;
  actionLabel?: string;
  cancelLabel?: string;
}


export default function ConfirmDialog(props: Props) {

  const { action, message, title, onClose, open, actionLabel, cancelLabel } = props;


  const handleAction = () => {
    action();
    onClose();
  }

  return (
    <Dialog
      open={open}
      slotProps={{ paper: { sx: styles } }}
      onClose={onClose}
    >
      <DialogTitle>
        {title || 'Are you sure?'}
      </DialogTitle>

    { message && (
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
      ) }

      <DialogActions>
        <Button
          color="inherit"
          onClick={onClose}
          sx={styles}
        >
          {cancelLabel || 'Cancel'}
        </Button>

        <Button
          onClick={handleAction}
          sx={styles}
        >
          {actionLabel || 'Yes'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}