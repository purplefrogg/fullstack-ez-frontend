import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'

import { Link, useMatch } from 'react-router-dom'
import { ListItemText } from '@mui/material'
import { FC } from 'react'

interface Props {
  link: string
  title: string
}

export const SidebarItem: FC<Props> = props => {
  const match = useMatch(props.link)

  return (
    <Link to={props.link} style={{ textDecoration: 'none' }}>
      <ListItem disablePadding>
        <ListItemButton selected={match?.pathname.slice(1) === props.link}>
          <ListItemText primary={props.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
