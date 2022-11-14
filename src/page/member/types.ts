import { IConsignment } from '../consignment/types'

export interface IMember {
  _id: string
  consignment: IConsignment
  fullName: string
  birthday: Date
  address: string
  job: string
  profession: string
  __v: number
}
export interface IMemberForm extends Omit<IMember, '_id' | '_v'> {}
