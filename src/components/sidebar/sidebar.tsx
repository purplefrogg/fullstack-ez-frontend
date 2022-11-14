import Box from '@mui/material/Box'
import List from '@mui/material/List'
import { observable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { state } from '../../state/state'

import { SidebarItem } from './sidebarItem'

import s from './s.module.scss'

export const Sidebar = observer(() => {
  return (
    <div className={s.root + ' ' + (state.sidebarOpened && s.show)}>
      <Box sx={{ width: '100%', maxWidth: 360 }}>
        <nav aria-label='main mailbox folders'>
          <List>
            <SidebarItem {...{ link: 'consignment', title: 'consignment' }} />
            <SidebarItem {...{ link: 'member', title: 'member' }} />
            <SidebarItem {...{ link: 'donate', title: 'donate' }} />
            <SidebarItem {...{ link: 'property', title: 'property' }} />
          </List>
        </nav>
      </Box>
    </div>
  )
})
