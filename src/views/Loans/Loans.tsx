import { useData } from "@/lib/useData";
import { Fragment } from "react";
import { listSubheaderSx as styles } from "@/lib/styles";
import { formatRupiah } from "@/lib/functions";

import LoanCard from "./LoanCard";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";



export default function Loans() {

  const { data: { loans } } = useData();

  const iOweU = loans.filter(ln => ln.flow === 'in');
  const iOweUTotal = iOweU.reduce((sum, loan) => loan.amount + sum, 0)
  const uOweMe = loans.filter(ln => ln.flow === 'out');
  const uOweMeTotal = uOweMe.reduce((sum, loan) => loan.amount + sum, 0)

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
          <ListSubheader sx={styles}>
            <span>I O U</span>

            <Typography
              component="span"
              variant="caption"
            >
              {formatRupiah(iOweUTotal)}
            </Typography>
          </ListSubheader>
        ) }

          <LoanCard loan={loan} />
        </Fragment>
      )) }

      { uOweMe.map((loan, i) => (
        <Fragment key={loan.id}>
        { i === 0 && (
          <ListSubheader sx={styles}>
            <span>U O Me</span>

            <Typography
              component="span"
              variant="caption"
            >
              {formatRupiah(uOweMeTotal)}
            </Typography>
          </ListSubheader>
        ) }

          <LoanCard loan={loan} />
        </Fragment>
      )) }
      </List>
    </Box>
  )
}