<script>
import { wishMethods, authComputed } from '@state/helpers'
import { root } from '@constants/endpoints'

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

    cardColor() {
      return this.wish.booking && !this.isOwner ? '#33af7740' : '#66550010'
    },

    src() {
      return root + this.wish.picture_url
    },
  },
  methods: {
    ...wishMethods,
  },
}
</script>

<template>
  <v-card max-width="344" :color="cardColor" outlined>
    <v-card-text>
      {{ wish.body }}
    </v-card-text>
    <v-img v-if="wish.picture_url" height="200" :src="src" />
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
      <template v-if="!isOwner">
        <template v-if="!realised">
          <base-dialog
            v-if="!wish.booking"
            yes="Confirm"
            :button="{ text: 'Забронировать' }"
            :callback="bookWish"
            :payload="wish.id"
          />
          <base-dialog
            v-if="wish.booking && wish.booking.user_id === currentUser.id"
            yes="Confirm"
            :button="{ text: 'Разбронировать' }"
            :callback="unbookWish"
            :payload="wish.id"
          />
        </template>
      </template>
      <template v-else>
        <base-dialog
          v-if="!realised"
          yes="Confirm"
          :button="{ text: 'Исполнено!' }"
          :callback="realiseWish"
          :payload="wish.id"
        />
        <base-dialog
          yes="Confirm"
          :button="{ text: 'Удалить?' }"
          :callback="deleteWish"
          :payload="{ id: wish.id, realised: realised }"
        />
      </template>
    </v-card-actions>
  </v-card>
</template>
