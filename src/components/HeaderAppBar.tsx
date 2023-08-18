import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AddCalendarItem from './AddCalendarItem';

export default function HeaderAppBar() {
    return (
      <>
        <CssBaseline />
          <AppBar>
              <Typography variant="h4" component="div">
                <Box sx={{ textAlign: 'center', m: 2 }}>
                  Health Assistant
                </Box>
              </Typography>
          </AppBar>
        <Container>
          <Box sx={{ textAlign: 'center', my: 48, pb:7 , }}>
            {[...new Array(1)]
                .map(
                () => `Aun no ha elegido un plan nutricional.`,
                )
                .join('\n')}
          </Box>

          <AddCalendarItem />
        
        </Container>
      </>
    );
}