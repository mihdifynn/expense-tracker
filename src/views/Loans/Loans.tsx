import { useData } from "@/lib/useData";
import { Fragment } from "react";

import LoanCard from "./LoanCard";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";



export default function Loans() {

  const { data: { loans } } = useData();

  const iOweU = loans.filter(ln => ln.flow === 'in');
  const uOweMe = loans.filter(ln => ln.flow === 'out');

  if (loans.length === 0) return (
    <Typography
      align="center"
      sx={{ p: 4 }}
    >
      No Loans yet
    </Typography>
  )

  return (
    <Box sx={{ pb: 7 }}>
      <List>
      { iOweU.map((loan, i) => (
        <Fragment key={loan.id}>
        { i === 0 && (
          <ListSubheader>
            I O U
          </ListSubheader>
        ) }

          <LoanCard loan={loan} />
        </Fragment>
      )) }

      { uOweMe.map((loan, i) => (
        <Fragment key={loan.id}>
        { i === 0 && (
          <ListSubheader>
            U O Me
          </ListSubheader>
        ) }

          <LoanCard loan={loan} />
        </Fragment>
      )) }
      </List>
    </Box>
  )
}