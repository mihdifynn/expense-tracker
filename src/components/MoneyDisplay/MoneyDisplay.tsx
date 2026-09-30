import { useReducer } from "react";
import { formatRupiah } from "@/lib/functions";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";



interface Props {
  amount: number;
}


export default function MoneyDisplay(props: Props) {

  const { amount } = props;

  const [show, toggleShow] = useReducer(x => !x, false);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h6">
      { show ? formatRupiah(amount) : 'Rp *******' }
      </Typography>

      <IconButton
        size="small"
        onClick={toggleShow}
        sx={{ color: 'text.secondary' }}
      >
      { show ? <VisibilityIcon /> : <VisibilityOffIcon /> }
      </IconButton>
    </Box>
  )
}