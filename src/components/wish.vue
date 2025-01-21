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
  <v-card :color="cardColor" outlined>
    <v-card-title> {{ wish.body.slice(0, 30) }}... </v-card-title>
    <v-card-subtitle>
      {{ new Date(wish.created_at).toLocaleString('ru-RU') }}
    </v-card-subtitle>
    <div class="d-flex flex-no-wrap justify-space-between">
      <v-card-text>
        {{ wish.body }}
      </v-card-text>
      <v-avatar class="ma-3" size="150" tile>
        <v-img v-if="wish.picture_url" contain :src="src" />
      </v-avatar>
    </div>
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
            :button="{ text: 'Снять бронь' }"
            :callback="unbookWish"
            :payload="wish.id"
          />
        </template>
      </template>
      <template v-else>
        <base-dialog
          v-if="!realised"
          yes="Confirm"
          :button="{ text: 'Архивировать' }"
          :callback="realiseWish"
          :payload="wish.id"
        />
        <base-dialog
          yes="Confirm"
          :button="{ text: 'Удалить' }"
          :callback="deleteWish"
          :payload="{ id: wish.id, realised: realised }"
        />
      </template>
    </v-card-actions>
  </v-card>
</template>
