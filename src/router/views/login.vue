<script>
import Layout from '@layouts/main.vue'
import { authMethods } from '@state/helpers'
import appConfig from '@src/app.config'
import { vueTelegramLogin } from 'vue-telegram-login'

export default {
  page: {
    title: 'Log in',
    meta: [{ name: 'description', content: `Log in to ${appConfig.title}` }],
  },
  components: { Layout, vueTelegramLogin },
  data() {
    return {
      email: '',
      password: '',
      authError: null,
      tryingToLogIn: false,
    }
  },
  methods: {
    ...authMethods,
    // Try to log the user in with the email
    // and password they provided.

    loginWrapper(promise) {
      this.tryingToLogIn = true
      // Reset the authError if it existed.
      this.authError = null
      return promise()
        .then((token) => {
          this.tryingToLogIn = false

          // Redirect to the originally requested page, or to the home page
          this.$router.push(
            this.$route.query.redirectFrom || { name: 'profile' }
          )
        })
        .catch((error) => {
          this.tryingToLogIn = false
          this.authError = error
        })
    },

    tryToTelegramLogIn(data) {
      return this.loginWrapper(() => this.telegramLogIn(data))
    },

    tryToLogIn() {
      return this.loginWrapper(() => {
        return this.logIn({
          email: this.email,
          password: this.password,
        })
      })
    },
  },
}
</script>

<template>
  <Layout>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" md="8">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form">
                <v-text-field
                  v-model="email"
                  label="Login"
                  name="email"
                  prepend-icon="mdi-at"
                  type="email"
                  placeholder="email"
                  :loading="tryingToLogIn"
                />

                <v-text-field
                  id="password"
                  v-model="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  placeholder="password"
                  :loading="tryingToLogIn"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                :disabled="tryingToLogIn"
                color="primary"
                @click="tryToLogIn"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col sm="auto">
          <vue-telegram-login
            mode="callback"
            telegram-login="gowish_bot"
            request-access="write"
            @callback="(data) => tryToTelegramLogIn(data)"
          />
        </v-col>
      </v-row>
      <v-row v-if="authError" align="center" justify="center">
        <v-col sm="auto">
          <p>
            There was an error logging in to your account.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>
