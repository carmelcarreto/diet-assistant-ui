import Container from '@mui/material/Container';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ContainerApp from './components/ContainerApp';

export default function App() {

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container maxWidth="xs">
            <ContainerApp />
        </Container>
      </LocalizationProvider>
    </>
  )
}




