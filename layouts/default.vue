<template>
  <div>
    <LayoutNavbar></LayoutNavbar>
    <slot></slot>

    <LayoutFooter></LayoutFooter>
  </div>
</template>
<script>
import LayoutNavbar from '../components/layout/navbar.vue'
import LayoutFooter from '../components/layout/footer.vue'


export default {
  components: {
    LayoutNavbar,
    LayoutFooter
  }
}
</script>
