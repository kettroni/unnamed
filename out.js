(() => {
  // output/Color/index.js
  var white = "#FFF";
  var blue = "#00F";
  var black = "#000";

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(arr[i]);
      }
      return result;
    };
  };

  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Function/index.js
  var $$const = function(a) {
    return function(v) {
      return a;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Data.Semigroup/index.js
  var append = function(dict) {
    return dict.append;
  };

  // output/Control.Apply/index.js
  var apply = function(dict) {
    return dict.apply;
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var liftA1 = function(dictApplicative) {
    var apply2 = apply(dictApplicative.Apply0());
    var pure1 = pure(dictApplicative);
    return function(f) {
      return function(a) {
        return apply2(pure1(f))(a);
      };
    };
  };

  // output/Data.Bounded/foreign.js
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Maybe/index.js
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a) {
      return [a];
    }
    function array2(a) {
      return function(b) {
        return [a, b];
      };
    }
    function array3(a) {
      return function(b) {
        return function(c) {
          return [a, b, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply2) {
      return function(map2) {
        return function(pure2) {
          return function(f) {
            return function(array) {
              function go(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure2([]);
                  case 1:
                    return map2(array1)(f(array[bot]));
                  case 2:
                    return apply2(map2(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply2(apply2(map2(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply2(map2(concat2)(go(bot, pivot)))(go(pivot, top2));
                }
              }
              return go(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Monoid/index.js
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init) {
      return function(xs) {
        var acc = init;
        var len = xs.length;
        for (var i = len - 1; i >= 0; i--) {
          acc = f(xs[i])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init) {
      return function(xs) {
        var acc = init;
        var len = xs.length;
        for (var i = 0; i < len; i++) {
          acc = f(acc)(xs[i]);
        }
        return acc;
      };
    };
  };

  // output/Control.Bind/index.js
  var bind = function(dict) {
    return dict.bind;
  };

  // output/Data.Foldable/index.js
  var foldr = function(dict) {
    return dict.foldr;
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr2 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append2 = append(dictMonoid.Semigroup0());
      var mempty2 = mempty(dictMonoid);
      return function(f) {
        return foldr2(function(x) {
          return function(acc) {
            return append2(f(x))(acc);
          };
        })(mempty2);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };

  // output/Data.Traversable/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var traverse = function(dict) {
    return dict.traverse;
  };
  var sequenceDefault = function(dictTraversable) {
    var traverse2 = traverse(dictTraversable);
    return function(dictApplicative) {
      return traverse2(dictApplicative)(identity2);
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
    },
    sequence: function(dictApplicative) {
      return sequenceDefault(traversableArray)(dictApplicative);
    },
    Functor0: function() {
      return functorArray;
    },
    Foldable1: function() {
      return foldableArray;
    }
  };

  // output/Effect/foreign.js
  var pureE = function(a) {
    return function() {
      return a;
    };
  };
  var bindE = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind2 = bind(dictMonad.Bind1());
    var pure2 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a) {
        return bind2(f)(function(f$prime) {
          return bind2(a)(function(a$prime) {
            return pure2(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name2, moduleName, init) {
    var state = 0;
    var val;
    return function(lineNumber) {
      if (state === 2)
        return val;
      if (state === 1)
        throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state = 1;
      val = init();
      state = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);

  // output/Graphics.Canvas/foreign.js
  function getCanvasElementByIdImpl(id, Just2, Nothing2) {
    return function() {
      var el = document.getElementById(id);
      if (el && el instanceof HTMLCanvasElement) {
        return Just2(el);
      } else {
        return Nothing2;
      }
    };
  }
  function getContext2D(c) {
    return function() {
      return c.getContext("2d");
    };
  }
  function getCanvasWidth(canvas) {
    return function() {
      return canvas.width;
    };
  }
  function getCanvasHeight(canvas) {
    return function() {
      return canvas.height;
    };
  }
  function setFillStyle(ctx) {
    return function(style) {
      return function() {
        ctx.fillStyle = style;
      };
    };
  }
  function fillRect(ctx) {
    return function(r) {
      return function() {
        ctx.fillRect(r.x, r.y, r.width, r.height);
      };
    };
  }
  function createLinearGradient(ctx) {
    return function(linearGradient) {
      return function() {
        return ctx.createLinearGradient(linearGradient.x0, linearGradient.y0, linearGradient.x1, linearGradient.y1);
      };
    };
  }
  function addColorStop(gradient) {
    return function(stop) {
      return function(color) {
        return function() {
          gradient.addColorStop(stop, color);
        };
      };
    };
  }
  function setGradientFillStyle(ctx) {
    return function(gradient) {
      return function() {
        ctx.fillStyle = gradient;
      };
    };
  }

  // output/Graphics.Canvas/index.js
  var getCanvasElementById = function(elId) {
    return getCanvasElementByIdImpl(elId, Just.create, Nothing.value);
  };
  var getCanvasDimensions = function(ce) {
    return function __do2() {
      var w = getCanvasWidth(ce)();
      var h = getCanvasHeight(ce)();
      return {
        width: w,
        height: h
      };
    };
  };

  // output/Main/index.js
  var myAddColorStop = function(gradient) {
    return function(colorStop) {
      return addColorStop(gradient)(colorStop.position)(colorStop.color);
    };
  };
  var defaultRectangle = {
    x: 0,
    y: 0,
    width: 300,
    height: 300
  };
  var defaultGradient = /* @__PURE__ */ function() {
    return {
      x0: defaultRectangle.x,
      y0: defaultRectangle.y,
      x1: defaultRectangle.x + defaultRectangle.width,
      y1: defaultRectangle.y + defaultRectangle.height
    };
  }();
  var setDefaultGradientFillStyle = function(dictTraversable) {
    var traverse2 = traverse(dictTraversable)(applicativeEffect);
    return function(ctx) {
      return function(colorStops) {
        return function __do2() {
          var canvasGradient = createLinearGradient(ctx)(defaultGradient)();
          traverse2(myAddColorStop(canvasGradient))(colorStops)();
          return setGradientFillStyle(ctx)(canvasGradient)();
        };
      };
    };
  };
  var setDefaultGradientFillStyle1 = /* @__PURE__ */ setDefaultGradientFillStyle(traversableArray);
  var defaultColorStops = [{
    position: 0,
    color: blue
  }, {
    position: 0.5,
    color: black
  }, {
    position: 1,
    color: white
  }];
  var backgroundRect = function(canvas) {
    return function __do2() {
      var dims = getCanvasDimensions(canvas)();
      return {
        x: 0,
        y: 0,
        width: dims.height,
        height: dims.width
      };
    };
  };
  var renderBackgroundColor = function(ctx) {
    return function(canvas) {
      return function(color) {
        return function __do2() {
          setFillStyle(ctx)(color)();
          var r = backgroundRect(canvas)();
          return fillRect(ctx)(r)();
        };
      };
    };
  };
  var main = /* @__PURE__ */ $$void(functorEffect)(function __do() {
    var v = getCanvasElementById("canvas")();
    if (v instanceof Just) {
      var ctx = getContext2D(v.value0)();
      renderBackgroundColor(ctx)(v.value0)(black)();
      setDefaultGradientFillStyle1(ctx)(defaultColorStops)();
      return fillRect(ctx)(defaultRectangle)();
    }
    ;
    throw new Error("Failed pattern match at Main (line 14, column 3 - line 14, column 47): " + [v.constructor.name]);
  });

  // main.js
  (() => {
    main();
  })();
})();
