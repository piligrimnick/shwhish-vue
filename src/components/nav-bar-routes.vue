<script>
export default {
  // Functional components are stateless, meaning they can't
  // have data, computed properties, etc and they have no
  // `this` context.
  functional: true,
  props: {
    routes: {
      type: Array,
      required: true,
    },
  },
  // Render functions are an alternative to templates
  render(h, { props, parent, $style = {} }) {
    function getRouteTitle(route) {
      return typeof route.title === 'function' ? route.title() : route.title
    }

    function getRouteIcon(route) {
      if (route.icon.length) {
        return (
          <v-list-item-action>
            <v-icon>{route.icon}</v-icon>
          </v-list-item-action>
        )
      }
    }

    // Functional components are the only components allowed
    // to return an array of children, rather than a single
    // root node.
    return props.routes.map((route) => (
      <v-list-item key={route.name} link to={route}>
        {getRouteIcon(route)}
        <v-list-item-content>
          <v-list-item-title>{getRouteTitle(route)}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    ))
  },
}
</script>
