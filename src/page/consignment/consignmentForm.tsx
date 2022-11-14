import { TextField, Button } from '@mui/material'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { consignmentApi } from '../../api/consignmentApi'
import { IConsignmentForm } from './types'
import s from './s.module.scss'

export const ConsignmentForm: FC<{ onSuccess: () => void }> = props => {
  const { register, handleSubmit } = useForm<IConsignmentForm>()
  const onSubmit = async (data: IConsignmentForm) => {
    await consignmentApi.create(data)
    props.onSuccess()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <TextField {...register('leader')} label='leader' variant='outlined' />
      <TextField {...register('name')} label='name' variant='outlined' />
      <TextField {...register('shortName')} label='shortName' variant='outlined' />
      <TextField {...register('registrationDate')} type={'date'} label='registrationDate' focused variant='outlined' />

      <Button type='submit' variant='outlined'>
        Create new Consignment
      </Button>
    </form>
  )
}
