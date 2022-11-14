import { useQuery } from '@tanstack/react-query'
import { IConsignment } from './types'
import s from './s.module.scss'
import { consignmentApi } from '../../api/consignmentApi'
import { useState } from 'react'
import { ConsignmentForm } from './consignmentForm'
import { ConsignmentSearch } from './consignmentSearch'
import { ConsignmentTable } from './consignmentTable'

export const ConsignmentPage = () => {
  const [nameParam, setNameParam] = useState('')
  const { data, refetch } = useQuery({ queryKey: ['consignment', nameParam], queryFn: () => consignmentApi.getAll<IConsignment[]>({ name: nameParam }) })

  const onDelete = async (id: string) => {
    await consignmentApi.delete(id)
    refetch()
  }

  return (
    <div className={s.root}>
      <ConsignmentForm onSuccess={() => refetch()} />
      <ConsignmentSearch
        onReset={() => {
          setNameParam('')
          refetch()
        }}
        onSearch={search => {
          setNameParam(search)
          refetch()
        }}
      />
      <ConsignmentTable data={data} onDelete={onDelete} />
    </div>
  )
}
