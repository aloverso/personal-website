/**
 * Modified from base script by: Kaushik Gopal
 */
(function () {

  $(window).on("load", function() {
    const $footnotes = $(".footnotes");

    loadSideNotesFromFootnotes($footnotes);

    $(window).resize(function() {
      loadSideNotesFromFootnotes($footnotes);
    });
  });

  function loadSideNotesFromFootnotes($footnotes) {

    // remove any existing side notes to begin
    $(".sidenote").remove();

    // show as footnotes if the sidebar is at the bottom
    const $sidebar = $('side');
    if ($sidebar.position() && ($sidebar.position().top > $sidebar.position().left)) {
      $footnotes.show();
      return;
    }

    const $fnItems = $footnotes.find("ol li");

    $("sup").each(function(index) {
      const $footnoteText = $fnItems.eq(index)[0].innerHTML;
      createSideNote($(this), $footnoteText, $sidebar);
    });

    $footnotes.hide();
  }

  function createSideNote(superscript, footnoteText, sidebar) {

    let div = $(document.createElement('div'))
      .html(footnoteText)
      .addClass("sidenote");

    // ideal position
    let topPosition = superscript.offset().top;

    // move down below backlink box if necessary
    const $backlinkBox = $('.backlink-box');
    const backlinkBoxBottom = $backlinkBox.offset().top + $backlinkBox.height();
    if (topPosition < backlinkBoxBottom) {
        topPosition = backlinkBoxBottom + 40;
    }

    // move down below another overlapping footnote if necessary
    const $allSidenotes = $('.sidenote')
    if ($allSidenotes.length > 0) {
      const $lastSidenote = $allSidenotes.last()
      const lastSidenoteBottom = $lastSidenote.offset().top + $lastSidenote.height();

      if (topPosition < lastSidenoteBottom) {
        topPosition = lastSidenoteBottom + 10;
      }
    }

    div.css({
      position: "absolute",
      left: sidebar.position().left,
      top: topPosition,
      width: sidebar.width(),
    });

    superscript.hover(function() {
      div.addClass("sidenote-hover");
    }, function () {
      div.removeClass("sidenote-hover");
    });

    $(document.body).append(div);

    // remove arrow backlink indicator
    $('.reversefootnote').remove()
  }

})();