<script>
import Layout from '@layouts/main.vue'
import { wishesComputed, wishesMethods } from '@state/helpers'

import Wish from '@components/wish.vue'

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
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...wishesComputed,
  },
  created() {
    this.fetchWishes()
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
        <v-container fluid class="wishes">
          <v-row dense>
            <v-col md="9">
              <template v-for="wish in wishes">
                <Wish :key="wish.id" :wish="wish" />
              </template>
            </v-col>
            <v-col md="3">
              User: {{ user.firstname }} {{ user.lastname }}
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </Layout>
</template>
