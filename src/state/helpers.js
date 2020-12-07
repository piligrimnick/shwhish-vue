import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
}

export const authMethods = mapActions('auth', [
  'logIn',
  'logOut',
  'telegramLogIn',
])

export const wishesComputed = mapState('wishes', ['wishes', 'realisedWishes'])
export const wishesMethods = mapActions('wishes', [
  'fetchWishes',
  'fetchRealisedWishes',
])
export const wishMethods = mapActions('wishes', [
  'deleteWish',
  'realiseWish',
  'bookWish',
  'unbookWish',
])
export const usersComputed = mapState('users', ['users'])
export const usersMethods = mapActions('users', ['fetchUsers'])
