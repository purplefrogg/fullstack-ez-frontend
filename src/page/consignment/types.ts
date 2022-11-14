export interface IConsignment {
  _id: string
  name: string
  shortName: string
  registrationDate: string
  leader: string
  __v: number
}

export interface IConsignmentForm extends Omit<IConsignment, '_id' | '_v'> {}
