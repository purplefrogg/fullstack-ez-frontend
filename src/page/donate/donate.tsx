import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import s from './s.module.scss'
import DeleteIcon from '@mui/icons-material/Delete'
import { memberApi } from '../../api/memberApi'
import { IDonate, IDonateForm } from './types'
import { donateApi } from '../../api/donateApi'
import { IMember } from '../member/types'

export const DonatePage = () => {
  const { data, refetch } = useQuery({ queryKey: ['donate'], queryFn: () => donateApi.getAll<IDonate[]>() })
  const { data: member } = useQuery({ queryKey: ['member'], queryFn: () => memberApi.getAll<IMember[]>() })

  const { register, handleSubmit } = useForm<IDonateForm>()
  const onSubmit = async (data: IDonateForm) => {
    await donateApi.create(data)
    refetch()
  }

  const onDelete = async (id: string) => {
    await donateApi.delete(id)
    refetch()
  }

  return (
    <div className={s.root}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <TextField {...register('amount', { valueAsNumber: true })} label='amount' type={'number'} variant='outlined' />
        <FormControl fullWidth>
          <InputLabel>member</InputLabel>

          {member && (
            <Select
              label='member'
              MenuProps={{ disableScrollLock: true }}
              fullWidth
              defaultValue=''
              inputProps={register('member', {
                required: 'Please enter currency',
              })}
            >
              {member.map(item => (
                <MenuItem key={item._id} value={item._id}>
                  {item.fullName}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>

        <TextField {...register('date')} type={'date'} label='birthday' focused variant='outlined' />

        <Button type='submit' variant='outlined'>
          Create new Donate
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>fullName</TableCell>
              <TableCell>amount</TableCell>
              <TableCell>consignment</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align='right'>delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map(member => (
                <TableRow key={member._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{member.member.fullName}</TableCell>
                  <TableCell>{member.amount}</TableCell>
                  <TableCell>{member.consignment.name}</TableCell>
                  <TableCell>{new Date(member.date).toUTCString()}</TableCell>
                  <TableCell align='right' onClick={() => onDelete(member._id)}>
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
