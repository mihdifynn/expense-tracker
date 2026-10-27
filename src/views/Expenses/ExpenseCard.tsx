import type { Expense } from '@/lib/types';

import { useData } from '@/lib/useData';
import { formatRupiah } from '@/lib/functions';
import { useState } from 'react';

import { ExpenseDialog } from '@/components/AddForm';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';



interface Props {
  expense: Expense;
}


export default function ExpenseCard(props: Props) {

  const { expense } = props;

  const { accountNameMap } = useData();
  const [openForm, setOpenForm] = useState(false);

  const isTransfer = expense.flow === 'transfer';
  const flowColor = {
    in: 'success',
    out: 'error',
    transfer: 'info'
  } as const;

  return (
    <>
      <ListItemButton onClick={() => setOpenForm(true)}>
        <ListItemText
          primary={expense.description || (isTransfer && 'Transfer')}
          secondary={
            isTransfer
            ? `${accountNameMap.get(expense.accountId)} → ${accountNameMap.get(expense.toAccountId)}`
            : accountNameMap.get(expense.accountId)
          }
        />
        
        <Typography
          variant="body2"
          color={flowColor[expense.flow]}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {expense.flow === 'in' ? '+' : expense.flow === 'out' && '-'}{formatRupiah(expense.amount)}
        </Typography>
      </ListItemButton>

      <ExpenseDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        expense={expense}
      />
    </>
  )
}