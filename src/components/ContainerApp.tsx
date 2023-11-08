import { useEffect, useRef, useState } from 'react';
import { Box, Stack, Container, Typography } from "@mui/material"
import { red } from "@mui/material/colors"

function App() {
  const appBarRef = useRef<HTMLDivElement>();
  const bottomBarRef = useRef<HTMLDivElement>();
  const [windowWidth, setWindowWidth] = useState(window.innerHeight);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    calculateContentHeight();
    
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const handleWindowResize = () => {
    setWindowWidth(window.innerHeight);
  };

  const calculateContentHeight = () => {
    const appBarHeight =
      appBarRef.current == null? 0
      : appBarRef.current.getBoundingClientRect().height;
    const bottomBarHeight =
      bottomBarRef.current == null? 0
      : bottomBarRef.current.getBoundingClientRect().height;
    setContentHeight(windowWidth - appBarHeight - bottomBarHeight - 16);
  };

  return (
    <>
      <Container>
        <Stack justifyContent="space-between">
          <Box ref={appBarRef}>
            <Stack direction="row" spacing={1} justifyContent="center" >
              <Box sx={{backgroundColor: 'primary.main', width: '100%', textTransform: 'uppercase', m:1}}>
                <Typography sx={{textAlign: 'center', m:1, color: 'white'}}>
                  Health Assistant
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Box height={`${contentHeight}px`} sx={{backgroundColor: red[50], overflowY: 'auto'}}>
            <Stack>
              <Box sx={{textAlign: 'justify', m:2}}>
                <Typography sx={{textAlign: 'center', m:1}}>No hay dietas registradas.</Typography>
              </Box>
            </Stack>
          </Box>
          <Box ref={bottomBarRef} display="block" alignItems="center">
            <Typography textAlign={'center'}>Todos los derechos reservados @2023</Typography>
          </Box>
        </Stack>
      </Container>
    </>
  )
}

export default App