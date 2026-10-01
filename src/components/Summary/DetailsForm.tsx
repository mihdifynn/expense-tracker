import { useState } from "react";
import { buttonSx as styles } from "@/lib/styles";
import { useData } from "@/lib/useData";

import NumberTextField from "@/components/NumberTextField";

import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import EditIcon from "@mui/icons-material/Edit";



export default function DetailsForm() {
  
  const { data, editDailyBudget, editSavings, editOthers } = useData();

  const initialForm = {
    budget: data.dailyBudget,
    savings: data.savings,
    others: data.others
  }
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm)
  
  const handleClose = () => {
    setForm(initialForm)
    setOpen(false);
  }

  const handleSave = () => {
    if (form.budget !== initialForm.budget) {
      editDailyBudget(form.budget)
    }
    if (form.savings !== initialForm.savings) {
      editSavings(form.savings)
    }
    if (form.others !== initialForm.others) {
      editOthers(form.others)
    }

    setOpen(false);
  }

  return (
    <>
      <IconButton
        size="small"
        sx={{ color: 'text.secondary' }}
        onClick={() => setOpen(true)}
      >
        <EditIcon fontSize="small" />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{ paper: { sx: styles } }}
        fullWidth
      >
        <DialogTitle>
          Details
        </DialogTitle>

        <DialogContent>
          <NumberTextField
            margin="normal"
            variant="filled"
            label="Daily Budget"
            value={String(form.budget)}
            onChange={val => setForm(prev => ({
              ...prev,
              budget: Number(val)
            }))}
            fullWidth
          />

          <NumberTextField
            margin="normal"
            variant="filled"
            label="Savings"
            value={String(form.savings)}
            onChange={val => setForm(prev => ({
              ...prev,
              savings: Number(val)
            }))}
            fullWidth
          />

          <NumberTextField
            margin="normal"
            variant="filled"
            label="Others"
            value={String(form.others)}
            onChange={val => setForm(prev => ({
              ...prev,
              others: Number(val)
            }))}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button
            color="inherit"
            onClick={handleClose}
            sx={styles}
          >
            Cancel
          </Button>

          <Button
            sx={styles}
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}