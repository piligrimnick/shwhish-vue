<script>
export default {
  props: {
    question: {
      type: String,
      default: () => 'Are you sure?',
    },
    description: {
      type: String,
      default: () => '',
    },
    no: {
      type: String,
      default: () => 'Close',
    },
    yes: {
      type: String,
      default: () => 'Confirm',
    },
    callback: {
      type: Function,
      required: true,
    },
    payload: {
      validator: () => true,
      required: true,
    },
    button: {
      type: Object,
      default: () => ({
        isIcon: false,
        text: 'Open Dialog',
      }),
    },
  },
  data: () => ({
    dialog: null,
  }),
  methods: {
    callCallback() {
      this.callback(this.payload).then(() => (this.dialog = false))
    },
  },
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="290">
    <template v-slot:activator="{ on }">
      <v-btn :icon="button.isIcon" v-on="on">
        <v-icon v-if="button.isIcon">{{ button.icon }}</v-icon>
        <template v-else>
          {{ button.text }}
        </template>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">{{ question }}</v-card-title>

      <v-card-text v-if="description.length">
        {{ description }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="red darken-1" text @click="dialog = false">
          {{ no }}
        </v-btn>

        <v-btn color="green darken-1" text @click="callCallback">
          {{ yes }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
