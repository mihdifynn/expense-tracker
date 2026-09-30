import type { Account } from "@/lib/types";

import { addFormSx as styles } from "@/lib/styles";
import { useState } from "react";
import { useData } from "@/lib/data";

import NumberTextField from "@/components/NumberTextField";

import Fab from "@mui/material/Fab";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import AddIcon from "@mui/icons-material/Add";



interface Props {
  tab: number;
}


export default function AddForm(props: Props) {

  const { tab } = props;

  const [openDialog, setOpenDialog] = useState<number | null>(null);

  return (
    <>
      <Fab
        sx={styles.fab}
        color="secondary"
        onClick={() => setOpenDialog(tab)}
      >
        <AddIcon />
      </Fab>

      <AccountDialog
        open={openDialog === 1}
        onClose={() => setOpenDialog(null)}
      />
    </>
  )
}



interface AccountDialogProps {
  open: boolean;
  onClose: () => void;
}


function AccountDialog(props: AccountDialogProps) {

  const { open, onClose } = props;

  const { data, addAccount } = useData();
  const [form, setForm] = useState<Omit<Account, 'id'>>({
    name: '',
    startBalance: 0
  });

  const handleSave = () => {
    const newAccount: Account = {
      ...form,
      id: data.accounts.length,
    };
    addAccount(newAccount);
    handleClose();
  }

  const handleClose = () => {
    setForm({
      name: '',
      startBalance: 0
    });
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: { sx: styles.buttonSx }
      }}
      fullWidth
    >
      <DialogTitle>
        Add Account
      </DialogTitle>

      <DialogContent>
        <TextField
          margin="normal"
          variant="filled"
          label="Account Name"
          value={form.name}
          onChange={e => setForm(prev => ({
            ...prev,
            name: e.target.value
          }))}
          fullWidth
        />

        <NumberTextField
          margin="normal"
          variant="filled"
          label="Start Balance"
          value={String(form.startBalance)}
          onChange={val => setForm(prev => ({
            ...prev,
            startBalance: Number(val)
          }))}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClose}
          color="inherit"
        >
          Cancel
        </Button>

        <Button
          onClick={handleSave}
          disabled={form.name === '' || form.startBalance < 0}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}