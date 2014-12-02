$(function(){
  var winH =$(window).height();
  $(".container").css("height",winH);
  var mySwiper = new Swiper('.swiper-container',{
    mode: 'vertical',
    onInit: function(swiper){
      var contentBox = $(".swiper-slide-active .content-box");
      var slideHeight = $(window).height() - contentBox.height();
      contentBox.css("padding-top",slideHeight/2);
    },
    onSlideChangeStart: function(swiper){
      var contentBox = $(".swiper-slide-active .content-box");
      var slideHeight = $(window).height() - contentBox.height();
      contentBox.css("padding-top",slideHeight/2);
    }
  });
  $(".swiper-container").show();
});