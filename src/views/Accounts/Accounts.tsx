import { useData } from "@/lib/data";

import AccountCard from "./AccountCard";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";



export default function Accounts() {

  const { data: { accounts } } = useData();

  if (accounts.length === 0) return (
    <Typography
      align="center"
      sx={{ p: 4 }}
    >
      No Accounts yet
    </Typography>
  )

  return (
    <Stack
      sx={{ p: 2 }}
      spacing={2}
    >
    { accounts.map(acc => {
      return (
        <AccountCard
          key={acc.id}
          account={acc}
        />
      )
    }) }
    </Stack>
  )
}