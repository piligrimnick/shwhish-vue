export const state = {
  navigation: {
    drawer: null,
  },
}

export const getters = {}

export const mutations = {
  UPDATE_NAVIGATION(state, navigation) {
    state.navigation = {
      ...state.navigation,
      ...navigation,
    }
  },
}

export const actions = {
  toggleDrawer({ commit, state }) {
    commit('UPDATE_NAVIGATION', { drawer: !state.navigation.drawer })
  },

  setDrawer({ commit, state }, value) {
    commit('UPDATE_NAVIGATION', { drawer: value })
  },
}
