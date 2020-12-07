<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main.vue'
import { usersComputed, usersMethods } from '@state/helpers'

export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout },
  created() {
    this.fetchUsers()
  },
  methods: {
    ...usersMethods,
    printName(user) {
      const fullname = `${user.firstname} ${user.lastname}`
      if (user.firstname && user.lastname) {
        return fullname
      } else if (user.username) {
        return user.username
      } else {
        return `Пользователь с ID #${user.id}`
      }
    },
  },
  computed: {
    ...usersComputed,
  },
}
</script>

<template>
  <Layout>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col class="d-flex justify-center">
          <p>
            Для начала отправьте <tt>/start</tt> боту
            <a href="https://t.me/gowish_bot">@gowish_bot</a> и
            <a href="/login">войдите через Telegram</a>
          </p>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col class="d-flex justify-center">
          <v-card class="mx-auto" max-width="400" tile>
            <v-card-title>Списки желаний пользователей</v-card-title>
            <v-list-item v-for="user in users" :key="user.id">
              <v-list-item-content>
                <v-list-item-title>
                  <a :href="`/profile/${user.id}`">
                    {{ printName(user) }}
                  </a>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>
