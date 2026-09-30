import type { Account } from "@/lib/types";

import { buttonSx as styles } from "@/lib/styles";
import { useState } from "react";
import { useData } from "@/lib/data";

import MoneyDisplay from "@/components/MoneyDisplay";
import ConfirmDialog from "@/components/ConfirmDialog";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import PaymentIcon from "@mui/icons-material/Payment";
import MoreVertIcon from "@mui/icons-material/MoreVert";




interface Props {
  account: Account;
}


export default function AccountCard(props: Props) {

  const { account } = props;

  const { data } = useData();

  return (
    <Card sx={styles}>
      <CardHeader
        avatar={<PaymentIcon color="secondary" />}
        title={account.name}
        action={(
          <Actions
            id={account.id}
            name={account.name}
          />
        )}
      />

      <CardContent>
        <MoneyDisplay amount={account.startBalance} />
      </CardContent>
    </Card>
  )
}



interface ActionsProps {
  id: number;
  name: string;
}


function Actions(props: ActionsProps) {

  const { id, name } = props;

  const { editAccountName, deleteAccount, data } = useData();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openDialog, setOpenDialog] = useState<'edit' | 'delete' | null>(null);
  const [formName, setFormName] = useState(name);
  const [nameError, setNameError] = useState(false);

  const handleCloseMenu = () => setAnchorEl(null);

  const handleCloseDialog = () => {
    if (openDialog === 'edit') {
      setFormName(name);
    }
    setOpenDialog(null)
  };

  const handleSaveAccountName = () => {
    const newName = formName.trim();

    if (newName === name) {
      handleCloseDialog();
      return
    }

    const nameExists = Boolean(data.accounts.find(acc => acc.name === newName));
    if (nameExists) {
      setNameError(true);
      return
    }

    editAccountName(id, newName)
  }

  return (
    <>
      <IconButton
        size="small"
        sx={{ color: 'text.secondary' }}
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom'
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
        slotProps={{ paper: { sx: styles } }}
      >
        <MenuItem onClick={() => setOpenDialog('edit')}>
          Edit
        </MenuItem>

        <MenuItem onClick={() => setOpenDialog('delete')}>
          Delete
        </MenuItem>
      </Menu>

      <ConfirmDialog
        open={openDialog === 'delete'}
        onClose={handleCloseDialog}
        action={() => deleteAccount(id)}
      />

      <Dialog
        open={openDialog === 'edit'}
        onClose={handleCloseDialog}
        slotProps={{ paper: { sx: styles } }}
        fullWidth
      >
        <DialogTitle>
          Edit Account Name
        </DialogTitle>

        <DialogContent>
          <TextField
            margin="normal"
            variant="filled"
            value={formName}
            onChange={e => {
              if (nameError) setNameError(false);
              setFormName(e.target.value)
            }}
            error={nameError}
            helperText={nameError && 'This name already exists'}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button
            color="inherit"
            onClick={handleCloseDialog}
          >
            Cancel
          </Button>

          <Button
            disabled={!formName.trim()}
            onClick={handleSaveAccountName}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}