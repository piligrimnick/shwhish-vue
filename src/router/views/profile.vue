<script>
import Layout from '@layouts/main.vue'
import { wishesComputed, wishesMethods, authComputed } from '@state/helpers'

import Wish from '@components/wish.vue'

import vueGoodshareFacebook from 'vue-goodshare/src/providers/Facebook.vue'
import vueGoodshareTelegram from 'vue-goodshare/src/providers/Telegram.vue'
import vueGoodshareTwitter from 'vue-goodshare/src/providers/Twitter.vue'
import vueGoodshareEmail from 'vue-goodshare/src/providers/Email.vue'
import vueGoodshareVkontakte from 'vue-goodshare/src/providers/Vkontakte.vue'
import vueGoodshareWhatsApp from 'vue-goodshare/src/providers/WhatsApp.vue'

export default {
  page() {
    return {
      title: this.user.name,
      meta: [
        {
          name: 'description',
          content: `The user profile for ${this.user.name}.`,
        },
      ],
    }
  },
  components: {
    Layout,
    Wish,
    vueGoodshareFacebook,
    vueGoodshareTelegram,
    vueGoodshareTwitter,
    vueGoodshareEmail,
    vueGoodshareVkontakte,
    vueGoodshareWhatsApp,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...wishesComputed,
    ...authComputed,

    isOwner() {
      if (!this.loggedIn) return false

      return this.user.id === this.currentUser.id
    },

    shareComponents() {
      return [
        {
          name: 'vue-goodshare-telegram',
          title: 'Telegram',
        },
        {
          name: 'vue-goodshare-twitter',
          title: 'Twitter',
        },
        {
          name: 'vue-goodshare-email',
          title: 'Email',
        },
        {
          name: 'vue-goodshare-facebook',
          title: 'Facebook',
        },
        {
          name: 'vue-goodshare-vkontakte',
          title: 'VK',
        },
      ]
    },

    profileLink() {
      return `${location.origin}/profile/${this.currentUser.id}`
    },
  },
  created() {
    this.fetchWishes({ userId: this.user.id })
    if (this.loggedIn) {
      this.fetchRealisedWishes({ userId: this.user.id })
    }
  },
  methods: {
    ...wishesMethods,
  },
}
</script>

<template>
  <Layout>
    <v-row>
      <v-col>
        <v-container fluid>
          <v-row dense>
            <v-col>
              <v-row v-if="user.firstname">
                <v-col> User: {{ user.firstname }} {{ user.lastname }} </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <v-container fluid class="wishes">
          <v-row dense>
            <v-col>
              <v-sheet>
                <Wish
                  v-for="wish in wishes"
                  :key="wish.id"
                  :wish="wish"
                  :is-owner="isOwner"
                  class="mx-auto my-1"
                />
              </v-sheet>

              <template v-if="isOwner">
                <v-divider v-if="wishes.length && realisedWishes.length" />
                <v-sheet>
                  <h3 class="text-center">
                    Here you can see your realised wishes
                  </h3>
                  <v-sheet class="mx-auto" max-width="700">
                    <v-slide-group multiple show-arrows>
                      <v-slide-item
                        v-for="(wish, n) in realisedWishes"
                        :key="n"
                      >
                        <Wish
                          :key="wish.id"
                          :wish="wish"
                          :is-owner="isOwner"
                          :realised="true"
                          class="mx-1"
                        />
                      </v-slide-item>
                    </v-slide-group>
                  </v-sheet>
                </v-sheet>
              </template>
            </v-col>
          </v-row>
          <v-row v-if="isOwner">
            <v-col class="d-flex flex-column">
              <p> Share my wishes with: </p>
              <component
                :is="shareComponent.name"
                v-for="shareComponent in shareComponents"
                :key="shareComponent.name"
                :page_url="profileLink"
                :title_social="shareComponent.title"
                has_icon
              ></component>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </Layout>
</template>
