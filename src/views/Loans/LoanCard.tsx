import type { Loan } from "@/lib/types";

import { formatRupiah } from "@/lib/functions";
import { useState } from "react";

import { LoanDialog } from "@/components/AddForm";

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';



interface Props {
  loan: Loan;
}


export default function LoanCard({ loan }: Props) {

  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <ListItemButton onClick={() => setOpenForm(true)}>
        <ListItemText
          primary={loan.name || 'No Name'}
          secondary={loan.notes}
        />

        <Typography
          variant="body2"
          color={loan.flow === 'in' ? 'error' : 'success'}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {formatRupiah(loan.amount)}
        </Typography>
      </ListItemButton>

      <LoanDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        loan={loan}
      />
    </>
  )
}