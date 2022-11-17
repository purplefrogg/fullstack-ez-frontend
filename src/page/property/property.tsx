import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField, Button, ToggleButtonGroup, ToggleButton } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import s from './s.module.scss'
import DeleteIcon from '@mui/icons-material/Delete'
import { IProperty, IPropertyForm } from './types'
import { propertyApi } from '../../api/propertyApi'

export const PropertyPage = () => {
  const { data, refetch } = useQuery({ queryKey: ['property'], queryFn: () => propertyApi.getAll<IProperty[]>() })

  const { register, handleSubmit, unregister, control, watch } = useForm<IPropertyForm>({ defaultValues: { type: { __type: 'newspaper' } } })
  const currentType = watch('type.__type')

  const onSubmit = async (data: IPropertyForm) => {
    await propertyApi.create(data)
    refetch()
  }

  const onDelete = async (id: string) => {
    await propertyApi.delete(id)
    refetch()
  }
  return (
    <div className={s.root}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <TextField {...register('price', { valueAsNumber: true })} type='number' label='price' variant='outlined' />
        <Controller
          control={control}
          name='type.__type'
          render={({ field }) => (
            <ToggleButtonGroup
              color='primary'
              value={field.value}
              exclusive
              onChange={e => {
                field.onChange(e)
                unregister('type.address')
                unregister('type.copies')
                unregister('type.employee')
                unregister('type.name')
                unregister('type.phoneNumber')
                unregister('type.redactor')
                unregister('type.square')
              }}
              aria-label='Platform'
            >
              <ToggleButton value='newspaper'>Newspaper</ToggleButton>
              <ToggleButton value='placement'>Placement</ToggleButton>
            </ToggleButtonGroup>
          )}
        />
        {currentType === 'newspaper' ? (
          <>
            <TextField {...register('type.name')} label='name' variant='outlined' />
            <TextField {...register('type.redactor')} label='redactor' variant='outlined' />
            <TextField {...register('type.copies', { valueAsNumber: true })} type='number' label='copies' variant='outlined' />
            <TextField {...register('type.employee', { valueAsNumber: true })} type='number' label='employee' variant='outlined' />
          </>
        ) : (
          <>
            <TextField {...register('type.name')} label='name' variant='outlined' />
            <TextField {...register('type.address')} label='address' variant='outlined' />
            <TextField {...register('type.phoneNumber', { valueAsNumber: true })} type='number' label='phoneNumber' variant='outlined' />
            <TextField {...register('type.square', { valueAsNumber: true })} type='number' label='square' variant='outlined' />
          </>
        )}
        <Button type='submit' variant='outlined'>
          Create new Property
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Price</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>name</TableCell>

              <TableCell align='right'>delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map(property => (
                <TableRow key={property._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{property.price}</TableCell>

                  <TableCell>{property.typeModel}</TableCell>
                  <TableCell>{property.type?.name}</TableCell>
                  <TableCell align='right' onClick={() => onDelete(property._id)}>
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
