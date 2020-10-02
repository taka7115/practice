
<template>
  <div>
    <div class="ttl">
      <h1 v-html="arrays[name].ttl"></h1>
    </div>

    <section class="cont" :class="{ portrait: portrait }">
      <slot name="mainCont"></slot>
    </section>
  </div>
</template>



<script>
import work40 from "../../../data/work40.js";
import work39 from "../../../data/work39.js";
import work38 from "../../../data/work38.js";
import work37 from "../../../data/work37.js";
import work36 from "../../../data/work36.js";
import work35 from "../../../data/work35.js";
import work34 from "../../../data/work34.js";
import work33 from "../../../data/work33.js";
import work32 from "../../../data/work32.js";
import work31 from "../../../data/work31.js";
import work30 from "../../../data/work30.js";
import work29 from "../../../data/work29.js";
import work28 from "../../../data/work28.js";
import work27 from "../../../data/work27.js";
import work26 from "../../../data/work26.js";
import work25 from "../../../data/work25.js";
import work24 from "../../../data/work24.js";
import work23 from "../../../data/work23.js";
import work22 from "../../../data/work22.js";
import work21 from "../../../data/work21.js";
import work20 from "../../../data/work20.js";
import work19 from "../../../data/work19.js";
import work18 from "../../../data/work18.js";
import work17 from "../../../data/work17.js";
import work16 from "../../../data/work16.js";
import work15 from "../../../data/work15.js";
import work14 from "../../../data/work14.js";
import work13 from "../../../data/work13.js";
import work12 from "../../../data/work12.js";
import work11 from "../../../data/work11.js";
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
      default: "",
    },
    portrait: {
      type: Boolean,
      default: "",
    },
  },
  data() {
    return {
      arrays: {
        work40,
        work39,
        work38,
        work37,
        work36,
        work35,
        work34,
        work33,
        work32,
        work31,
        work30,
        work29,
        work28,
        work27,
        work26,
        work25,
        work24,
        work23,
        work22,
        work21,
        work20,
        work19,
        work18,
        work17,
        work16,
        work15,
        work14,
        work13,
        work12,
        work11,
        work10,
        work9,
        work8,
        work7,
        work6,
        work5,
        work4,
        work3,
        work2,
        work1,
      },
    };
  },
  mounted() {
    return this.arrays[this.name].func();
  },
};
</script>

