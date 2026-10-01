import type { Account, Expense } from "@/lib/types";

import { addFormSx as styles } from "@/lib/styles";
import { useState } from "react";
import { useData } from "@/lib/useData";
import { isCashFlow } from "@/lib/functions";

import NumberTextField from "@/components/NumberTextField";

import Fab from "@mui/material/Fab";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";

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

      <ExpenseDialog
        open={openDialog === 0}
        onClose={() => setOpenDialog(null)}
      />

      <AccountDialog
        open={openDialog === 1}
        onClose={() => setOpenDialog(null)}
      />
    </>
  )
}



interface DialogProps {
  open: boolean;
  onClose: () => void;
}

type AccountForm = Omit<Account, 'id'>;

const initialAccount: AccountForm = {
  name: '',
  startBalance: 0
}


function AccountDialog(props: DialogProps) {

  const { open, onClose } = props;

  const { data, addAccount } = useData();
  const [form, setForm] = useState<AccountForm>(initialAccount);
  const nameExists = data.accounts.some(acc => acc.name === form.name);
  

  const handleSave = () => {
    if (nameExists) return;

    const newAccount: Account = {
      ...form,
      id: crypto.randomUUID()
    }

    addAccount(newAccount);
    handleClose();
  }

  const handleClose = () => {
    setForm(initialAccount);
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
          onChange={e => {
            setForm(prev => ({
              ...prev,
              name: e.target.value
            }));
          }}
          error={nameExists}
          helperText={nameExists && 'This name already exists'}
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
          disabled={form.name === '' || form.startBalance < 0 || nameExists}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}



type ExpenseForm = Omit<Expense, 'id'>;

const initialExpense: ExpenseForm = {
  accountId: '',
  amount: 0,
  description: '',
  date: new Date().toLocaleDateString('en-CA'),
  flow: 'out'
}


function ExpenseDialog(props: DialogProps) {

  const { open, onClose } = props;

  const { data, addExpense } = useData();
  const [form, setForm] = useState<ExpenseForm>(initialExpense);
  const [accountError, setAccountError] = useState(false);

  const handleClose = () => {
    setForm(initialExpense);
    onClose();
  }

  const handleSave = () => {
    if (!form.accountId) {
      setAccountError(true);
      return;
    }

    const newExpense: Expense = {
      ...form,
      id: crypto.randomUUID()
    };
    addExpense(newExpense);
    handleClose();
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
        Add Expense
      </DialogTitle>

      <DialogContent>
        <Stack
          direction="row"
          spacing={2}
        >
          <TextField
            margin="normal"
            variant="filled"
            label="Date"
            type="date"
            value={form.date}
            onChange={e => setForm(prev => ({
              ...prev,
              date: e.target.value
            }))}
            fullWidth
          />

          <TextField
            margin="normal"
            variant="filled"
            label="Flow"
            value={form.flow}
            onChange={e => setForm(prev => ({
              ...prev,
              flow: isCashFlow(e.target.value) ? e.target.value : 'out'
            }))}
            select
            fullWidth
          >
            <MenuItem value="in">
              In
            </MenuItem>

            <MenuItem value="out">
              Out
            </MenuItem>
          </TextField>
        </Stack>

        <TextField
          margin="normal"
          variant="filled"
          label="Account"
          value={form.accountId}
          onChange={e => setForm(prev => ({
            ...prev,
            accountId: e.target.value
          }))}
          error={accountError}
          helperText={accountError && 'Please select an account'}
          onFocus={() => setAccountError(false)}
          select
          fullWidth
        >
        { data.accounts.map(acc => (
          <MenuItem
            key={acc.id}
            value={acc.id}
          >
            {acc.name}
          </MenuItem>
        )) }
        </TextField>

        <TextField
          margin="normal"
          variant="filled"
          label="Description"
          value={form.description}
          onChange={e => setForm(prev => ({
            ...prev,
            description: e.target.value
          }))}
          fullWidth
        />

        <NumberTextField
          margin="normal"
          variant="filled"
          label="Amount"
          value={String(form.amount)}
          onChange={val => setForm(prev => ({
            ...prev,
            amount: Number(val)
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
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}