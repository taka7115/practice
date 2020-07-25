export default {
  id: 3,
  ttl: '<span></span><br class="u-sp">',
  txt: "3作品目の情報が入ります。",
  alt: "3作品目の情報が入ります。",
  p1: "",
  p1_color: "js-yellow",
  p1_list1: "<span>&#9642;</span>",
  p1_list2: "<span>&#9642;</span>",
  p2: '',
  p2_color: "js-yellow",
  p2_list1: "<span>&#9642;</span>",
  p2_list2: "<span>&#9642;</span>",
  p3: '',
  p3_color: "js-yellow",
  p3_list1: "<span>&#9642;</span>",
  p3_list2: "<span>&#9642;</span>",
  func
}


/**
 * js--------------------------------------
 */

function func() {
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  /* global jQuery */

  /**
   * jQueryオブジェクトの拡張can
   *
   * @date 2016-06-02
   */
  (function ($) {
    /**
     * userAgent判定フラグ
     *
     * @date 2016-06-02
     */
    var ua = navigator.userAgent.toLowerCase();
    $.ua = {
      // Windows
      isWindows: /windows/.test(ua),
      // Mac
      isMac: /macintosh/.test(ua),
      // IE
      isIE: /msie (\d+)|trident/.test(ua),
      // IE9未満
      isLtIE9: /msie (\d+)/.test(ua) && RegExp.$1 < 9,
      // IE10未満
      isLtIE10: /msie (\d+)/.test(ua) && RegExp.$1 < 10,
      // Firefox
      isFirefox: /firefox/.test(ua),
      // WebKit
      isWebKit: /applewebkit/.test(ua),
      // Chrome
      isChrome: /chrome/.test(ua),
      // Safari
      isSafari: /safari/.test(ua) && !/chrome/.test(ua) && !/mobile/.test(ua),
      // iOS
      isIOS: /i(phone|pod|pad)/.test(ua),
      // iOS Chrome
      isIOSChrome: /crios/.test(ua),
      // iPhone、iPod touch
      isIPhone: /i(phone|pod)/.test(ua),
      // iPad
      isIPad: /ipad/.test(ua),
      // Android
      isAndroid: /android/.test(ua),
      // モバイル版Android
      isAndroidMobile: /android(.+)?mobile/.test(ua),
      // タッチデバイス
      isTouchDevice: 'ontouchstart' in window,
      // スマートフォン
      isMobile: /i(phone|pod)/.test(ua) || /android(.+)?mobile/.test(ua),
      // タブレット型端末
      isTablet: /ipad/.test(ua) || /android/.test(ua) && !/mobile/.test(ua)
    };

    /**
     * ロールオーバー
     *
     * @date 2012-10-01
     *
     * @example $('.rollover').rollover();
     * @example $('.rollover').rollover({ over: '-ov' });
     * @example $('.rollover').rollover({ current: '_cr', currentOver: '_cr_ov' });
     * @example $('.rollover').rollover({ down: '_click' });
     */
    $.fn.rollover = function (options) {
      var defaults = {
        over: '_ov',
        current: null,
        currentOver: null,
        down: null
      };
      var settings = $.extend({}, defaults, options);
      var over = settings.over;
      var current = settings.current;
      var currentOver = settings.currentOver;
      var down = settings.down;
      return this.each(function () {
        var src = this.src;
        var ext = /\.(gif|jpe?g|png)(\?.*)?/.exec(src)[0];
        var isCurrent = current && new RegExp(current + ext).test(src);
        if (isCurrent && !currentOver) return;
        var search = isCurrent && currentOver ? current + ext : ext;
        var replace = isCurrent && currentOver ? currentOver + ext : over + ext;
        var overSrc = src.replace(search, replace);
        new Image().src = overSrc;
        $(this).mouseout(function () {
          this.src = src;
        }).mouseover(function () {
          this.src = overSrc;
        });

        if (down) {
          var downSrc = src.replace(search, down + ext);
          new Image().src = downSrc;
          $(this).mousedown(function () {
            this.src = downSrc;
          });
        }
      });
    };

    /**
     * フェードロールオーバー
     *
     * @date 2012-11-21
     *
     * @example $('.faderollover').fadeRollover();
     * @example $('.faderollover').fadeRollover({ over: '-ov' });
     * @example $('.faderollover').fadeRollover({ current: '_cr', currentOver: '_cr_ov' });
     */
    $.fn.fadeRollover = function (options) {
      var defaults = {
        over: '_ov',
        current: null,
        currentOver: null
      };
      var settings = $.extend({}, defaults, options);
      var over = settings.over;
      var current = settings.current;
      var currentOver = settings.currentOver;
      return this.each(function () {
        var src = this.src;
        var ext = /\.(gif|jpe?g|png)(\?.*)?/.exec(src)[0];
        var isCurrent = current && new RegExp(current + ext).test(src);
        if (isCurrent && !currentOver) return;
        var search = isCurrent && currentOver ? current + ext : ext;
        var replace = isCurrent && currentOver ? currentOver + ext : over + ext;
        var overSrc = src.replace(search, replace);
        new Image().src = overSrc;

        $(this).parent().css('display', 'block').css('width', $(this).attr('width')).css('height', $(this).attr('height')).css('background', 'url("' + overSrc + '") no-repeat');

        $(this).parent().hover(function () {
          $(this).find('img').stop().animate({
            opacity: 0
          }, 200);
        }, function () {
          $(this).find('img').stop().animate({
            opacity: 1
          }, 200);
        });
      });
    };

    /**
     * スムーズスクロール
     *
     * @date 2014-12-01
     *
     * @example $.scroller();
     * @example $.scroller({ hashMarkEnabled: true });
     * @example $.scroller({ scopeSelector: '#container', noScrollSelector: '.no-scroll' });
     * @example $.scroller('#content');
     * @example $.scroller('#content', { pitch: 20, delay: 5, marginTop: 200, callback: function(){} });
     */
    $.scroller = function () {
      var self = $.scroller.prototype;
      if (!arguments[0] || _typeof(arguments[0]) == 'object') {
        self.init.apply(self, arguments);
      } else {
        self.scroll.apply(self, arguments);
      }
    };

    // プロトタイプにメンバを定義
    $.scroller.prototype = {
      // 初期設定
      defaults: {
        hashMarkEnabled: false,
        scopeSelector: 'body',
        noScrollSelector: '.noscroll',
        pitch: 10,
        delay: 10,
        marginTop: 0,
        callback: function callback() {}
      },

      // 初期化
      init: function init(options) {
        var self = this;
        var settings = this.settings = $.extend({}, this.defaults, options);
        $(settings.scopeSelector).find('a[href^="#"]').not(settings.noScrollSelector).each(function () {
          var hash = this.hash || '#';
          var eventName = 'click.scroller';
          $(this).off(eventName).on(eventName, function (e) {
            e.preventDefault();
            this.blur();
            self.scroll(hash, settings);
          });
        });
      },

      // スクロールを実行
      scroll: function scroll(id, options) {
        if (this.timer) this.clearScroll();
        var settings = options ? $.extend({}, this.defaults, options) : this.settings ? this.settings : this.defaults;
        if (!settings.hashMarkEnabled && id == '#') return;
        var self = this;
        var win = window;
        var $win = $(win);
        var d = document;
        var pitch = settings.pitch;
        var delay = settings.delay;
        var scrollLeft = $win.scrollLeft();
        if (($.ua.isIPhone || $.ua.isAndroidMobile) && win.pageYOffset === 0) win.scrollTo(scrollLeft, $.ua.isAndroidMobile ? 1 : 0);
        var scrollEnd = id == '#' ? 0 : $(id + ', a[name="' + id.substr(1) + '"]').eq(0).offset().top;
        var windowHeight = $.ua.isAndroidMobile ? Math.ceil(win.innerWidth / win.outerWidth * win.outerHeight) : win.innerHeight || d.documentElement.clientHeight;
        var scrollableEnd = $(d).height() - windowHeight;
        if (scrollableEnd < 0) scrollableEnd = 0;
        scrollEnd = scrollEnd - settings.marginTop;
        if (scrollEnd > scrollableEnd) scrollEnd = scrollableEnd;
        if (scrollEnd < 0) scrollEnd = 0;
        scrollEnd = Math.floor(scrollEnd);

        if ($.ua.isAndroid && scrollEnd === 0) scrollEnd = 1;
        var dir = scrollEnd > $win.scrollTop() ? 1 : -1;
        (function _scroll() {
          var prev = self.prev;
          var current = self.current || $win.scrollTop();
          if (current == scrollEnd || typeof prev == 'number' && (dir > 0 && current < prev || dir < 0 && current > prev)) {
            self.clearScroll();
            settings.callback();
            return;
          }
          var next = current + (scrollEnd - current) / pitch + dir;
          if (dir > 0 && next > scrollEnd || dir < 0 && next < scrollEnd) next = scrollEnd;
          win.scrollTo(scrollLeft, next);
          self.prev = current;
          self.current = next;
          self.timer = setTimeout(function () {
            _scroll();
          }, delay);
        })();
      },

      // スクロールを解除
      clearScroll: function clearScroll() {
        clearTimeout(this.timer);
        this.timer = null;
        this.prev = null;
        this.current = null;
      }
    };

    /**
     * 文字列からオブジェクトに変換したクエリを取得
     *
     * @example $.getQuery();
     * @example $.getQuery('a=foo&b=bar&c=foobar');
     */
    $.getQuery = function (str) {
      if (!str) str = location.search;
      str = str.replace(/^.*?\?/, '');
      var query = {};
      var temp = str.split(/&/);
      for (var i = 0, l = temp.length; i < l; i++) {
        var param = temp[i].split(/=/);
        query[param[0]] = decodeURIComponent(param[1]);
      }
      return query;
    };

    /**
     * 画像をプリロード
     *
     * @date 2012-09-12
     *
     * @example $.preLoadImages('/img/01.jpg');
     */
    var cache = [];
    $.preLoadImages = function () {
      var args_len = arguments.length;
      for (var i = args_len; i--;) {
        var cacheImage = document.createElement('img');
        cacheImage.src = arguments[i];
        cache.push(cacheImage);
      }
    };
  })(jQuery);

  /**
   * guide_ya_san
   *
   * @date 2017-04-07
   */
  var GUIDEYASAN = function ($) {
    var $win = $(window);
    var $body = $('body');
    var scrollTop = void 0;

    // 初期化
    var _init = function _init() {

      $(function () {
        $.scroller();

        _spNav();
        _setHdr();
        _navCurrent();
        _cmnWaves();

        $win.on('scroll', function () {
          scrollTop = $win.scrollTop();
        });
      });
    };

    // ヘッダー出没
    var _setHdr = function _setHdr() {
      var $hdr = $('#hdr');
      var startPos = 0;
      var hdrStatus = '';
      var hdrHidePos = 300;

      var _hdrEvent = function _hdrEvent() {
        var currentPos = scrollTop;

        if (currentPos > startPos) {
          if (scrollTop >= hdrHidePos && hdrStatus != 'show') {
            $body.addClass('is-hide-hdr');
            hdrStatus = 'show';
          }
        } else {
          $body.removeClass('is-hide-hdr');
          hdrStatus = 'hide';
        }
        startPos = currentPos;
      };

      _hdrEvent();
      $win.on('scroll', function () {
        _hdrEvent();
      });
    };

    // スマホナビ
    var _spNav = function _spNav() {
      var $mask = $('#mask');
      var $gNavSpOpenBtn = $('#js-opanSpNav');
      var $gNavSpBtnCloseBtn = $('#js-closeSpNav');
      var $gNavSp = $('#gNavSp');

      var _fadeTime = 300;

      $gNavSpOpenBtn.on('click', function () {
        $gNavSp.addClass('is-open');
        $mask.fadeIn(_fadeTime);
      });

      $gNavSpBtnCloseBtn.on('click', function () {
        $gNavSp.removeClass('is-open');
        $mask.fadeOut(_fadeTime);
      });
      $mask.on('click', function () {
        $gNavSp.removeClass('is-open');
        $mask.fadeOut(_fadeTime);
      });
    };

    // PCナビのカレント
    var _navCurrent = function _navCurrent() {
      if ($body.hasClass('page-top')) {
        $('#js-gNavPc_Item-top').addClass('is-current');
      } else if ($body.hasClass('page-plan')) {
        $('#js-gNavPc_Item-plan').addClass('is-current');
      } else if ($body.hasClass('page-koe')) {
        $('#js-gNavPc_Item-koe').addClass('is-current');
      } else if ($body.hasClass('page-faq')) {
        $('#js-gNavPc_Item-faq').addClass('is-current');
      } else if ($body.hasClass('page-practicalinformation')) {
        $('#js-gNavPc_Item-practicalinformation').addClass('is-current');
      }
    };

    // 波
    var _cmnWaves = function _cmnWaves() {

      var unit = 50;
      var canvasList = void 0; // キャンバスの配列
      var convasColor = void 0;
      var info = {}; // 全キャンバス共通の描画情報

      /**
       * Init function.
       *
       * Initialize variables and begin the animation.
       */
      function _comWaveInit() {
        info.seconds = 0;
        info.t = 0;
        canvasList = [];
        convasColor = [];

        if (!$body.hasClass('page-top')) {
          if (!$body.hasClass('page-planDetail')) {
            // メインビジュアル下
            canvasList.push(document.getElementById('js-mainCover_wave'));
            convasColor.push('#fff');
          }
        }

        // 最下層コンバージョン
        canvasList.push(document.getElementById('js-contact_wave'));
        convasColor.push('#d6e8fa');

        // 各キャンバスの初期化
        for (var canvasIndex in canvasList) {
          var _canvas = canvasList[canvasIndex];
          _canvas.width = document.documentElement.clientWidth;
          _canvas.height = 50;
          _canvas.contextCache = _canvas.getContext('2d');
        }

        // ブラウザリサイズ
        $win.on('resize', function () {
          for (var _canvasIndex in canvasList) {
            canvas = canvasList[_canvasIndex];
            canvas.width = document.documentElement.clientWidth;
          }
        });

        // 共通の更新処理呼び出し
        update();
      }

      function update() {
        for (var canvasIndex in canvasList) {
          var _canvas2 = canvasList[canvasIndex];
          // 各キャンバスの描画
          draw(_canvas2, convasColor[canvasIndex]);
        }
        // 共通の描画情報の更新
        info.seconds = info.seconds + 0.014;
        info.t = info.seconds * Math.PI;
        // 自身の再起呼び出し
        setTimeout(update, 65);
      }

      /**
       * Draw animation function.
       *
       * This function draws one frame of the animation, waits 20ms, and then calls
       * itself again.
       */
      function draw(canvas, color) {
        // 対象のcanvasのコンテキストを取得
        var context = canvas.contextCache;
        // キャンバスの描画をクリア
        context.clearRect(0, 0, canvas.width, canvas.height);

        //波を描画
        drawWave(canvas, color, 1, 3, 0);
      };

      /**
       * 波を描画
       * drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
       */
      function drawWave(canvas, color, alpha, zoom, delay) {
        var context = canvas.contextCache;
        context.fillStyle = color;
        context.globalAlpha = alpha;

        context.beginPath(); //パスの開始
        drawSine(canvas, info.t / 0.5, zoom, delay);
        context.lineTo(canvas.width + 10, canvas.height); //パスをCanvasの右下へ
        context.lineTo(0, canvas.height); //パスをCanvasの左下へ
        context.closePath(); //パスを閉じる
        context.fill(); //塗りつぶす
      }

      /**
       * Function to draw sine
       *
       * The sine curve is drawn in 10px segments starting at the origin.
       * drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
       */
      function drawSine(canvas, t, zoom, delay) {
        var xAxis = Math.floor(canvas.height / 2);
        var yAxis = 0;
        var context = canvas.contextCache;
        // Set the initial x and y, starting at 0,0 and translating to the origin on the canvas.
        var x = t; //時間を横の位置とする
        var y = Math.sin(x) / zoom;
        context.moveTo(yAxis, unit * y + xAxis); //スタート位置にパスを置く

        // Loop to draw segments (横幅の分、波を描画)
        for (i = yAxis; i <= canvas.width + 10; i += 10) {
          x = t + (-yAxis + i) / unit / zoom;
          y = Math.sin(x - delay) / 3;
          context.lineTo(i, unit * y + xAxis);
        }
      }
      _comWaveInit();
    };

    return {
      init: function init() {
        window.console = window.console || {
          log: function log() {}
        };
        _init();
      }
    };
  }(jQuery);

  GUIDEYASAN.init();
}
