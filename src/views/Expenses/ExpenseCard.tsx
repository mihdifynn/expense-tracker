import type { Expense } from '@/lib/types';

import { useData } from '@/lib/useData';
import { formatRupiah, isCashFlow } from '@/lib/functions';
import { useState } from 'react';
import { buttonSx as styles } from '@/lib/styles';

import NumberTextField from '@/components/NumberTextField';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';



interface Props {
  expense: Expense;
}


export default function ExpenseCard(props: Props) {

  const { expense } = props;

  const { accountNameMap, data, editExpense, deleteExpense } = useData();
  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState<Expense>(expense);

  const handleClose = () => {
    setForm(expense)
    setOpenForm(false);
  }

  const handleSave = () => {
    editExpense(form);
    setOpenForm(false);
  }

  const handleDelete = () => {
    deleteExpense(expense.id);
    setOpenForm(false);
  }

  return (
    <>
      <ListItemButton onClick={() => setOpenForm(true)}>
        <ListItemText
          primary={expense.description}
          secondary={accountNameMap.get(expense.accountId)}
        />
        
        <Typography
          variant="body2"
          color={expense.flow === 'in' ? 'success' : 'error'}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {expense.flow === 'in' ? '+' : '-'}{formatRupiah(expense.amount)}
        </Typography>
      </ListItemButton>

      <Dialog
        open={openForm}
        onClose={handleClose}
        slotProps={{
          paper: { sx: styles }
        }}
        fullWidth
      >
        <DialogTitle>
          Edit Expense
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
            onClick={handleDelete}
            color="error"
          >
            Delete
          </Button>

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
    </>
  )
}