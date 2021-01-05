<template>
  <section class="c-works">
    <div class="c-worksWrapper">
      <div
        class="c-worksCont"
        ontouchstart
        v-for="item in arrays"
        v-bind:key="item.id"
      >
        <div class="c-worksWrap">
          <img
            :src="`/assets/img/coding/thumbnail/page${item.id}.jpg`"
            class="js-worksImg js-cont"
            :alt="item.alt"
          />
          <div class="c-worksCurtain js-curtain" type="curtain"></div>
          <div class="c-worksLeft">
            <p class="c-worksLeft__num js-worksNum">{{ item.id | checkNum }}</p>
          </div>
          <div class="c-worksRight">
            <div class="c-worksRight__wrap">
              <h3 class="c-worksRight__txt js-worksTxt" v-html="item.txt"></h3>
              <a :href="`./works/page${item.id}.html`">
                <button class="c-worksRight__btn js-worksBtn">
                  <p class="c-worksRight__detail">コードを見る</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 34 15"
                    class="c-worksRight__arrow"
                  >
                    <path
                      d="M669.389,1893.614h31l-10.207-7.189v14"
                      transform="translate(-669.389 -1884.497)"
                      fill="none"
                      stroke="turquoise"
                      stroke-width="2"
                      class="js-path-length"
                    />
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>



<script>

import work60 from "../../../data/work60.js";
import work59 from "../../../data/work59.js";
import work58 from "../../../data/work58.js";
import work57 from "../../../data/work57.js";
import work56 from "../../../data/work56.js";
import work55 from "../../../data/work55.js";
import work54 from "../../../data/work54.js";
import work53 from "../../../data/work53.js";
import work52 from "../../../data/work52.js";
import work51 from "../../../data/work51.js";
import work50 from "../../../data/work50.js";
import work49 from "../../../data/work49.js";
import work48 from "../../../data/work48.js";
import work47 from "../../../data/work47.js";
import work46 from "../../../data/work46.js";
import work45 from "../../../data/work45.js";
import work44 from "../../../data/work44.js";
import work43 from "../../../data/work43.js";
import work42 from "../../../data/work42.js";
import work41 from "../../../data/work41.js";
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
  data: function () {
    return {
      arrays: {
        work60,
        work59,
        work58,
        work57,
        work56,
        work55,
        work54,
        work53,
        work52,
        work51,
        work50,
        work49,
        work48,
        work47,
        work46,
        work45,
        work44,
        work43,
        work42,
        work41,
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
  // if the number of work is less than 10, return with 0
  filters: {
    checkNum: function (val) {
      if (String(val).length == 1) {
        return "0" + val;
      } else {
        return val;
      }
    },
  },
};
</script>
