import { useState } from "react";
import { appSx as styles } from "@/lib/styles";

import ThemeProvider from "@/components/ThemeProvider";
import Summary from "@/components/Summary";
import TabPanel from "@/components/TabPanel";
import AddForm from "@/components/AddForm";
import DataProvider from "@/lib/data";
import Accounts from "@/views/Accounts";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";


export default function App() {

  const [tabValue, setTabValue] = useState(0);

  return (
    <ThemeProvider>
      <DataProvider>
        <Summary />

        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
        >
          <Tab label="Expenses" />
          <Tab label="Accounts" />
          <Tab label="Loans" />
        </Tabs>

        <Box sx={styles.tabPanel}>
          <TabPanel value={tabValue} index={0}>
            Expenses
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Accounts />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            Loans
          </TabPanel>
        </Box>
        <AddForm tab={tabValue} />
      </DataProvider>
    </ThemeProvider>
  )
}