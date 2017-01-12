(function () {
    function handleLayout() {
      var imagesOnOneLine, unusedSpace, marginSize;
      var wrapperWidth = $('#wrapper').innerWidth();
      var defaultMargin = 5;
      var imageWidth = $('img:first-child').outerWidth();
      var totalImages = $('#wrapper').children().length;
      var imagesPerLine = Math.floor(wrapperWidth / (imageWidth + 2 * defaultMargin));
      var lastLineImgIndex = 0;
      if (imagesPerLine < totalImages) {
          var ununsedSpace = wrapperWidth - imagesPerLine * imageWidth - (defaultMargin * 2);
          marginSize = ununsedSpace / (imagesPerLine - 1) / 2;
          var lastLineIndex = imagesPerLine;
          $('img').each(function (index) {
              if (index % imagesPerLine === 0 || index % imagesPerLine === imagesPerLine - 1) {
                  if (index % imagesPerLine === 0) {
                      $(this).css({
                          marginLeft: defaultMargin,
                          marginRight: marginSize
                      });
                  } else {
                      $(this).css({
                          marginLeft: marginSize,
                          marginRight: defaultMargin
                      });
                  }
              } else {
                  $(this).css({
                      marginLeft: marginSize,
                      marginRight: marginSize
                  });
              }
          });
      } else {
          $('img').css({
              marginLeft: defaultMargin,
              marginRight: defaultMargin
          });
      }
  }
  function throttle(fn, threshhold, scope) {
      threshhold || (threshhold = 250);
      var last, deferTimer;
      return function () {
          var context = scope || this;
          var now = +new Date(), args = arguments;
          if (last && now < last + threshhold) {
              clearTimeout(deferTimer);
              deferTimer = setTimeout(function () {
                  last = now;
                  fn.apply(context, args);
              }, threshhold);
          } else {
              last = now;
              fn.apply(context, args);
          }
      };
  }
  window.onload = handleLayout;
  window.onresize = throttle(handleLayout, 100, this);
})();