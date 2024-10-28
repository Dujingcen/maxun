import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Paper, Button } from "@mui/material";
import { AutoAwesome, FormatListBulleted, VpnKey, Usb } from "@mui/icons-material";

interface MainMenuProps {
  value: string;
  handleChangeContent: (newValue: string) => void;
}

export const MainMenu = ({ value = 'recordings', handleChangeContent }: MainMenuProps) => {

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    handleChangeContent(newValue);
  };

  return (
    <Paper
      sx={{
        height: 'auto',
        width: '250px',
        backgroundColor: 'white',
        paddingTop: '2rem',
      }}
      variant="outlined"
      square
    >
      <Box sx={{
        width: '100%',
        paddingBottom: '22rem',
      }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          orientation="vertical"
          sx={{ alignItems: 'flex-start' }}
        >
          <Tab
            sx={{
              justifyContent: 'flex-start',
              textAlign: 'left',
              fontSize: 'medium',
            }}
            value="recordings"
            label="Robots"
            icon={<AutoAwesome />}
            iconPosition="start"
          />
          <Tab
            sx={{
              justifyContent: 'flex-start',
              textAlign: 'left',
              fontSize: 'medium',
            }}
            value="runs"
            label="Runs"
            icon={<FormatListBulleted />}
            iconPosition="start"
          />
          <Tab
            sx={{
              justifyContent: 'flex-start',
              textAlign: 'left',
              fontSize: 'medium',
            }}
            value="proxy"
            label="Proxy"
            icon={<Usb />}
            iconPosition="start"
          />
          <Tab
            sx={{
              justifyContent: 'flex-start',
              textAlign: 'left',
              fontSize: 'medium',
            }}
            value="apikey"
            label="API Key"
            icon={<VpnKey />}
            iconPosition="start"
          />
        </Tabs>
        <hr />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          <Button sx={{ justifyContent: 'flex-start' }}>Documentation</Button>
          <Button sx={{ justifyContent: 'flex-start' }}>Support</Button>
        </Box>
      </Box>
    </Paper>
  );
}
