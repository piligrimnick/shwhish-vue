<script>
import { mapActions } from 'vuex'

import NavBar from '@components/nav-bar.vue'

export default {
  components: { NavBar },
  methods: {
    ...mapActions('bus', ['toggleDrawer']),
  },
}
</script>

<template>
  <v-app id="shwish">
    <NavBar />
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="toggleDrawer" />
      <v-toolbar-title>ShWish</v-toolbar-title>
    </v-app-bar>
    <!-- <img
        src="@assets/images/logo.png"
        class="img img-responsive"
        alt="Logo"
        style="height: 70px"
      /> -->
    <v-content>
      <slot />
    </v-content>
    <v-footer app>
      footer
    </v-footer>
  </v-app>
</template>

<style lang="scss" module>
@import '@design';

.container {
  min-width: $size-content-width-min;
  max-width: $size-content-width-max;
  margin: 0 auto;
}
</style>
