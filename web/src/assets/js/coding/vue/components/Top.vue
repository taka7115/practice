<template>
  <div>
    <cMenu></cMenu>
    <kv></kv>
    <main class="c-main">
      <typeWriting></typeWriting>
      <work></work>
    </main>
  </div>
</template>



<script>
import cMenu from "./top/CMenu.vue";
import kv from "./top/Kv.vue";
import typeWriting from "./top/TypeWriting.vue";
import work from "./top/Work.vue";
export default {
  components: {
    cMenu,
    kv,
    typeWriting,
    work
  }
};
</script>
