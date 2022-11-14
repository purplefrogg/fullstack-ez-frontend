import { IConsignmentForm } from '../page/consignment/types'
import { IDonateForm } from '../page/donate/types'
import { api } from './api'

export const donateApi = {
  path: 'donate/',
  async getAll<T>(): Promise<T> {
    return await api.get(this.path)
  },
  async getById(id: string) {
    return await api.get(this.path + id)
  },
  async create(donate: IDonateForm) {
    return await api.post(this.path, donate)
  },
  async delete(id: string) {
    return await api.delete(this.path + id)
  },
}
