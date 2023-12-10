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

const useStyles = makeStyles(() => ({
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

  //State for options menu
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const [selectedDietForMenu, setSelectedDietForMenu] = useState<Diet | null>(null);

  const [diets, setDiets] = useState<Diet[]>([]);
  const [newDiet, setNewDiet] = useState<Diet>({ id: '', nameDiet: '' });
  const [editingDiet, setEditingDiet] = useState<Diet | null>(null);
  const [creatingNewDiet, setCreatingNewDiet] = useState(false);

  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  
  const [value, setValue] = useState('plan');

  const [windowWidth, setWindowWidth] = useState(window.innerHeight);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  
  const classes = useStyles();

  const handleOpenModal = (dietToEdit: Diet | null= null) => {
    setModalOpen(true);
    setCreatingNewDiet(!dietToEdit);
    setEditingDiet(dietToEdit);
    setNewDiet({ id: dietToEdit?.id || uuidv4(), nameDiet: dietToEdit?.nameDiet || '' });
  };

  const handleAcceptDiet = () => {
    if (creatingNewDiet) {
      // Agregar nueva dieta a la lista
      setDiets((prevDiets) => [...prevDiets, newDiet]);
    } else if (editingDiet) {
      // Actualizar dieta existente en la lista
      setDiets((prevDiets) =>
        prevDiets.map((diet) =>
          diet.id === editingDiet.id ? { ...diet, nameDiet: editingDiet.nameDiet } : diet
        )
      );
    }
    // Limpiar estados
    setModalOpen(false);
    setMenuAnchorEl(null);
    setCreatingNewDiet(false);
    setEditingDiet(null);
    setNewDiet({ id: '', nameDiet: '' });
  };

  const handleClose = () => {
    setModalOpen(false);
    setMenuAnchorEl(null);
    setCreatingNewDiet(false);
    setEditingDiet(null);
    setNewDiet({ id: '', nameDiet: '' });
  }
  
  const handleOptionsClick = useCallback((event: React.MouseEvent<HTMLElement>, diet: Diet) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedDietForMenu(diet);
    setConfirmDeleteDialogOpen(false);
  },[setMenuAnchorEl, setSelectedDietForMenu, setConfirmDeleteDialogOpen]);

  const handleEditDiet = (diet: Diet | null) => {
    handleOpenModal(diet);
    setMenuAnchorEl(null);
  };

  const handleDeleteDiet = (dietId: string | undefined) => {
    if (dietId) {
      setDiets((prevDiets) => prevDiets.filter((diet) => diet.id !== dietId));
    }
    setMenuAnchorEl(null);
    setSelectedDietForMenu(null);
    setConfirmDeleteDialogOpen(false);
    handleClose();
  };
  
  useEffect(() => {
    calculateContentHeight();
    
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

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
                  <Grid>
                    {diets.map((diet) => (
                        <Card key={diet.id} sx={{ margin: 1, display: 'flex', flexDirection: 'row', alignItems: 'start'}}>
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
                          <IconButton aria-label="options" onClick={(e) => handleOptionsClick(e, diet)}>
                            <MoreVertIcon />
                          </IconButton>
                            <Menu
                              anchorEl={menuAnchorEl}
                              open={Boolean(menuAnchorEl)}
                              onClose={() => setMenuAnchorEl(null)}
                            >
                              <MenuItem onClick={() => handleEditDiet(selectedDietForMenu)}>Editar</MenuItem>
                              <MenuItem onClick={() => setConfirmDeleteDialogOpen(true)}>Eliminar</MenuItem>
                            </Menu>
                          </CardActions>
                        </Card>
                      ))}
                  </Grid>
                ) : (
                  <Typography variant='h6' className={classes.text}>
                    No hay dietas registradas.
                  </Typography>
                )
              }
            </Box>
            </Stack>
            
            <Stack direction="row-reverse">
            <Button onClick={() => handleOpenModal()}>
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
                {creatingNewDiet ? 'New Diet' : 'Edit Diet'}
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField 
                      id='nameDiet'
                      label="Name of Diet" 
                      fullWidth 
                      value={creatingNewDiet ? newDiet.nameDiet : editingDiet?.nameDiet || ''}
                      onChange={(e) => {
                        if (creatingNewDiet) {
                          setNewDiet({ ...newDiet, nameDiet: e.target.value });
                        } else if (editingDiet) {
                          setEditingDiet({ ...editingDiet, nameDiet: e.target.value });
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={() => handleAcceptDiet()} color="primary">
                {creatingNewDiet ? 'Crear' : 'Guardar'}
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
      <Dialog open={confirmDeleteDialogOpen} onClose={() => setConfirmDeleteDialogOpen(false)}>
        <DialogTitle>¿Quieres borrar "{selectedDietForMenu?.nameDiet}"?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteDialogOpen(false)} color="primary">
            No
          </Button>
          {selectedDietForMenu !== null && (
            <Button onClick={() => handleDeleteDiet(selectedDietForMenu?.id)} color="primary">
              Si
            </Button>
          )}
          
        </DialogActions>
      </Dialog>
    </>
  )
}
