import axios from 'axios'
import { endpoints } from '@constants/endpoints'

export const state = {
  wishes: [],
}

export const getters = {}

export const mutations = {
  SET_WISHES(state, wishes) {
    state.wishes = {
      ...state.wishes,
      wishes,
    }
  },
}

export const actions = {
  fetchWishes({ commit, state, rootState }) {
    // const { currentUser } = rootState.auth

    // 2. Check if we've already fetched and cached the user.

    return axios.get(endpoints.wishes.index).then((response) => {
      const wishes = response.data
      commit('SET_WISHES', wishes)
      return wishes
    })
  },
}
