import VanillaTilt from 'vanilla-tilt';

export default {
  id: 17,
  ttl: "<span></span><br class='u-sp'>",
  txt: "17作品目の情報が入ります。",
  alt: "17作品目の情報が入ります。",
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


/**
 * js--------------------------------------
 */
function func() {

  VanillaTilt.init(document.querySelectorAll(".box"),{
    max:25,
    speed:400,
    glare:true,
    "max-glare":.5
  });


}
