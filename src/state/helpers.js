import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
}

export const authMethods = mapActions('auth', ['logIn', 'logOut'])

export const wishesComputed = mapState('wishes', ['wishes'])
export const wishesMethods = mapActions('wishes', ['fetchWishes'])
