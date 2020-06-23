<template>
  <section class="c-works">
    <div class="c-worksWrapper">
      <div class="c-worksCont" ontouchstart v-for="item in arrays" v-bind:key="item.id">
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
import work1 from "../../../data/work1.js";
import work2 from "../../../data/work2.js";
export default {
  data() {
    return {
      arrays: {
        work1,
        work2
      }
    };
  },
  // if the number of work is less than 10, return with 0
  filters: {
    checkNum: function(val) {
      if (String(val).length == 1) {
        return "0" + val;
      } else {
        return val;
      }
    }
  }
};
</script>
