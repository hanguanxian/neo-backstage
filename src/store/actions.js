import * as types from './mutation-types'

export default {
  addTabs({ commit }, tab) {
    commit(types.ADD_TABS, tab)
  },
  changeTabactiveindex({ commit }, index) {
    commit(types.CHANGE_TABACTIVEINDEX, index)
  },
  changeCurrentView({ commit }, path) {
    commit(types.CHANGE_CURRENTVIEW, path)
  }
};