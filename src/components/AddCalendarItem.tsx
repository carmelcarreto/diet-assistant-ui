
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { 
        Box, 
        Button, 
        Dialog, 
        DialogActions, 
        DialogContent, 
        DialogTitle, 
        Stack } 
  from '@mui/material';

export default function AddCalendarItem() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    return(
      <>
        <Stack  
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={4}
        >
          <Button 
            onClick={handleOpen}
          >
            <Box sx={{ textAlign: "end"}}>
              <Fab  size="large" color="primary" aria-label="add" >
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
    </>
  );
}