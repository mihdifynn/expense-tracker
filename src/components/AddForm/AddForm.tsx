import type { Account, Expense } from "@/lib/types";

import { addFormSx as styles } from "@/lib/styles";
import { useState, useEffect } from "react";
import { useData } from "@/lib/useData";
import { isCashFlow, capitalize } from "@/lib/functions";
import { CASH_FLOWS } from "@/lib/constants";

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
import Collapse from "@mui/material/Collapse";

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



interface ExpenseForm extends Pick<Expense, 'accountId' | 'amount' | 'date' | 'flow'> {
  description: string,
  toAccountId: string,

}

const getInitialExpense = (): ExpenseForm => ({
  accountId: '',
  toAccountId: '',
  amount: 0,
  description: '',
  date: new Date().toLocaleDateString('en-CA'),
  flow: 'out'
})

const toForm = (e: Expense): ExpenseForm => ({
  accountId: e.accountId,
  amount: e.amount,
  date: e.date,
  flow: e.flow,
  description: e.description,
  toAccountId: e.flow === 'transfer' ? e.toAccountId : ''
});

const toExpense = (form: ExpenseForm, id: string): Expense => {
  const { toAccountId, flow, ...base } = form;

  return flow === 'transfer'
    ? { ...base, id, flow, toAccountId }
    : { ...base, id, flow };
};


interface ExpenseDialogProps extends DialogProps {
  expense?: Expense
}


export function ExpenseDialog(props: ExpenseDialogProps) {

  const { open, onClose, expense } = props;

  const isEdit = expense !== undefined;

  const { data, addExpense, editExpense, deleteExpense } = useData();
  const [form, setForm] = useState<ExpenseForm>(getInitialExpense);
  const [error, setError] = useState<'account' | 'toAccount' | null>(null);

  const isTransfer = form.flow === 'transfer';

  const handleClose = () => {
    setForm(getInitialExpense());
    setError(null);
    onClose();
  }

  const handleDelete = () => {
    if (expense) deleteExpense(expense.id);
  }

  const handleSave = () => {
    if (!form.accountId) {
      setError('account');
      return;
    }
    if (isTransfer && (!form.toAccountId || form.accountId === form.toAccountId)) {
      setError('toAccount');
      return
    }

    const newExpense = toExpense(form, expense?.id ?? crypto.randomUUID())

    if (isEdit) editExpense(newExpense);
    else addExpense(newExpense);

    handleClose();
  }

  useEffect(() => {
    if (open) {
      setForm(expense ? toForm(expense) : getInitialExpense());
      setError(null)
    }
  }, [expense, open])

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
        {isEdit ? 'Edit' : 'Add'} Expense
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
          { CASH_FLOWS.map(flow => (
            <MenuItem
              key={flow}
              value={flow}
            >
              {capitalize(flow)}
            </MenuItem>
          )) }
          </TextField>
        </Stack>

        <TextField
          margin="normal"
          variant="filled"
          label={isTransfer ? 'From' : 'Account'}
          value={form.accountId}
          onChange={e => setForm(prev => ({
            ...prev,
            accountId: e.target.value
          }))}
          error={error === 'account'}
          helperText={error === 'account' && 'Please select an account'}
          onFocus={() => setError(null)}
          select
          fullWidth
        >
        { data.accounts.map(acc => (
          <MenuItem
            key={acc.id}
            value={acc.id}
            disabled={isTransfer && acc.id === form.toAccountId}
          >
            {acc.name}
          </MenuItem>
        )) }
        </TextField>

        <Collapse in={isTransfer}>
          <TextField
            margin="normal"
            variant="filled"
            label="To"
            value={form.toAccountId}
            onChange={e => setForm(prev => ({
              ...prev,
              toAccountId: e.target.value
            }))}
            error={error === 'toAccount'}
            helperText={error === 'toAccount' && 'Please select an account'}
            onFocus={() => setError(null)}
            select
            fullWidth
          >
          { data.accounts.map(acc => (
            <MenuItem
              key={acc.id}
              value={acc.id}
              disabled={acc.id === form.accountId}
            >
              {acc.name}
            </MenuItem>
          )) }
          </TextField>
        </Collapse>

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
        { isEdit && (
          <Button
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        ) }

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