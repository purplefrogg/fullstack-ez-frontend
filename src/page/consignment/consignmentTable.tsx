import { TextField, Button, TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { consignmentApi } from '../../api/consignmentApi'
import { IConsignment, IConsignmentForm } from './types'
import s from './s.module.scss'
import DeleteIcon from '@mui/icons-material/Delete'

export const ConsignmentTable: FC<{ data?: IConsignment[]; onDelete: (id: string) => void }> = ({ data, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Short Name</TableCell>
            <TableCell>Leader</TableCell>
            <TableCell align='right'>Registration Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map(consignment => (
              <TableRow key={consignment.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{consignment.name}</TableCell>
                <TableCell>{consignment.shortName}</TableCell>
                <TableCell>{consignment.leader}</TableCell>
                <TableCell align='right'>{new Date(consignment.registrationDate).toUTCString()}</TableCell>
                <TableCell align='right' onClick={() => onDelete(consignment._id)}>
                  <DeleteIcon />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
