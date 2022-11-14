export interface INewspaper {
  _id: string
  name: string
  copies: number
  redactor: string
  employee: number
  __v: number
}

export interface IPlacement {
  _id: string
  name: string
  phoneNumber: number
  square: number
  address: string
  __v: number
}

export interface IProperty {
  _id: string
  price: number
  type: IPlacement | INewspaper
  typeModel: 'NewsPaper' | 'Placement'
  __v: number
}

export interface IPropertyForm extends Pick<IProperty, 'price'> {
  type: (Omit<IPlacement, '_id' | '_v'> | Omit<INewspaper, '_id' | '_v'>) & { __type: 'newspaper' | 'placement' }
}
