import { Outlet } from 'react-router-dom'
import { ButtonAppBar } from '../appbar/appbar'
import { Sidebar } from '../sidebar/sidebar'
import s from './s.module.scss'

export const Layout = () => {
  return (
    <div className={s.root}>
      <ButtonAppBar />
      <div className={s.body}>
        <div className={s.sidebar}>
          <Sidebar />
        </div>
        <div className={s.page}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
