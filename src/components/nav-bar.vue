<script>
import { mapState, mapActions } from 'vuex'

import { authComputed } from '@state/helpers'
import NavBarRoutes from './nav-bar-routes.vue'

export default {
  components: { NavBarRoutes },
  data() {
    return {
      persistentNavRoutes: [
        {
          name: 'home',
          title: 'Home',
          icon: 'mdi-home',
        },
      ],
      loggedInNavRoutes: [
        {
          name: 'profile',
          title: 'Personal area',
          icon: 'mdi-face',
        },
        {
          name: 'logout',
          title: 'Log out',
          icon: 'mdi-logout',
        },
      ],
      loggedOutNavRoutes: [
        {
          name: 'login',
          title: 'Log in',
          icon: 'mdi-login',
        },
      ],
    }
  },
  computed: {
    ...authComputed,
    ...mapState('bus', ['navigation']),
    drawer: {
      get: function() {
        return this.navigation.drawer
      },
      set: function(attr) {
        this.setDrawer(attr)
      },
    },
  },
  methods: {
    ...mapActions('bus', ['setDrawer']),
  },
}
</script>

<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list dense>
      <NavBarRoutes :routes="persistentNavRoutes" />
      <NavBarRoutes v-if="loggedIn" :routes="loggedInNavRoutes" />
      <NavBarRoutes v-else :routes="loggedOutNavRoutes" />
    </v-list>
  </v-navigation-drawer>
</template>
