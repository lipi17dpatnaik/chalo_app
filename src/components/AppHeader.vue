<template>
  <div class="app-header">
    <div class="logo">
      <img src="@/assets/logo1.png" alt="chalo" />
    </div>

    <div class="app-header-text">Public Transit Route</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Buefydropdown from "buefy"

@Component({
  name: "AppHeader",
  components: {
    Buefydropdown
  },
})
export default class AppHeader extends Vue {
}
</script>

<style lang="scss" scoped>
.app-header {
  height: 3.5rem;
  padding: 0 3rem;
  background-color: black;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  column-gap: 1rem;
  &-text {
    color: white;
    font-weight: 900;
  }

  .logo {
    height: 2.5rem;

    img {
      max-height: 100%;
    }
  }
}
</style>
