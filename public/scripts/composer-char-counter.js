$(document).ready(function() {
  
  // $('#tweet-text').click(function() {
  //   console.log('clicked', this);
  // })
  // $('#tweet-text').blur(function() {
  //   console.log('blur', this);
  // })
  // $('#tweet-text').keydown(function() {
  //   console.log('keydown', this);
  // })
  // $('#tweet-text').keyup(function() {
  //   console.log('keyup', this);
  // })
  // $('#tweet-text').keypress(function() {
  //   console.log('keypress', this);
  // })
  // $('#tweet-text').change(function() {
  //   console.log('change', this);
  // })
  // $('#tweet-text').input(function() {
  //   console.log('input', this);
  // })
$('textarea').keyup(function() {
  const keyCount = $(this).val().length;
  const counterLog = $(this).parent().find(".counter") //traverses through DOM to parents
  counterLog.val(140 - keyCount);
  if (keyCount >= 0 && keyCount < 140) {
    counterLog.css({"color": "#545149"});
  } else {
    counterLog.css({"color": "red"});
  }
})

});