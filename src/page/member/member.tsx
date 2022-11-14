import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import s from './s.module.scss'
import DeleteIcon from '@mui/icons-material/Delete'
import { memberApi } from '../../api/memberApi'
import { IMember, IMemberForm } from './types'
import { consignmentApi } from '../../api/consignmentApi'
import { IConsignment } from '../consignment/types'

export const MemberPage = () => {
  const { data, refetch } = useQuery({ queryKey: ['member'], queryFn: () => memberApi.getAll<IMember[]>() })
  const { data: consignment } = useQuery({ queryKey: ['consignment'], queryFn: () => consignmentApi.getAll<IConsignment[]>() })

  const { register, handleSubmit } = useForm<IMemberForm>()
  const onSubmit = async (data: IMemberForm) => {
    await memberApi.create(data)
    refetch()
  }

  const onDelete = async (id: string) => {
    await memberApi.delete(id)
    refetch()
  }

  return (
    <div className={s.root}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <TextField {...register('fullName')} label='fullName' variant='outlined' />
        <TextField {...register('address')} label='address' variant='outlined' />
        <FormControl fullWidth>
          <InputLabel id='select-label'>Consignment</InputLabel>

          {consignment && (
            <Select
              label='Consignment'
              id='select-label'
              MenuProps={{ disableScrollLock: true }}
              fullWidth
              defaultValue=''
              inputProps={register('consignment', {
                required: 'Please enter currency',
              })}
            >
              {consignment.map(item => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>

        <TextField {...register('job')} label='job' variant='outlined' />

        <TextField {...register('profession')} label='profession' variant='outlined' />
        <TextField {...register('birthday')} type={'date'} label='birthday' focused variant='outlined' />

        <Button type='submit' variant='outlined'>
          Create new Member
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>fullName</TableCell>
              <TableCell>address</TableCell>
              <TableCell>job</TableCell>
              <TableCell>profession</TableCell>
              <TableCell>consignment</TableCell>
              <TableCell>birthday</TableCell>
              <TableCell align='right'>delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map(member => (
                <TableRow key={member._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{member.fullName}</TableCell>
                  <TableCell>{member.address}</TableCell>
                  <TableCell>{member.job}</TableCell>
                  <TableCell>{member.profession}</TableCell>
                  <TableCell>{member.consignment.name}</TableCell>
                  <TableCell>{new Date(member.birthday).toUTCString()}</TableCell>
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
