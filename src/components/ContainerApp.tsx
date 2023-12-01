import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Container, Typography, debounce,TextField, CardContent, Card, CardActions, IconButton, Grid, Menu, MenuItem, Link } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HouseIcon from '@mui/icons-material/House';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  text: {
    textAlign: 'center',
    fontSize: '1.0em',
  },
}));

interface Diet {
  nameDiet: string;
  desc: string;
  extraText1: string;
  extraText2: string;
}


export default function App() {
  const appBarRef = useRef<HTMLDivElement | null>(null);
  const bottomBarRef = useRef<HTMLDivElement | null>(null);
  const nameDietRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLInputElement | null>(null);

  const [windowWidth, setWindowWidth] = useState(window.innerHeight);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState('plan');
  
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  
  const classes = useStyles();
  
  const [selectedDiet, setSelectedDiet] = useState(true);
  const [newDiet, setNewDiet] = useState({ nameDiet: '', desc: '', extraText1: '' , extraText2: ''});
  const [diets, setDiets] = useState<Diet[]>([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  
  const handleOpenModal = () => {
    //console.log('open modal');
    setNewDiet({nameDiet: '', desc: '', extraText1: '', extraText2: ''});
    setModalOpen(true);
    //console.log("modalOpen state:", modalOpen);
  };

  const handleClose = () => {
    //console.log('closing modal');
    setModalOpen(false);
    setMenuAnchorEl(null);
  }
  
  const handleAcceptDiet = () => {
    console.log('accepting diet');
    const nameDietValue = document.getElementById('nameDiet')?.value ?? '';
    const descValue = document.getElementById('desc')?.value ?? '';

    if(editingIndex !== null) {
      const updatedDiets = [...diets];
      updatedDiets[editingIndex] = { ...newDiet};
      setDiets(updatedDiets);
      setEditingIndex(null);
    }else{
      setDiets([...diets, {...newDiet, extraText1: newDiet.extraText1, extraText2: newDiet.extraText2}]);
    }
    
    setNewDiet({nameDiet: '', desc: '', extraText1: '', extraText2: ''});
    setSelectedDiet(null);
    handleClose();
    
    //console.log(`Accepted Diet: ${nameDietValue}`);
  };

  const handleEditDiet = (index) => {
    const dietEdit = diets[index];
    setEditingIndex(index);
    setNewDiet({ nameDiet: dietEdit.nameDiet, desc: dietEdit.desc, extraText1: dietEdit.extraText1, extraText2: dietEdit.extraText2});
    handleOpenModal();

    //console.log(`Editar diet en el indice ${index}`);
  };

  const handleDeletDiet = (index) => {
    const updatedDiets = [...diets];
    updatedDiets.splice(index, 1);
    setDiets(updatedDiets);
    //console.log(`Borrar dieta en el indice ${index}`);
  };

  const handleOptionsClick = useCallback((event) => {
    //console.log('Open options menu for diet at index:', event);
    setMenuAnchorEl(event.currentTarget);
  },[setMenuAnchorEl]);
  
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
      <Container component="main" maxWidth="md">
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
          <Box>
            <Stack className={classes.root} direction='row-reverse'>
            <Box>
              {
                diets.length > 0 ? 
                (
                  <ul>
                    {diets.map((diet, index) => (
                        <Card key={index} sx={{ margin: 1, display: 'flex', flexDirection: 'row', alignItems: 'start'}}>
                          <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', flex: 1, marginRight: '16px'}}>
                            <Typography variant="body1" style={{marginBottom: '4px'}}>
                              {diet.nameDiet}
                            </Typography>
                            <Typography variant='body2' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '8px' }}>
                              <Link href={diet.extraText1} target="_blank" rel="noopener noreferrer" style={{ marginRight: '8px' }}>
                                Menús
                              </Link>
                              <Link href={diet.extraText2} target="_black" rel="noopener noreferrer">
                                Grupos de Alimentos
                              </Link>
                            </Typography>
                
                          </CardContent>
                          <CardActions>
                            <IconButton 
                              aria-label='options'
                              onClick={handleOptionsClick}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              anchorEl={menuAnchorEl}
                              open={Boolean(menuAnchorEl)}
                              onClose={() => setMenuAnchorEl(null)}
                            >
                              <MenuItem onClick={() => handleEditDiet(index)}>Editar</MenuItem>
                              <MenuItem onClick={() => handleDeletDiet(index)}>Eliminar</MenuItem>
                            </Menu>
                          </CardActions>
                        </Card>
                      ))}
                  </ul>
                ) : (
                  <Typography variant='h6' className={classes.text}>
                    No hay dietas registradas.
                  </Typography>
                )
              }
            </Box>
            </Stack>
            
            <Stack direction="row-reverse">
            <Button onClick={handleOpenModal}>
              <Box sx={{ textAlign: "center"}}>
                <Fab  size="medium" color="primary" aria-label="add" >
                <AddIcon />
                </Fab>
              </Box>
            </Button>
            </Stack>

            <Dialog 
              open={modalOpen} 
              onClose={handleClose}
            >
              <DialogTitle id="form-dialog-title">
                {selectedDiet ? 'Edit Diet' : 'New Diet'}
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField 
                      id='nameDiet'
                      label="Name of Diet" 
                      fullWidth 
                      value={newDiet.nameDiet} 
                      onChange={(e) => setNewDiet({...newDiet, nameDiet: e.target.value})}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleAcceptDiet} color='primary'>
                  {selectedDiet ? 'Create' : 'Save'}
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
