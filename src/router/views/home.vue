<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main.vue'

export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout },
}
</script>

<template>
  <Layout>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col class="d-flex justify-center">
          <p>
            To start usage just send <tt>/start</tt> to
            <a href="https://t.me/gowish_bot">@gowish_bot</a> and
            <a href="/login">login through telegram</a>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>
