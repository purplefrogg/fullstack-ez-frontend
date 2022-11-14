import { IConsignment } from '../consignment/types'
import { IMember } from '../member/types'

export interface IDonate {
  _id: string
  member: Pick<IMember, '_id' | 'fullName'>
  amount: number
  date: Date
  consignment: Pick<IConsignment, '_id' | 'name'>
  __v: number
}

export interface IDonateForm extends Omit<IDonate, '_id' | '_v' | 'consignment'> {}
