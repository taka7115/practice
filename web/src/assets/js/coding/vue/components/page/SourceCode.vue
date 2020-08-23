
<template>
  <section class="code">
    <div class="lang">
      <div class="lang__tab" :class="{'js-current':isActive1}" v-on:click="slideActivate1()">
        <img src="/assets/img/coding/page/html.svg" alt="html" />
      </div>
      <div class="lang__tab" :class="{'js-current':isActive2}" v-on:click="slideActivate2()">
        <img src="/assets/img/coding/page/css.svg" alt="css" />
      </div>
      <div class="lang__tab" :class="{'js-current':isActive3}" v-on:click="slideActivate3()">
        <img src="/assets/img/coding/page/js.svg" alt="javascript" />
      </div>
    </div>
    <div class="slide">
      <div class="slide__cont" v-show="slide1">
        <pre class="line-numbers">
      <code class="language-markup" data-language="html">
        <slot name="html"></slot>
      </code> </pre>
      </div>
      <div class="slide__cont" v-show="slide2">
        <pre class="line-numbers">
      <code class="language-css" data-language="css">
        <slot name="css" v-if="csspcShow"></slot>
        <slot name="csssp" v-if="cssspShow"></slot>
      </code>
      </pre>
      </div>
      <div class="slide__cont" v-show="slide3">
        <pre class="line-numbers">
      <code class="language-javascript" data-language="javascript">
        <slot name="js" v-if="jspcShow"></slot>
        <slot name="jssp" v-if="jsspShow"></slot>
      </code>
      </pre>
      </div>
    </div>
  </section>
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
    tab: {
      type: String,
      default: "",
    },
    csssp: {
      type: Boolean,
      default: "",
    },
    jssp: {
      type: Boolean,
      default: "",
    },
  },
  data: function () {
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
      csspcShow: true,
      cssspShow: false,
      jspcShow: true,
      jsspShow: false,
      slide1: this.tab == 1,
      slide2: this.tab == 2,
      slide3: this.tab == 3,
      isActive1: this.tab == 1,
      isActive2: this.tab == 2,
      isActive3: this.tab == 3,
    };
  },
  methods: {
    slideActivate1: function () {
      this.slide1 = true;
      this.slide2 = false;
      this.slide3 = false;
      this.isActive1 = true;
      this.isActive2 = false;
      this.isActive3 = false;
    },
    slideActivate2: function () {
      this.slide1 = false;
      this.slide2 = true;
      this.slide3 = false;
      this.isActive1 = false;
      this.isActive2 = true;
      this.isActive3 = false;
    },
    slideActivate3: function () {
      this.slide1 = false;
      this.slide2 = false;
      this.slide3 = true;
      this.isActive1 = false;
      this.isActive2 = false;
      this.isActive3 = true;
    },
  },
  mounted() {
    if (window.innerWidth < 750) {
      if (this.jssp) {
        (this.jsspShow = true), (this.jspcShow = false);
      }
      if (this.csssp) {
        (this.cssspShow = true), (this.csspcShow = false);
      }
    }
  },
};
</script>

