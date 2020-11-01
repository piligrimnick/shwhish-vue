<script>
import { wishMethods, authComputed } from '@state/helpers'

export default {
  props: {
    wish: {
      type: Object,
      required: true,
    },
    isOwner: {
      type: Boolean,
      required: true,
    },
    realised: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...authComputed,
  },
  methods: {
    ...wishMethods,
  },
}
</script>

<template>
  <v-card max-width="344" outlined>
    <v-card-text>
      {{ wish.body }}
    </v-card-text>
    <v-card-text> </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="wish.url"
        target="_blank"
        icon
        :href="wish.url"
        color="primary"
      >
        <v-icon> mdi-link </v-icon>
      </v-btn>
      <v-spacer />
      <template v-if="isOwner">
        <base-dialog
          v-if="!realised"
          yes="Confirm"
          :button="{ isIcon: true, icon: 'mdi-check' }"
          :callback="realiseWish"
          :payload="wish.id"
        />
        <base-dialog
          yes="Confirm"
          :button="{ isIcon: true, icon: 'mdi-delete' }"
          :callback="deleteWish"
          :payload="wish.id"
        />
      </template>
    </v-card-actions>
  </v-card>
</template>
