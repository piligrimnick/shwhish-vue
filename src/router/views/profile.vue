<script>
import Layout from '@layouts/main.vue'
import { wishesComputed, wishesMethods } from '@state/helpers'

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
    <h1>
      <BaseIcon name="user" />
      {{ user.username }}
      Profile
    </h1>
    <div class="wishes">
      <div v-for="wish in wishes" :key="wish.id" class="wishes">
        <pre>{{ wish }}</pre>
      </div>
    </div>
    <pre>{{ user }}</pre>
  </Layout>
</template>
