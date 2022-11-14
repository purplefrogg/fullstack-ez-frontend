import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { observer } from 'mobx-react-lite'
import { state } from '../../state/state'
import { useLocation } from 'react-router-dom'

export const ButtonAppBar = observer(() => {
  let location = useLocation()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton onClick={() => state.toggleSidebar()} size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {location.pathname.split('/')[1]}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
})
