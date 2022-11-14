import { TextField, Button, ButtonGroup } from '@mui/material'
import { FC, useState } from 'react'

import s from './s.module.scss'

export const ConsignmentSearch: FC<{ onReset: () => void; onSearch: (search: string) => void }> = props => {
  const [search, setSearch] = useState('')

  return (
    <div className={s.search}>
      <TextField value={search} onChange={e => setSearch(e.currentTarget.value)} label='Search' variant='outlined' />
      <ButtonGroup variant='contained' aria-label='outlined primary button group'>
        <Button
          onClick={() => {
            props.onSearch(search)
          }}
        >
          search
        </Button>
        <Button
          onClick={() => {
            setSearch('')
            props.onReset()
          }}
        >
          reset
        </Button>
      </ButtonGroup>
    </div>
  )
}
