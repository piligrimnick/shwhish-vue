<script>
import { wishMethods } from '@state/helpers'

export default {
  props: {
    wish: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...wishMethods,
  },
}
</script>

<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-card-text>
      {{ wish.body }}
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
      <base-dialog
        yes="Confirm"
        :button="{ isIcon: true, icon: 'mdi-delete' }"
        :callback="deleteWish"
        :payload="wish.id"
      />
    </v-card-actions>
  </v-card>
</template>
