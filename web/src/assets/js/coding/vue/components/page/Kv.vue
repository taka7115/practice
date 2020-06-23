
<template>
  <div>
    <div class="ttl">
      <h1 v-html="arrays[name].ttl"></h1>
    </div>

    <section class="cont">
      <slot name="mainCont"></slot>
    </section>
  </div>
</template>



<script>
import work1 from "../../../data/work1.js";
export default {
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      arrays: {
        work1
      }
    };
  },
  computed: {
    new_array_tags() {
      //nameがマッチする配列を取得
      const array_a = this.arrays[this.name].map(value => {
        return value;
      });
      return array_a;
    }
  }
};
</script>

