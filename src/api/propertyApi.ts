import { IMemberForm } from '../page/member/types'
import { IPropertyForm } from '../page/property/types'
import { api } from './api'

export const propertyApi = {
  path: 'property/',
  async getAll<T>(): Promise<T> {
    return await api.get(this.path)
  },
  async getById(id: string) {
    return await api.get(this.path + id)
  },
  async create(property: IPropertyForm) {
    return await api.post(this.path, property)
  },
  async delete(id: string) {
    return await api.delete(this.path + id)
  },
}
