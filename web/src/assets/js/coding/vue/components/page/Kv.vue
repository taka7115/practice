
<template>
  <div>
    <div class="ttl">
      <h1 v-html="arrays[name].ttl"></h1>
    </div>

    <section class="cont" :class="{'portrait':portrait}">
      <slot name="mainCont"></slot>
    </section>
  </div>
</template>



<script>
import work22 from "../../../data/work22.js";
import work21 from "../../../data/work21.js";
import work10 from "../../../data/work10.js";
import work9 from "../../../data/work9.js";
import work8 from "../../../data/work8.js";
import work7 from "../../../data/work7.js";
import work6 from "../../../data/work6.js";
import work5 from "../../../data/work5.js";
import work4 from "../../../data/work4.js";
import work3 from "../../../data/work3.js";
import work2 from "../../../data/work2.js";
import work1 from "../../../data/work1.js";
export default {
  props: {
    name: {
      type: String,
      default: ""
    },
    portrait: {
      type: Boolean,
      default: ""
    }
  },
  data() {
    return {
      arrays: {
        work22,
        work21,
        work10,
        work9,
        work8,
        work7,
        work6,
        work5,
        work4,
        work3,
        work2,
        work1
      }
    };
  },
  mounted() {
    return this.arrays[this.name].func();
  }
};
</script>

