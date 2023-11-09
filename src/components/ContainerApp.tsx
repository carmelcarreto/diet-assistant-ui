import { useEffect, useRef, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Container, Typography, debounce } from "@mui/material"
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HouseIcon from '@mui/icons-material/House';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import InventoryIcon from '@mui/icons-material/Inventory';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { red } from "@mui/material/colors"


function App() {
  const appBarRef = useRef<HTMLDivElement | null>(null);
  const bottomBarRef = useRef<HTMLDivElement | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerHeight);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const [value, setValue] = useState('plan');
  
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    calculateContentHeight();
    
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  },[]);

  const handleWindowResize = debounce(() => {
    setWindowWidth(window.innerHeight);
  },300);

  const calculateContentHeight = () => {
    const SPACING = 16;
    const appBarHeight =
      appBarRef.current == null? 0
      : appBarRef.current.getBoundingClientRect().height;
    const bottomBarHeight =
      bottomBarRef.current == null? 0
      : bottomBarRef.current.getBoundingClientRect().height;
    setContentHeight(windowWidth - appBarHeight - bottomBarHeight - SPACING);
  };

  return (
    <>
      <Container>
        <Stack justifyContent="space-between">
          <Box ref={appBarRef} sx={{border: 1}}>
            <Stack direction="row" spacing={1} justifyContent="center" >
              <Box sx={{backgroundColor: 'primary.main', width: '100%', textTransform: 'uppercase', m:1}}>
                <Typography variant='h4' component='header' sx={{textAlign: 'center', m: 2, color: 'white'}}>
                  Health Assistant
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Box height={`${contentHeight}px`} sx={{backgroundColor: red[50], overflowY: 'auto'}}>
            <Stack direction='row-reverse'>
              <Box 
                height={`${contentHeight}px`} 
                sx={{ backgroundColor: red[50], 
                overflowY: 'auto', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center'}}
              >
                <Typography>
                  No hay dietas registradas.
                </Typography>
              </Box>
            </Stack>
            
            <Stack  
              direction="row-reverse"
            >
            <Button onClick={handleOpen}>
              <Box sx={{ textAlign: "center"}}>
                <Fab  size="medium" color="primary" aria-label="add" >
                  <AddIcon />
                </Fab>
              </Box>
            </Button>
            </Stack>

            <Dialog 
              open={open} 
              onClose={handleClose}
            >
              <DialogTitle id="form-dialog-title">Calendar</DialogTitle>
                <DialogContent>
                  <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar />
                    </LocalizationProvider>
                  </Box>
                </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleClose}>
                  Aceptar
                </Button>
              </DialogActions>
            </Dialog>

            <Stack alignSelf='center'>
              <Box alignSelf='auto' sx={{ position: 'revert', bottom: 0}}>
                <BottomNavigation
                  showLabels 
                  value={value} 
                  onChange={handleChange}
                >
                  <BottomNavigationAction
                    label="Plan"
                    value="plan"
                    icon={<HouseIcon />}
                  />
                  <BottomNavigationAction
                    label="Compras"
                    value="compras"
                    icon={<LocalGroceryStoreIcon />}
                  />
                  <BottomNavigationAction
                    label="Dietas"
                    value="dietas"
                    icon={<MonitorWeightIcon />}
                  />
                  <BottomNavigationAction
                    label="Despensa"
                    value="despensa"
                    icon={<InventoryIcon />}
                  />
                </BottomNavigation>
              </Box>
            </Stack>
          </Box>
          <Box sx={{border: 1}} ref={bottomBarRef} display="block" alignItems="center">
            <Typography textAlign={'center'}>Todos los derechos reservados @2023</Typography>
          </Box>
        </Stack>
      </Container>
    </>
  )
}

export default App