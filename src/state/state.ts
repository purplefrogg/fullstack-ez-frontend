import { makeAutoObservable } from 'mobx'

class State {
  sidebarOpened = true

  constructor() {
    makeAutoObservable(this)
  }

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened
  }
}

export const state = new State()
