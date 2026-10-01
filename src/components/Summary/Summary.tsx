import { summarySx as styles } from "@/lib/styles";
import { useData } from "@/lib/useData";
import { useMemo, useReducer } from "react";
import { formatRupiah } from "@/lib/functions";

import MoneyDisplay from "@/components/MoneyDisplay";
import DetailsForm from "./DetailsForm";

import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

import PaidIcon from "@mui/icons-material/Paid";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"



export default function Summary() {

  const { data } = useData();

  const [openDetails, toggleDetails] = useReducer(x => !x, false);

  const totalBalance = useMemo(() => {
    const startBalance = data.accounts.reduce((sum, acc) => sum + acc.startBalance, 0);

    const cashFlow = data.expenses.reduce((flow, exp) => {
      return exp.flow === 'in' ? flow + exp.amount : flow - exp.amount
    }, 0)
    return startBalance + cashFlow;
  }, [data.accounts, data.expenses])

  const budget = useMemo(() => {
    const now = new Date();
    return data.dailyBudget * (new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() - now.getDate() + 1);
  }, [data.dailyBudget])

  return (
    <Container>
      <Card sx={styles.parent}>
        <CardHeader
          title="Total"
          avatar={<PaidIcon color="primary" />}
          action={(
            <>
              <DetailsForm />

              <IconButton
                size="small"
                sx={{ color: 'text.secondary' }}
                onClick={toggleDetails}
              >
              { openDetails ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> }
              </IconButton>
            </>
          )}
        />

        <CardContent>
          <MoneyDisplay amount={totalBalance} />

          <Collapse in={openDetails}>
            <Typography variant="body2" color="text.secondary">
              Budget: {formatRupiah(budget)}<br />
              Savings: {formatRupiah(data.savings)}<br />
              Others: {formatRupiah(data.others)}<br />
              Extra: {formatRupiah(totalBalance - budget - data.savings - data.others)}
            </Typography>
          </Collapse>
        </CardContent>
      </Card>
    </Container>
  )
}