import * as types from './mutation-types'

export default {
  [types.ADD_TABS] (state, tab) {
    state.editableTabs.push(
      Object.assign(tab)
    )
  },
  [types.CHANGE_TABACTIVEINDEX] (state, index) {
    state.editableTabsValue = index + ''
  },
  [types.CHANGE_CURRENTVIEW] (state, path) {
    state.currentView = path
  },
};