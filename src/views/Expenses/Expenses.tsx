import { useData } from "@/lib/useData";
import { useMemo, Fragment } from "react";
import { formatDate, formatRupiah } from "@/lib/functions";

import ExpenseCard from "./ExpenseCard";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";



export default function Expenses() {

  const { data: { expenses } } = useData();

  const sortedExpenses = useMemo(() => {
    return [...expenses].sort((a, b) => {
      return b.date.localeCompare(a.date)
    });
  }, [expenses]);

  const dailyTotals = useMemo(() => {
    const totals = new Map<string, number>();

    for (const exp of expenses) {
      if (exp.flow !== 'out') continue

      totals.set(exp.date, (totals.get(exp.date) ?? 0) + exp.amount)
    }

    return totals
  }, [expenses])

  if (expenses.length === 0) return (
    <Typography
      align="center"
      sx={{ p: 4 }}
    >
      No Expenses yet
    </Typography>
  )

  return (
    <Box sx={{ pb: 7 }}>
      <List>
      { sortedExpenses.map((exp, i) => {
        const showDate = i === 0 || exp.date !== sortedExpenses[i - 1].date;

        return (
          <Fragment key={exp.id}>
            { showDate && (
              <ListSubheader
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>
                  { formatDate(exp.date) }
                </span>

                <Typography
                  component="span"
                  variant="caption"
                >
                  -{ formatRupiah(dailyTotals.get(exp.date) ?? 0) }
                </Typography>
              </ListSubheader>
            ) }

            <ExpenseCard expense={exp} />
          </Fragment>
        )
      }) }
      </List>
    </Box>
  )
}