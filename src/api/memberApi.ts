import { IMemberForm } from '../page/member/types'
import { api } from './api'

export const memberApi = {
  path: 'member/',
  async getAll<T>(): Promise<T> {
    return await api.get(this.path)
  },
  async getById(id: string) {
    return await api.get(this.path + id)
  },
  async create(consignment: IMemberForm) {
    return await api.post(this.path, consignment)
  },
  async delete(id: string) {
    return await api.delete(this.path + id)
  },
}
