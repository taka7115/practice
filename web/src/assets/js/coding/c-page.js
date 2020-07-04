import Vue from 'vue';
import Page from './vue/components/Page.vue';



new Vue({
  el: '#c-page',
  components: {
    'page': Page
  }
})

/**
 * change the height of .nz
 */
var scrollCurve = () => {
  if (window.innerWidth > 1200) {
    var anchor = document.querySelector('.nz');
    var footer = document.querySelector('.footer');
    var footerH = footer.clientHeight * 1.1;
    var anchorPosition = anchor.offsetTop + footerH;
    console.log(`距離は${anchor}`)

    window.addEventListener('scroll', () => {

      var wH = window.innerHeight;
      var y = window.pageYOffset + wH;
      var distanceFromAnchor = y - anchorPosition;
      var img = document.querySelector('.nz');
      var imgH = img.clientHeight;
      var ratio = distanceFromAnchor / imgH;
      if (distanceFromAnchor > 0 && ratio <= 1) {
        var img = document.querySelector('.nz');
        img.style.transform = 'scaleY(' + ratio + ')';
      }
    });
  }
}


/*load event*/
document.addEventListener('DOMContentLoaded', () => {
  scrollCurve();
})

// window.on("load", () => {
// });
