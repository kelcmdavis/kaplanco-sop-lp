$("path").hover(function(e) {
  $('.sop-info-box').css('display','block');
  $('.sop-info-box').html($(this).data('info'));
});
$("path").mouseleave(function(e) {
  $('.sop-info-box').css('display','none');
});
$(document).mousemove(function(e) {
  $('.sop-info-box').css('top',e.pageY-$('.sop-info-box').height()-30);
  $('.sop-info-box').css('left',e.pageX-($('.sop-info-box').width())/2);
}).mouseover();
