import axios from 'axios'
import { endpoints } from '@constants/endpoints'
const _ = require('lodash')

export const state = {
  wishes: [],
}

export const getters = {}

export const mutations = {
  SET_WISHES(state, wishes) {
    state.wishes = wishes
  },

  DELETE_WISH(state, id) {
    const indexToDelete = _.findIndex(state.wishes, (wish) => wish.id === id)
    state.wishes.splice(indexToDelete, 1)
  },
}

export const actions = {
  fetchWishes: ({ commit, state, rootState }) => {
    axios.get(endpoints.wishes.index).then((response) => {
      const wishes = response.data
      commit('SET_WISHES', wishes)
      return wishes
    })
  },

  deleteWish: ({ commit, state }, id) => {
    axios.delete(endpoints.wishes.delete(id)).then(() => {
      commit('DELETE_WISH', id)
    })
  },
}
