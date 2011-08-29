/*!
 *Copyright (c) 2011 Cykod LLC
 Dual licensed under the MIT license and the GPL license

*/


/*
This module adds a ace editor that shows up in individual slides

*/



(function($, deck, window, undefined) {
  var $d = $(document),
  $window = $(window),
  JavaScriptMode,
  HTMLMode

  function runCode(element) {
    iframe = document.createElement("IFRAME"); 
    iframe.style.width = ($(element).width()-2) + "px";
    iframe.style.height = ($(element).height()-2) + "px";
    iframe.style.overflow = 'auto';
    iframe.style.border ="none";

    var dest = $(element).attr('data-target');
    var destination = $("#" + dest );
    $(destination).html("").append(iframe);


    var editor = $(element).data('editor');
    var code = editor.getSession().getValue();

    var language = $(element).attr('data-language');


    if($(element).attr('data-save')) {
      localStorage[$(element).attr('data-save')] = code;
    }

    if(language == 'js') {
      code = "<scr" + "ipt>\n" + code + "\n</scr" + "ipt>";
    }

    code = "<!DOCTYPE HTML><html><head><scr" + "ipt src='js/jquery.min.js'></scr" + "ipt></head><body>" + code + '</body></html>';

    writeIFrame(iframe,code);
  }



  function writeIFrame(iframe,code) {
    iframe = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
    iframe.document.open();
    iframe.document.write(code);
    iframe.document.close();
  }



 function focusCallback() {
   disableKeyboardEvents = true;
  }

  function blurCallback() {
    disableKeyboardEvents = false;
  }


  $d.bind('deck.init',function() {

    $("a").attr('target','_blank');

    JavaScriptMode = require("ace/mode/javascript").Mode;
    HTMLMode = require("ace/mode/html").Mode;

    $.each($[deck]('getSlides'), function(idx, $el) {
      var slide = $($el);

      slide.find(".coder-editor").attr({
        'id': 'editor-' + idx,
        'data-target' : 'destination-' + idx
        }).wrapAll("<div class='coder-wrapper'></div>").css('position','static');

       $("<div class='coder-destination' id='destination-" + idx + "'></div>").insertAfter("#editor-"+idx);
        var solution = slide.find("script[type=codedeck]")[0]
        if(solution) {
          $(solution).attr({ 'id' : 'solution-' + idx });
          slide.find(".coder-editor").attr({ 'data-solution' : 'solution-' + idx });
        }

      });

  });



  $d.bind('deck.change',function(e,from,to) {
    var current =$[deck]('getSlide', to);
        
    current.find(".coder-editor").each(function() {
      if(!$(this).hasClass('coderEditor')) {
        var element = this;

        var html = $(this).html().replace(/SCRIPT/g,'<script>').replace(/END/,'</s' + 'cript>').replace(/&lt;/g,'<').replace(/&gt;/g,'>');

        $(this).css('visibility','visible');

        $(this).css('height',$(current).height() - $(this).position().top - 80);

        var slideWidth = $[deck]('getSlide', from).width();
        $(element).css('width',slideWidth);
        var editor = ace.edit(this.id);
        $(this).addClass('coderEditor');


        var language = $(element).attr('data-language');

        if(language == 'js') {
          editor.getSession().setMode(new JavaScriptMode());
        } else {
          editor.getSession().setMode(new HTMLMode());
        }

        setTimeout(function() {
          if($(element).attr('data-save') && localStorage[$(element).attr('data-save')]) {
            editor.getSession().setValue(localStorage[$(element).attr('data-save')]);
          } else {
            editor.getSession().setValue(html);
          }
        },500);

        $(this).data('editor',editor);
        editor.on('focus', focusCallback);
        editor.on('blur', blurCallback);


        var dest = $(element).attr('data-target');
        var destination = $("#" + dest );


        destination.css('height',$(current).height() - $(this).position().top - 80);


        $("<button>Run</button>").insertBefore(this).click(function() {
          $(element).hide();
          $(destination).show();
          runCode(element);

        });
        $("<button>Toggle</button>").insertBefore(this).click(function() {
          $(destination).toggle();
          $(element).toggle();

        });

        var solution = $(this).attr('data-solution');
        if(solution) {
          $("<button>Solution</button>").insertBefore(this).click(function() {
              var html = $("#" + solution).html().replace(/SCRIPT/g,'<script>').replace(/END/,'</s' + 'cript>');
          editor.getSession().setValue(html);

          });
        }
      }
    });
    
  });

})(jQuery,'deck',this);
