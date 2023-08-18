import Container from '@mui/material/Container';
import HeaderAppBar from './components/HeaderAppBar';
import LabelBottomNavigation from './components/LabelBottomNavigation';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export default function App() {

  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="xs">
          <HeaderAppBar />
          <LabelBottomNavigation />
      </Container>
      </LocalizationProvider>
      
    </>
  )
}




