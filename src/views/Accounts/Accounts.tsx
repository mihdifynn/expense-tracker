import { useData } from "@/lib/useData";

import AccountCard from "./AccountCard";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";



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
    <Container>
      <Stack
        spacing={2}
        sx={{ py: 2 }}
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
    </Container>
  )
}