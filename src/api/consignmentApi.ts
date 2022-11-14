import { IConsignmentForm } from '../page/consignment/types'
import { api } from './api'

export const consignmentApi = {
  path: 'consignment/',
  async getAll<T>(params?: { name: string }): Promise<T> {
    return await api.get(this.path, params)
  },
  async getById(id: string) {
    return await api.get(this.path + id)
  },
  async create(consignment: IConsignmentForm) {
    return await api.post(this.path, consignment)
  },
  async delete(id: string) {
    return await api.delete(this.path + id)
  },
}
