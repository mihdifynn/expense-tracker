import { createTheme, ThemeProvider } from "@mui/material/styles";
import { rootLayoutSx as styles } from "@/lib/styles";

import Stack from "@mui/material/Stack";



interface Props {
  children: React.ReactNode;
}


export default function Theme(props: Props) {

  const { children } = props;

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#4F46e5'
      },
      secondary: {
        main: '#00BFA5'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Stack sx={styles}>
        {children}
      </Stack>
    </ThemeProvider>
  )
  
}