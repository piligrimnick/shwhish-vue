import axios from 'axios'
import { endpoints } from '@constants/endpoints'

export const state = {
  cached: [],
}

export const getters = {
  currentUser({ rootState }) {
    return rootState.auth.currentUser
  },
}

export const mutations = {
  CACHE_USER(state, newUser) {
    state.cached.push(newUser)
  },
}

export const actions = {
  fetchUser({ commit, state, rootState }, { id }) {
    // 1. Check if we already have the user as a current user.
    const { currentUser } = rootState.auth
    if (currentUser && currentUser.id === id) {
      return Promise.resolve(currentUser)
    }

    // 2. Check if we've already fetched and cached the user.
    const matchedUser = state.cached.find((user) => user.id === id)
    if (matchedUser) {
      return Promise.resolve(matchedUser)
    }

    // 3. Fetch the user from the API and cache it in case
    //    we need it again in the future.
    return axios.get(endpoints.users.show(id)).then((response) => {
      const user = response.data
      commit('CACHE_USER', user)
      return user
    })
  },
}
