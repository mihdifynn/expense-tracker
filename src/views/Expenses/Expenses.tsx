import { useData } from "@/lib/useData";
import { useMemo, Fragment } from "react";
import { formatDate } from "@/lib/functions";

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

  if (expenses.length === 0) return (
    <Typography
      align="center"
      sx={{ p: 4 }}
    >
      No Expenses yet
    </Typography>
  )

  return (
    <Box>
      <List>
      { sortedExpenses.map((exp, i) => {
        const showDate = i === 0 || exp.date !== sortedExpenses[i - 1].date;

        return (
          <Fragment key={exp.id}>
            { showDate && (
              <ListSubheader>
                { formatDate(exp.date) }
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