import Vue from 'vue'
import Vuetify, {
  VListItem,
  VListItemAction,
  VListItemTitle,
  VListItemContent,
  VIcon,
} from 'vuetify/lib'

Vue.use(Vuetify, {
  components: {
    VListItem,
    VListItemAction,
    VListItemTitle,
    VListItemContent,
    VIcon,
  },
})

export default new Vuetify({})
