import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import User from '../../types/User/User';

const Header = ({user} : {user: User | null}) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" enableColorOnDark>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Todo app
            </Typography>
            <Typography className='flex flex-col'>
              <span>{user?.name}</span>
              <span>{user?.email}</span>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    )
}

export default Header