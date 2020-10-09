export default {
  id: 13,
  ttl: "<span></span><br class='u-sp'>",
  txt: "10作品目の情報が入ります。",
  alt: "10作品目の情報が入ります。",
  p1: "",
  p1_color: "js-yellow",
  p1_list1: "<span data='dot'>&#9642;</span>",
  p1_list2: "<span data='dot'>&#9642;</span>",
  p2: "",
  p2_color: "js-yellow",
  p2_list1: "<span data='dot'>&#9642;</span>",
  p2_list2: "<span data='dot'>&#9642;</span>",
  p3: "",
  p3_color: "js-yellow",
  p3_list1: "<span data='dot'>&#9642;</span>",
  p3_list2: "<span data='dot'>&#9642;</span>",
  func
}


import Swiper from 'swiper'


/**
 * js--------------------------------------
 */

function func() {


  class Function {

    constructor() {
      this.redSwiper;
      this.blueSwiper;
    }

    init() {

      // swiperSetUp()関数実行
      this.swiperSetUp();

      // modalOpen()関数実行
      this.modalOpen(".modal-red", ".js-anc-red", this.redSwiper);
      this.modalOpen(".modal-blue", ".js-anc-blue", this.blueSwiper);

      // modalClose()関数実行
      this.modalClose(".modal");

    } //init

    /**
     * プランボタンクリックでモーダルを表示する関数
     * @param {モーダル要素} m
     * @param {アンカー要素} anc
     * @param {インスタンス} s
     */
    modalOpen(m, anc, s) {
      var anchor = document.querySelectorAll(anc);
      for (let i = 0; i < anchor.length; i++) {
        anchor[i].addEventListener("click", () => {
          this.modalShowSlideTo(m, anc, s)
        });
      }
    } //modalOpen

    /**
     * swiperインスタンス生成する関数
     */
    swiperSetUp() {
      this.redSwiper = new Swiper('.red-container', {
        navigation: {
          nextEl: '.js-red-right',
          prevEl: '.js-red-left',
        },
        loop: true
      });

      this.blueSwiper = new Swiper('.blue-container', {
        navigation: {
          nextEl: ".js-blue-right",
          prevEl: ".js-blue-left",
        },
        loop: true
      });
    } //swiperSetUp

    /**
     * モーダルを表示&該当する順番のスライドを表示する関数
     * @param {モーダル要素} m
     * @param {アンカー要素} anc
     * @param {インスタンス} s
     */
    modalShowSlideTo(m, anc, s) {
      var modal = document.querySelector(m);
      var anchor = document.querySelectorAll(anc);
      modal.classList.add("show");
      for (let i = 0; i < anchor.length; i++) {
        s.slideTo(el);
      }
    } //modalShowSlideTo

    // モーダルを閉じる関数
    modalClose(m) {
      var modal = document.querySelectorAll(m);
      for (let i = 0; i < modal.length; i++) {
        modal[i].addEventListener("click", () => {
          modal[i].classList.remove("show");
        });
      }
    } //modalClose

  } //Function

  /**
   * createdのタイミングでFunctionクラスの内容を実行
   */
  window.addEventListener("load", () => {
    const swiper = new Function();
    swiper.init();
  });



} //func
