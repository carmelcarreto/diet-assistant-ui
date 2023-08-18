import { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import HouseIcon from '@mui/icons-material/House';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';

export default function LabelBottomNavigation() {
  const [value, setValue] = useState('plan');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (

    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
    >
      <Box sx={{ pb: 7 }} >
        <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
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
  );
}