import axios from 'axios'
import { endpoints } from '@constants/endpoints'
const _ = require('lodash')

export const state = {
  wishes: [],
  realisedWishes: [],
}

export const getters = {}

export const mutations = {
  SET_WISHES(state, wishes) {
    state.wishes = wishes
  },

  SET_REALISED_WISHES(state, realisedWishes) {
    state.realisedWishes = realisedWishes
  },

  REALISE_WISH(state, wish) {
    state.realisedWishes.push(wish)
  },

  DELETE_WISH(state, id) {
    const indexToDelete = _.findIndex(state.wishes, (w) => w.id === id)
    state.wishes.splice(indexToDelete, 1)
  },

  DELETE_REALISED_WISH(state, id) {
    const indexToDelete = _.findIndex(state.realisedWishes, (w) => w.id === id)
    state.realisedWishes.splice(indexToDelete, 1)
  },

  UPDATE_WISH(state, wish) {
    const indexToUpdate = _.findIndex(state.wishes, (w) => w.id === wish.id)
    state.wishes.splice(indexToUpdate, 1, wish)
  },
}

export const actions = {
  fetchWishes: ({ commit, state, rootState }, { userId }) => {
    axios.get(endpoints.wishes.user_wishes(userId)).then((response) => {
      const wishes = response.data
      commit('SET_WISHES', wishes)
      return wishes
    })
  },

  fetchRealisedWishes: ({ commit, state, rootState }, { userId }) => {
    axios
      .get(endpoints.wishes.realised_user_wishes(userId))
      .then((response) => {
        const realisedWishes = response.data
        commit('SET_REALISED_WISHES', realisedWishes)
        return realisedWishes
      })
  },

  deleteWish: ({ commit, state }, { id, realised }) => {
    axios.delete(endpoints.wishes.delete(id)).then(() => {
      const mutation = realised ? 'DELETE_REALISED_WISH' : 'DELETE_WISH'
      commit(mutation, id)
    })
  },

  realiseWish: ({ commit, state }, id) => {
    axios.put(endpoints.wishes.realise(id)).then((response) => {
      commit('DELETE_WISH', id)
      const wish = response.data
      commit('REALISE_WISH', wish)
      return wish
    })
  },

  bookWish: ({ commit, state }, id) => {
    axios.put(endpoints.wishes.book(id)).then((response) => {
      const wish = response.data
      commit('UPDATE_WISH', wish)
      return wish
    })
  },

  unbookWish: ({ commit, state }, id) => {
    axios.put(endpoints.wishes.unbook(id)).then((response) => {
      const wish = response.data
      commit('UPDATE_WISH', wish)
      return wish
    })
  },
}
