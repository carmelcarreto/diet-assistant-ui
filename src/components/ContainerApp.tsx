import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
  id: string;
  nameDiet: string;
}

export default function App() {
  const appBarRef = useRef<HTMLDivElement | null>(null);
  const bottomBarRef = useRef<HTMLDivElement | null>(null);

  // State for the modal
  const [modalOpen, setModalOpen] = useState(false);

  //State for the selected diet and its edit index
  const [selectedDiet, setSelectedDiet] = useState<boolean | null>(null);

  //State for the new diet
  const [newDiet, setNewDiet] = useState<Diet>({ id: '', nameDiet: ''});
  
  //State for the diet being edited
  const [editingDiet, setEditingDiet] = useState<Diet | null>(null);

  //State for diet list
  const [diets, setDiets] = useState<Diet[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  //State for options menu
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  
  const [value, setValue] = useState('plan');

  const [windowWidth, setWindowWidth] = useState(window.innerHeight);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  
  const classes = useStyles();

  const handleOpenModal = () => {
    console.log('Opening modal for diet:', editingDiet || newDiet);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setMenuAnchorEl(null);
  }
  
  const handleEditDiet = (dietToEdit: Diet) => {
    setEditingDiet({ ...dietToEdit });
    handleOpenModal();
  };

  const handleDeletDiet = (id: string) => {
    console.log('Deleting diet at index:', id);
    setDiets(prevDiets => prevDiets.filter(diet => diet.id !== id));
  };

  const handleAcceptDiet = () => {
    console.log('handleAcceptDiet called');
    console.log('editingDiet:', editingDiet);
    console.log('newDiet:', newDiet);

    if (editingIndex !== null) {
      setDiets((prevDiets) => {
        const updatedDiets = [...prevDiets];
    
        // Obtén el diet que se está editando
        const dietBeingEdited = updatedDiets[editingIndex];
        console.log('Lista de dietas antes de la búsqueda:', updatedDiets);
    
        // Asegúrate de que la dieta que se está editando no sea nula o indefinida
        if (editingDiet  && dietBeingEdited && dietBeingEdited.id === editingDiet.id) {
          // Actualiza el diet con la nueva información, manteniendo el 'id'
          updatedDiets[editingIndex] = {
            ...dietBeingEdited,
            nameDiet: editingDiet.nameDiet ?? '',
          };
        } else {
          console.error("La dieta que se está editando no se encuentra en la lista.");
        }
    
        return updatedDiets;
      });
      setEditingDiet(null);
    } else {
      const newId = uuidv4(); // Genera un nuevo ID único
      console.log('newDiet before reset:', newDiet);
      setDiets((prevDiets) => [...prevDiets, { ...newDiet, id: newId}]);
    }

    setNewDiet({id: '', nameDiet: ''});
    setSelectedDiet(null);
    handleClose();
  };

  const handleOptionsClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
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
                            <Typography variant="body1" style={{marginBottom: '4px', color: 'black'}}>
                              {diet.nameDiet}
                            </Typography>
                            <Typography variant='body2' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: '8px' }}>
                              <Link href="_blank" target="_blank" rel="noopener noreferrer" style={{ marginRight: '8px' }}>
                                Menús
                              </Link>
                              <Link href="_blank" target="_black" rel="noopener noreferrer">
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
                {editingDiet ? 'Edit Diet' : 'New Diet'}
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField 
                      id='nameDiet'
                      label="Name of Diet" 
                      fullWidth 
                      value={ editingDiet ? editingDiet.nameDiet : newDiet.nameDiet} 
                      onChange={(e) => { 
                        if(editingDiet) {
                          setEditingDiet({ ...editingDiet, nameDiet: e.target.value});
                        } else {
                          setNewDiet({ ...newDiet, nameDiet: e.target.value});
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAcceptDiet} color='primary'>
                  {editingDiet ? 'Save' : 'Create'}
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
