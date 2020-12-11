export default {
  id: 16,
  ttl: "<span></span><br class='u-sp'>",
  txt: "16作品目の情報が入ります。",
  alt: "16作品目の情報が入ります。",
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

  $(".list li").on("click",function() {
    var value = $(this).attr("data-filter");
    if (value == "all") {
      $(".item").show(1000);
    } else {
      $(".item").not("." + value).hide(1000);
      $(".item").filter("." + value).show(1000);
    }
  });


}
