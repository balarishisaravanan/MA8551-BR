/* decimal.js v10.2.1 https://github.com/MikeMcl/decimal.js/LICENCE */ !(function (
  n
) {
  "use strict";
  var h,
    S,
    e,
    o,
    u = 9e15,
    g = 1e9,
    m = "0123456789abcdef",
    t =
      "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",
    r =
      "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",
    c = {
      precision: 20,
      rounding: 4,
      modulo: 1,
      toExpNeg: -7,
      toExpPos: 21,
      minE: -u,
      maxE: u,
      crypto: !1,
    },
    N = !0,
    f = "[DecimalError] ",
    w = f + "Invalid argument: ",
    s = f + "Precision limit exceeded",
    a = f + "crypto unavailable",
    Z = Math.floor,
    v = Math.pow,
    l = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
    d = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
    p = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
    b = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
    P = 1e7,
    R = 7,
    E = t.length - 1,
    x = r.length - 1,
    y = { name: "[object Decimal]" };
  function M(n) {
    var e,
      i,
      t,
      r = n.length - 1,
      s = "",
      o = n[0];
    if (0 < r) {
      for (s += o, e = 1; e < r; e++)
        (t = n[e] + ""), (i = R - t.length) && (s += B(i)), (s += t);
      (o = n[e]), (i = R - (t = o + "").length) && (s += B(i));
    } else if (0 === o) return "0";
    for (; o % 10 == 0; ) o /= 10;
    return s + o;
  }
  function q(n, e, i) {
    if (n !== ~~n || n < e || i < n) throw Error(w + n);
  }
  function O(n, e, i, t) {
    for (var r, s, o = n[0]; 10 <= o; o /= 10) --e;
    return (
      --e < 0 ? ((e += R), (r = 0)) : ((r = Math.ceil((e + 1) / R)), (e %= R)),
      (o = v(10, R - e)),
      (s = n[r] % o | 0),
      null == t
        ? e < 3
          ? (0 == e ? (s = (s / 100) | 0) : 1 == e && (s = (s / 10) | 0),
            (i < 4 && 99999 == s) ||
              (3 < i && 49999 == s) ||
              5e4 == s ||
              0 == s)
          : (((i < 4 && s + 1 == o) || (3 < i && s + 1 == o / 2)) &&
              ((n[r + 1] / o / 100) | 0) == v(10, e - 2) - 1) ||
            ((s == o / 2 || 0 == s) && 0 == ((n[r + 1] / o / 100) | 0))
        : e < 4
        ? (0 == e
            ? (s = (s / 1e3) | 0)
            : 1 == e
            ? (s = (s / 100) | 0)
            : 2 == e && (s = (s / 10) | 0),
          ((t || i < 4) && 9999 == s) || (!t && 3 < i && 4999 == s))
        : (((t || i < 4) && s + 1 == o) || (!t && 3 < i && s + 1 == o / 2)) &&
          ((n[r + 1] / o / 1e3) | 0) == v(10, e - 3) - 1
    );
  }
  function D(n, e, i) {
    for (var t, r, s = [0], o = 0, u = n.length; o < u; ) {
      for (r = s.length; r--; ) s[r] *= e;
      for (s[0] += m.indexOf(n.charAt(o++)), t = 0; t < s.length; t++)
        s[t] > i - 1 &&
          (void 0 === s[t + 1] && (s[t + 1] = 0),
          (s[t + 1] += (s[t] / i) | 0),
          (s[t] %= i));
    }
    return s.reverse();
  }
  (y.absoluteValue = y.abs = function () {
    var n = new this.constructor(this);
    return n.s < 0 && (n.s = 1), _(n);
  }),
    (y.ceil = function () {
      return _(new this.constructor(this), this.e + 1, 2);
    }),
    (y.comparedTo = y.cmp = function (n) {
      var e,
        i,
        t,
        r,
        s = this,
        o = s.d,
        u = (n = new s.constructor(n)).d,
        c = s.s,
        f = n.s;
      if (!o || !u)
        return c && f
          ? c !== f
            ? c
            : o === u
            ? 0
            : !o ^ (c < 0)
            ? 1
            : -1
          : NaN;
      if (!o[0] || !u[0]) return o[0] ? c : u[0] ? -f : 0;
      if (c !== f) return c;
      if (s.e !== n.e) return (s.e > n.e) ^ (c < 0) ? 1 : -1;
      for (e = 0, i = (t = o.length) < (r = u.length) ? t : r; e < i; ++e)
        if (o[e] !== u[e]) return (o[e] > u[e]) ^ (c < 0) ? 1 : -1;
      return t === r ? 0 : (r < t) ^ (c < 0) ? 1 : -1;
    }),
    (y.cosine = y.cos = function () {
      var n,
        e,
        i = this,
        t = i.constructor;
      return i.d
        ? i.d[0]
          ? ((n = t.precision),
            (e = t.rounding),
            (t.precision = n + Math.max(i.e, i.sd()) + R),
            (t.rounding = 1),
            (i = (function (n, e) {
              var i,
                t,
                r = e.d.length;
              t =
                r < 32
                  ? ((i = Math.ceil(r / 3)), (1 / K(4, i)).toString())
                  : ((i = 16), "2.3283064365386962890625e-10");
              (n.precision += i), (e = G(n, 1, e.times(t), new n(1)));
              for (var s = i; s--; ) {
                var o = e.times(e);
                e = o.times(o).minus(o).times(8).plus(1);
              }
              return (n.precision -= i), e;
            })(t, Q(t, i))),
            (t.precision = n),
            (t.rounding = e),
            _(2 == o || 3 == o ? i.neg() : i, n, e, !0))
          : new t(1)
        : new t(NaN);
    }),
    (y.cubeRoot = y.cbrt = function () {
      var n,
        e,
        i,
        t,
        r,
        s,
        o,
        u,
        c,
        f,
        a = this,
        h = a.constructor;
      if (!a.isFinite() || a.isZero()) return new h(a);
      for (
        N = !1,
          (s = a.s * v(a.s * a, 1 / 3)) && Math.abs(s) != 1 / 0
            ? (t = new h(s.toString()))
            : ((i = M(a.d)),
              (s = ((n = a.e) - i.length + 1) % 3) &&
                (i += 1 == s || -2 == s ? "0" : "00"),
              (s = v(i, 1 / 3)),
              (n = Z((n + 1) / 3) - (n % 3 == (n < 0 ? -1 : 2))),
              ((t = new h(
                (i =
                  s == 1 / 0
                    ? "5e" + n
                    : (i = s.toExponential()).slice(0, i.indexOf("e") + 1) + n)
              )).s = a.s)),
          o = (n = h.precision) + 3;
        ;

      )
        if (
          ((f = (c = (u = t).times(u).times(u)).plus(a)),
          (t = F(f.plus(a).times(u), f.plus(c), o + 2, 1)),
          M(u.d).slice(0, o) === (i = M(t.d)).slice(0, o))
        ) {
          if ("9999" != (i = i.slice(o - 3, o + 1)) && (r || "4999" != i)) {
            (+i && (+i.slice(1) || "5" != i.charAt(0))) ||
              (_(t, n + 1, 1), (e = !t.times(t).times(t).eq(a)));
            break;
          }
          if (!r && (_(u, n + 1, 0), u.times(u).times(u).eq(a))) {
            t = u;
            break;
          }
          (o += 4), (r = 1);
        }
      return (N = !0), _(t, n, h.rounding, e);
    }),
    (y.decimalPlaces = y.dp = function () {
      var n,
        e = this.d,
        i = NaN;
      if (e) {
        if (((i = ((n = e.length - 1) - Z(this.e / R)) * R), (n = e[n])))
          for (; n % 10 == 0; n /= 10) i--;
        i < 0 && (i = 0);
      }
      return i;
    }),
    (y.dividedBy = y.div = function (n) {
      return F(this, new this.constructor(n));
    }),
    (y.dividedToIntegerBy = y.divToInt = function (n) {
      var e = this.constructor;
      return _(F(this, new e(n), 0, 1, 1), e.precision, e.rounding);
    }),
    (y.equals = y.eq = function (n) {
      return 0 === this.cmp(n);
    }),
    (y.floor = function () {
      return _(new this.constructor(this), this.e + 1, 3);
    }),
    (y.greaterThan = y.gt = function (n) {
      return 0 < this.cmp(n);
    }),
    (y.greaterThanOrEqualTo = y.gte = function (n) {
      var e = this.cmp(n);
      return 1 == e || 0 === e;
    }),
    (y.hyperbolicCosine = y.cosh = function () {
      var n,
        e,
        i,
        t,
        r,
        s = this,
        o = s.constructor,
        u = new o(1);
      if (!s.isFinite()) return new o(s.s ? 1 / 0 : NaN);
      if (s.isZero()) return u;
      (i = o.precision),
        (t = o.rounding),
        (o.precision = i + Math.max(s.e, s.sd()) + 4),
        (o.rounding = 1),
        (e =
          (r = s.d.length) < 32
            ? (1 / K(4, (n = Math.ceil(r / 3)))).toString()
            : ((n = 16), "2.3283064365386962890625e-10")),
        (s = G(o, 1, s.times(e), new o(1), !0));
      for (var c, f = n, a = new o(8); f--; )
        (c = s.times(s)), (s = u.minus(c.times(a.minus(c.times(a)))));
      return _(s, (o.precision = i), (o.rounding = t), !0);
    }),
    (y.hyperbolicSine = y.sinh = function () {
      var n,
        e,
        i,
        t,
        r = this,
        s = r.constructor;
      if (!r.isFinite() || r.isZero()) return new s(r);
      if (
        ((e = s.precision),
        (i = s.rounding),
        (s.precision = e + Math.max(r.e, r.sd()) + 4),
        (s.rounding = 1),
        (t = r.d.length) < 3)
      )
        r = G(s, 2, r, r, !0);
      else {
        (n = 16 < (n = 1.4 * Math.sqrt(t)) ? 16 : 0 | n),
          (r = G(s, 2, (r = r.times(1 / K(5, n))), r, !0));
        for (var o, u = new s(5), c = new s(16), f = new s(20); n--; )
          (o = r.times(r)), (r = r.times(u.plus(o.times(c.times(o).plus(f)))));
      }
      return _(r, (s.precision = e), (s.rounding = i), !0);
    }),
    (y.hyperbolicTangent = y.tanh = function () {
      var n,
        e,
        i = this,
        t = i.constructor;
      return i.isFinite()
        ? i.isZero()
          ? new t(i)
          : ((n = t.precision),
            (e = t.rounding),
            (t.precision = n + 7),
            (t.rounding = 1),
            F(i.sinh(), i.cosh(), (t.precision = n), (t.rounding = e)))
        : new t(i.s);
    }),
    (y.inverseCosine = y.acos = function () {
      var n,
        e = this,
        i = e.constructor,
        t = e.abs().cmp(1),
        r = i.precision,
        s = i.rounding;
      return -1 !== t
        ? 0 === t
          ? e.isNeg()
            ? I(i, r, s)
            : new i(0)
          : new i(NaN)
        : e.isZero()
        ? I(i, r + 4, s).times(0.5)
        : ((i.precision = r + 6),
          (i.rounding = 1),
          (e = e.asin()),
          (n = I(i, r + 4, s).times(0.5)),
          (i.precision = r),
          (i.rounding = s),
          n.minus(e));
    }),
    (y.inverseHyperbolicCosine = y.acosh = function () {
      var n,
        e,
        i = this,
        t = i.constructor;
      return i.lte(1)
        ? new t(i.eq(1) ? 0 : NaN)
        : i.isFinite()
        ? ((n = t.precision),
          (e = t.rounding),
          (t.precision = n + Math.max(Math.abs(i.e), i.sd()) + 4),
          (t.rounding = 1),
          (N = !1),
          (i = i.times(i).minus(1).sqrt().plus(i)),
          (N = !0),
          (t.precision = n),
          (t.rounding = e),
          i.ln())
        : new t(i);
    }),
    (y.inverseHyperbolicSine = y.asinh = function () {
      var n,
        e,
        i = this,
        t = i.constructor;
      return !i.isFinite() || i.isZero()
        ? new t(i)
        : ((n = t.precision),
          (e = t.rounding),
          (t.precision = n + 2 * Math.max(Math.abs(i.e), i.sd()) + 6),
          (t.rounding = 1),
          (N = !1),
          (i = i.times(i).plus(1).sqrt().plus(i)),
          (N = !0),
          (t.precision = n),
          (t.rounding = e),
          i.ln());
    }),
    (y.inverseHyperbolicTangent = y.atanh = function () {
      var n,
        e,
        i,
        t,
        r = this,
        s = r.constructor;
      return r.isFinite()
        ? 0 <= r.e
          ? new s(r.abs().eq(1) ? r.s / 0 : r.isZero() ? r : NaN)
          : ((n = s.precision),
            (e = s.rounding),
            (t = r.sd()),
            Math.max(t, n) < 2 * -r.e - 1
              ? _(new s(r), n, e, !0)
              : ((s.precision = i = t - r.e),
                (r = F(r.plus(1), new s(1).minus(r), i + n, 1)),
                (s.precision = n + 4),
                (s.rounding = 1),
                (r = r.ln()),
                (s.precision = n),
                (s.rounding = e),
                r.times(0.5)))
        : new s(NaN);
    }),
    (y.inverseSine = y.asin = function () {
      var n,
        e,
        i,
        t,
        r = this,
        s = r.constructor;
      return r.isZero()
        ? new s(r)
        : ((e = r.abs().cmp(1)),
          (i = s.precision),
          (t = s.rounding),
          -1 !== e
            ? 0 === e
              ? (((n = I(s, i + 4, t).times(0.5)).s = r.s), n)
              : new s(NaN)
            : ((s.precision = i + 6),
              (s.rounding = 1),
              (r = r.div(new s(1).minus(r.times(r)).sqrt().plus(1)).atan()),
              (s.precision = i),
              (s.rounding = t),
              r.times(2)));
    }),
    (y.inverseTangent = y.atan = function () {
      var n,
        e,
        i,
        t,
        r,
        s,
        o,
        u,
        c,
        f = this,
        a = f.constructor,
        h = a.precision,
        l = a.rounding;
      if (f.isFinite()) {
        if (f.isZero()) return new a(f);
        if (f.abs().eq(1) && h + 4 <= x)
          return ((o = I(a, h + 4, l).times(0.25)).s = f.s), o;
      } else {
        if (!f.s) return new a(NaN);
        if (h + 4 <= x) return ((o = I(a, h + 4, l).times(0.5)).s = f.s), o;
      }
      for (
        a.precision = u = h + 10,
          a.rounding = 1,
          n = i = Math.min(28, (u / R + 2) | 0);
        n;
        --n
      )
        f = f.div(f.times(f).plus(1).sqrt().plus(1));
      for (
        N = !1,
          e = Math.ceil(u / R),
          t = 1,
          c = f.times(f),
          o = new a(f),
          r = f;
        -1 !== n;

      )
        if (
          ((r = r.times(c)),
          (s = o.minus(r.div((t += 2)))),
          (r = r.times(c)),
          void 0 !== (o = s.plus(r.div((t += 2)))).d[e])
        )
          for (n = e; o.d[n] === s.d[n] && n--; );
      return (
        i && (o = o.times(2 << (i - 1))),
        (N = !0),
        _(o, (a.precision = h), (a.rounding = l), !0)
      );
    }),
    (y.isFinite = function () {
      return !!this.d;
    }),
    (y.isInteger = y.isInt = function () {
      return !!this.d && Z(this.e / R) > this.d.length - 2;
    }),
    (y.isNaN = function () {
      return !this.s;
    }),
    (y.isNegative = y.isNeg = function () {
      return this.s < 0;
    }),
    (y.isPositive = y.isPos = function () {
      return 0 < this.s;
    }),
    (y.isZero = function () {
      return !!this.d && 0 === this.d[0];
    }),
    (y.lessThan = y.lt = function (n) {
      return this.cmp(n) < 0;
    }),
    (y.lessThanOrEqualTo = y.lte = function (n) {
      return this.cmp(n) < 1;
    }),
    (y.logarithm = y.log = function (n) {
      var e,
        i,
        t,
        r,
        s,
        o,
        u,
        c,
        f = this,
        a = f.constructor,
        h = a.precision,
        l = a.rounding;
      if (null == n) (n = new a(10)), (e = !0);
      else {
        if (((i = (n = new a(n)).d), n.s < 0 || !i || !i[0] || n.eq(1)))
          return new a(NaN);
        e = n.eq(10);
      }
      if (((i = f.d), f.s < 0 || !i || !i[0] || f.eq(1)))
        return new a(i && !i[0] ? -1 / 0 : 1 != f.s ? NaN : i ? 0 : 1 / 0);
      if (e)
        if (1 < i.length) s = !0;
        else {
          for (r = i[0]; r % 10 == 0; ) r /= 10;
          s = 1 !== r;
        }
      if (
        ((N = !1),
        (o = W(f, (u = h + 5))),
        (t = e ? C(a, u + 10) : W(n, u)),
        O((c = F(o, t, u, 1)).d, (r = h), l))
      )
        do {
          if (
            ((o = W(f, (u += 10))),
            (t = e ? C(a, u + 10) : W(n, u)),
            (c = F(o, t, u, 1)),
            !s)
          ) {
            +M(c.d).slice(r + 1, r + 15) + 1 == 1e14 && (c = _(c, h + 1, 0));
            break;
          }
        } while (O(c.d, (r += 10), l));
      return (N = !0), _(c, h, l);
    }),
    (y.minus = y.sub = function (n) {
      var e,
        i,
        t,
        r,
        s,
        o,
        u,
        c,
        f,
        a,
        h,
        l,
        d = this,
        p = d.constructor;
      if (((n = new p(n)), !d.d || !n.d))
        return (
          d.s && n.s
            ? d.d
              ? (n.s = -n.s)
              : (n = new p(n.d || d.s !== n.s ? d : NaN))
            : (n = new p(NaN)),
          n
        );
      if (d.s != n.s) return (n.s = -n.s), d.plus(n);
      if (
        ((f = d.d),
        (l = n.d),
        (u = p.precision),
        (c = p.rounding),
        !f[0] || !l[0])
      ) {
        if (l[0]) n.s = -n.s;
        else {
          if (!f[0]) return new p(3 === c ? -0 : 0);
          n = new p(d);
        }
        return N ? _(n, u, c) : n;
      }
      if (((i = Z(n.e / R)), (a = Z(d.e / R)), (f = f.slice()), (s = a - i))) {
        for (
          o = (h = s < 0)
            ? ((e = f), (s = -s), l.length)
            : ((e = l), (i = a), f.length),
            (t = Math.max(Math.ceil(u / R), o) + 2) < s &&
              ((s = t), (e.length = 1)),
            e.reverse(),
            t = s;
          t--;

        )
          e.push(0);
        e.reverse();
      } else {
        for (
          (h = (t = f.length) < (o = l.length)) && (o = t), t = 0;
          t < o;
          t++
        )
          if (f[t] != l[t]) {
            h = f[t] < l[t];
            break;
          }
        s = 0;
      }
      for (
        h && ((e = f), (f = l), (l = e), (n.s = -n.s)),
          o = f.length,
          t = l.length - o;
        0 < t;
        --t
      )
        f[o++] = 0;
      for (t = l.length; s < t; ) {
        if (f[--t] < l[t]) {
          for (r = t; r && 0 === f[--r]; ) f[r] = P - 1;
          --f[r], (f[t] += P);
        }
        f[t] -= l[t];
      }
      for (; 0 === f[--o]; ) f.pop();
      for (; 0 === f[0]; f.shift()) --i;
      return f[0]
        ? ((n.d = f), (n.e = k(f, i)), N ? _(n, u, c) : n)
        : new p(3 === c ? -0 : 0);
    }),
    (y.modulo = y.mod = function (n) {
      var e,
        i = this,
        t = i.constructor;
      return (
        (n = new t(n)),
        !i.d || !n.s || (n.d && !n.d[0])
          ? new t(NaN)
          : !n.d || (i.d && !i.d[0])
          ? _(new t(i), t.precision, t.rounding)
          : ((N = !1),
            9 == t.modulo
              ? ((e = F(i, n.abs(), 0, 3, 1)).s *= n.s)
              : (e = F(i, n, 0, t.modulo, 1)),
            (e = e.times(n)),
            (N = !0),
            i.minus(e))
      );
    }),
    (y.naturalExponential = y.exp = function () {
      return $(this);
    }),
    (y.naturalLogarithm = y.ln = function () {
      return W(this);
    }),
    (y.negated = y.neg = function () {
      var n = new this.constructor(this);
      return (n.s = -n.s), _(n);
    }),
    (y.plus = y.add = function (n) {
      var e,
        i,
        t,
        r,
        s,
        o,
        u,
        c,
        f,
        a,
        h = this,
        l = h.constructor;
      if (((n = new l(n)), !h.d || !n.d))
        return (
          h.s && n.s
            ? h.d || (n = new l(n.d || h.s === n.s ? h : NaN))
            : (n = new l(NaN)),
          n
        );
      if (h.s != n.s) return (n.s = -n.s), h.minus(n);
      if (
        ((f = h.d),
        (a = n.d),
        (u = l.precision),
        (c = l.rounding),
        !f[0] || !a[0])
      )
        return a[0] || (n = new l(h)), N ? _(n, u, c) : n;
      if (((s = Z(h.e / R)), (t = Z(n.e / R)), (f = f.slice()), (r = s - t))) {
        for (
          (o =
            (o =
              r < 0
                ? ((i = f), (r = -r), a.length)
                : ((i = a), (t = s), f.length)) < (s = Math.ceil(u / R))
              ? s + 1
              : o + 1) < r && ((r = o), (i.length = 1)),
            i.reverse();
          r--;

        )
          i.push(0);
        i.reverse();
      }
      for (
        (o = f.length) - (r = a.length) < 0 &&
          ((r = o), (i = a), (a = f), (f = i)),
          e = 0;
        r;

      )
        (e = ((f[--r] = f[r] + a[r] + e) / P) | 0), (f[r] %= P);
      for (e && (f.unshift(e), ++t), o = f.length; 0 == f[--o]; ) f.pop();
      return (n.d = f), (n.e = k(f, t)), N ? _(n, u, c) : n;
    }),
    (y.precision = y.sd = function (n) {
      var e;
      if (void 0 !== n && n !== !!n && 1 !== n && 0 !== n) throw Error(w + n);
      return (
        this.d
          ? ((e = H(this.d)), n && this.e + 1 > e && (e = this.e + 1))
          : (e = NaN),
        e
      );
    }),
    (y.round = function () {
      var n = this.constructor;
      return _(new n(this), this.e + 1, n.rounding);
    }),
    (y.sine = y.sin = function () {
      var n,
        e,
        i = this,
        t = i.constructor;
      return i.isFinite()
        ? i.isZero()
          ? new t(i)
          : ((n = t.precision),
            (e = t.rounding),
            (t.precision = n + Math.max(i.e, i.sd()) + R),
            (t.rounding = 1),
            (i = (function (n, e) {
              var i,
                t = e.d.length;
              if (t < 3) return G(n, 2, e, e);
              (i = 16 < (i = 1.4 * Math.sqrt(t)) ? 16 : 0 | i),
                (e = e.times(1 / K(5, i))),
                (e = G(n, 2, e, e));
              for (var r, s = new n(5), o = new n(16), u = new n(20); i--; )
                (r = e.times(e)),
                  (e = e.times(s.plus(r.times(o.times(r).minus(u)))));
              return e;
            })(t, Q(t, i))),
            (t.precision = n),
            (t.rounding = e),
            _(2 < o ? i.neg() : i, n, e, !0))
        : new t(NaN);
    }),
    (y.squareRoot = y.sqrt = function () {
      var n,
        e,
        i,
        t,
        r,
        s,
        o = this,
        u = o.d,
        c = o.e,
        f = o.s,
        a = o.constructor;
      if (1 !== f || !u || !u[0])
        return new a(!f || (f < 0 && (!u || u[0])) ? NaN : u ? o : 1 / 0);
      for (
        N = !1,
          t =
            0 == (f = Math.sqrt(+o)) || f == 1 / 0
              ? (((e = M(u)).length + c) % 2 == 0 && (e += "0"),
                (f = Math.sqrt(e)),
                (c = Z((c + 1) / 2) - (c < 0 || c % 2)),
                new a(
                  (e =
                    f == 1 / 0
                      ? "5e" + c
                      : (e = f.toExponential()).slice(0, e.indexOf("e") + 1) +
                        c)
                ))
              : new a(f.toString()),
          i = (c = a.precision) + 3;
        ;

      )
        if (
          ((t = (s = t).plus(F(o, s, i + 2, 1)).times(0.5)),
          M(s.d).slice(0, i) === (e = M(t.d)).slice(0, i))
        ) {
          if ("9999" != (e = e.slice(i - 3, i + 1)) && (r || "4999" != e)) {
            (+e && (+e.slice(1) || "5" != e.charAt(0))) ||
              (_(t, c + 1, 1), (n = !t.times(t).eq(o)));
            break;
          }
          if (!r && (_(s, c + 1, 0), s.times(s).eq(o))) {
            t = s;
            break;
          }
          (i += 4), (r = 1);
        }
      return (N = !0), _(t, c, a.rounding, n);
    }),
    (y.tangent = y.tan = function () {
      var n,
        e,
        i = this,
        t = i.constructor;
      return i.isFinite()
        ? i.isZero()
          ? new t(i)
          : ((n = t.precision),
            (e = t.rounding),
            (t.precision = n + 10),
            (t.rounding = 1),
            ((i = i.sin()).s = 1),
            (i = F(i, new t(1).minus(i.times(i)).sqrt(), n + 10, 0)),
            (t.precision = n),
            (t.rounding = e),
            _(2 == o || 4 == o ? i.neg() : i, n, e, !0))
        : new t(NaN);
    }),
    (y.times = y.mul = function (n) {
      var e,
        i,
        t,
        r,
        s,
        o,
        u,
        c,
        f,
        a = this.constructor,
        h = this.d,
        l = (n = new a(n)).d;
      if (((n.s *= this.s), !(h && h[0] && l && l[0])))
        return new a(
          !n.s || (h && !h[0] && !l) || (l && !l[0] && !h)
            ? NaN
            : h && l
            ? 0 * n.s
            : n.s / 0
        );
      for (
        i = Z(this.e / R) + Z(n.e / R),
          (c = h.length) < (f = l.length) &&
            ((s = h), (h = l), (l = s), (o = c), (c = f), (f = o)),
          s = [],
          t = o = c + f;
        t--;

      )
        s.push(0);
      for (t = f; 0 <= --t; ) {
        for (e = 0, r = c + t; t < r; )
          (u = s[r] + l[t] * h[r - t - 1] + e),
            (s[r--] = u % P | 0),
            (e = (u / P) | 0);
        s[r] = (s[r] + e) % P | 0;
      }
      for (; !s[--o]; ) s.pop();
      return (
        e ? ++i : s.shift(),
        (n.d = s),
        (n.e = k(s, i)),
        N ? _(n, a.precision, a.rounding) : n
      );
    }),
    (y.toBinary = function (n, e) {
      return X(this, 2, n, e);
    }),
    (y.toDecimalPlaces = y.toDP = function (n, e) {
      var i = this.constructor,
        t = new i(this);
      return void 0 === n
        ? t
        : (q(n, 0, g),
          void 0 === e ? (e = i.rounding) : q(e, 0, 8),
          _(t, n + t.e + 1, e));
    }),
    (y.toExponential = function (n, e) {
      var i = this,
        t = i.constructor,
        r =
          void 0 === n
            ? A(i, !0)
            : (q(n, 0, g),
              void 0 === e ? (e = t.rounding) : q(e, 0, 8),
              A((i = _(new t(i), n + 1, e)), !0, n + 1));
      return i.isNeg() && !i.isZero() ? "-" + r : r;
    }),
    (y.toFixed = function (n, e) {
      var i,
        t = this,
        r = t.constructor,
        s =
          void 0 === n
            ? A(t)
            : (q(n, 0, g),
              void 0 === e ? (e = r.rounding) : q(e, 0, 8),
              A((i = _(new r(t), n + t.e + 1, e)), !1, n + i.e + 1));
      return t.isNeg() && !t.isZero() ? "-" + s : s;
    }),
    (y.toFraction = function (n) {
      var e,
        i,
        t,
        r,
        s,
        o,
        u,
        c,
        f,
        a,
        h,
        l,
        d = this,
        p = d.d,
        g = d.constructor;
      if (!p) return new g(d);
      if (
        ((f = i = new g(1)),
        (t = c = new g(0)),
        (o = (s = (e = new g(t)).e = H(p) - d.e - 1) % R),
        (e.d[0] = v(10, o < 0 ? R + o : o)),
        null == n)
      )
        n = 0 < s ? e : f;
      else {
        if (!(u = new g(n)).isInt() || u.lt(f)) throw Error(w + u);
        n = u.gt(e) ? (0 < s ? e : f) : u;
      }
      for (
        N = !1,
          u = new g(M(p)),
          a = g.precision,
          g.precision = s = p.length * R * 2;
        (h = F(u, e, 0, 1, 1)), 1 != (r = i.plus(h.times(t))).cmp(n);

      )
        (i = t),
          (t = r),
          (r = f),
          (f = c.plus(h.times(r))),
          (c = r),
          (r = e),
          (e = u.minus(h.times(r))),
          (u = r);
      return (
        (r = F(n.minus(i), t, 0, 1, 1)),
        (c = c.plus(r.times(f))),
        (i = i.plus(r.times(t))),
        (c.s = f.s = d.s),
        (l =
          F(f, t, s, 1).minus(d).abs().cmp(F(c, i, s, 1).minus(d).abs()) < 1
            ? [f, t]
            : [c, i]),
        (g.precision = a),
        (N = !0),
        l
      );
    }),
    (y.toHexadecimal = y.toHex = function (n, e) {
      return X(this, 16, n, e);
    }),
    (y.toNearest = function (n, e) {
      var i = (t = this).constructor,
        t = new i(t);
      if (null == n) {
        if (!t.d) return t;
        (n = new i(1)), (e = i.rounding);
      } else {
        if (
          ((n = new i(n)), void 0 === e ? (e = i.rounding) : q(e, 0, 8), !t.d)
        )
          return n.s ? t : n;
        if (!n.d) return n.s && (n.s = t.s), n;
      }
      return (
        n.d[0]
          ? ((N = !1), (t = F(t, n, 0, e, 1).times(n)), (N = !0), _(t))
          : ((n.s = t.s), (t = n)),
        t
      );
    }),
    (y.toNumber = function () {
      return +this;
    }),
    (y.toOctal = function (n, e) {
      return X(this, 8, n, e);
    }),
    (y.toPower = y.pow = function (n) {
      var e,
        i,
        t,
        r,
        s,
        o,
        u = this,
        c = u.constructor,
        f = +(n = new c(n));
      if (!(u.d && n.d && u.d[0] && n.d[0])) return new c(v(+u, f));
      if ((u = new c(u)).eq(1)) return u;
      if (((t = c.precision), (s = c.rounding), n.eq(1))) return _(u, t, s);
      if (
        (e = Z(n.e / R)) >= n.d.length - 1 &&
        (i = f < 0 ? -f : f) <= 9007199254740991
      )
        return (r = V(c, u, i, t)), n.s < 0 ? new c(1).div(r) : _(r, t, s);
      if ((o = u.s) < 0) {
        if (e < n.d.length - 1) return new c(NaN);
        if (
          (0 == (1 & n.d[e]) && (o = 1),
          0 == u.e && 1 == u.d[0] && 1 == u.d.length)
        )
          return (u.s = o), u;
      }
      return (e =
        0 != (i = v(+u, f)) && isFinite(i)
          ? new c(i + "").e
          : Z(f * (Math.log("0." + M(u.d)) / Math.LN10 + u.e + 1))) >
        c.maxE + 1 || e < c.minE - 1
        ? new c(0 < e ? o / 0 : 0)
        : ((N = !1),
          (c.rounding = u.s = 1),
          (i = Math.min(12, (e + "").length)),
          (r = $(n.times(W(u, t + i)), t)).d &&
            O((r = _(r, t + 5, 1)).d, t, s) &&
            ((e = t + 10),
            +M((r = _($(n.times(W(u, e + i)), e), e + 5, 1)).d).slice(
              t + 1,
              t + 15
            ) +
              1 ==
              1e14 && (r = _(r, t + 1, 0))),
          (r.s = o),
          (N = !0),
          _(r, t, (c.rounding = s)));
    }),
    (y.toPrecision = function (n, e) {
      var i = this,
        t = i.constructor,
        r =
          void 0 === n
            ? A(i, i.e <= t.toExpNeg || i.e >= t.toExpPos)
            : (q(n, 1, g),
              void 0 === e ? (e = t.rounding) : q(e, 0, 8),
              A((i = _(new t(i), n, e)), n <= i.e || i.e <= t.toExpNeg, n));
      return i.isNeg() && !i.isZero() ? "-" + r : r;
    }),
    (y.toSignificantDigits = y.toSD = function (n, e) {
      var i = this.constructor;
      return (
        void 0 === n
          ? ((n = i.precision), (e = i.rounding))
          : (q(n, 1, g), void 0 === e ? (e = i.rounding) : q(e, 0, 8)),
        _(new i(this), n, e)
      );
    }),
    (y.toString = function () {
      var n = this,
        e = n.constructor,
        i = A(n, n.e <= e.toExpNeg || n.e >= e.toExpPos);
      return n.isNeg() && !n.isZero() ? "-" + i : i;
    }),
    (y.truncated = y.trunc = function () {
      return _(new this.constructor(this), this.e + 1, 1);
    }),
    (y.valueOf = y.toJSON = function () {
      var n = this,
        e = n.constructor,
        i = A(n, n.e <= e.toExpNeg || n.e >= e.toExpPos);
      return n.isNeg() ? "-" + i : i;
    });
  var F = function (n, e, i, t, r, s) {
    var o,
      u,
      c,
      f,
      a,
      h,
      l,
      d,
      p,
      g,
      m,
      w,
      v,
      N,
      b,
      E,
      x,
      y,
      M,
      q,
      O = n.constructor,
      D = n.s == e.s ? 1 : -1,
      F = n.d,
      A = e.d;
    if (!(F && F[0] && A && A[0]))
      return new O(
        n.s && e.s && (F ? !A || F[0] != A[0] : A)
          ? (F && 0 == F[0]) || !A
            ? 0 * D
            : D / 0
          : NaN
      );
    for (
      u = s
        ? ((a = 1), n.e - e.e)
        : ((s = P), (a = R), Z(n.e / a) - Z(e.e / a)),
        M = A.length,
        x = F.length,
        g = (p = new O(D)).d = [],
        c = 0;
      A[c] == (F[c] || 0);
      c++
    );
    if (
      (A[c] > (F[c] || 0) && u--,
      null == i
        ? ((N = i = O.precision), (t = O.rounding))
        : (N = r ? i + (n.e - e.e) + 1 : i),
      N < 0)
    )
      g.push(1), (h = !0);
    else {
      if (((N = (N / a + 2) | 0), (c = 0), 1 == M)) {
        for (A = A[(f = 0)], N++; (c < x || f) && N--; c++)
          (b = f * s + (F[c] || 0)), (g[c] = (b / A) | 0), (f = b % A | 0);
        h = f || c < x;
      } else {
        for (
          1 < (f = (s / (A[0] + 1)) | 0) &&
            ((A = L(A, f, s)),
            (F = L(F, f, s)),
            (M = A.length),
            (x = F.length)),
            E = M,
            w = (m = F.slice(0, M)).length;
          w < M;

        )
          m[w++] = 0;
        for (
          (q = A.slice()).unshift(0), y = A[0], A[1] >= s / 2 && ++y;
          (f = 0),
            (o = T(A, m, M, w)) < 0
              ? ((v = m[0]),
                M != w && (v = v * s + (m[1] || 0)),
                1 < (f = (v / y) | 0)
                  ? (s <= f && (f = s - 1),
                    1 ==
                      (o = T(
                        (l = L(A, f, s)),
                        m,
                        (d = l.length),
                        (w = m.length)
                      )) && (f--, U(l, M < d ? q : A, d, s)))
                  : (0 == f && (o = f = 1), (l = A.slice())),
                (d = l.length) < w && l.unshift(0),
                U(m, l, w, s),
                -1 == o &&
                  (o = T(A, m, M, (w = m.length))) < 1 &&
                  (f++, U(m, M < w ? q : A, w, s)),
                (w = m.length))
              : 0 === o && (f++, (m = [0])),
            (g[c++] = f),
            o && m[0] ? (m[w++] = F[E] || 0) : ((m = [F[E]]), (w = 1)),
            (E++ < x || void 0 !== m[0]) && N--;

        );
        h = void 0 !== m[0];
      }
      g[0] || g.shift();
    }
    if (1 == a) (p.e = u), (S = h);
    else {
      for (c = 1, f = g[0]; 10 <= f; f /= 10) c++;
      (p.e = c + u * a - 1), _(p, r ? i + p.e + 1 : i, t, h);
    }
    return p;
  };
  function L(n, e, i) {
    var t,
      r = 0,
      s = n.length;
    for (n = n.slice(); s--; )
      (t = n[s] * e + r), (n[s] = t % i | 0), (r = (t / i) | 0);
    return r && n.unshift(r), n;
  }
  function T(n, e, i, t) {
    var r, s;
    if (i != t) s = t < i ? 1 : -1;
    else
      for (r = s = 0; r < i; r++)
        if (n[r] != e[r]) {
          s = n[r] > e[r] ? 1 : -1;
          break;
        }
    return s;
  }
  function U(n, e, i, t) {
    for (var r = 0; i--; )
      (n[i] -= r), (r = n[i] < e[i] ? 1 : 0), (n[i] = r * t + n[i] - e[i]);
    for (; !n[0] && 1 < n.length; ) n.shift();
  }
  function _(n, e, i, t) {
    var r,
      s,
      o,
      u,
      c,
      f,
      a,
      h,
      l,
      d = n.constructor;
    n: if (null != e) {
      if (!(h = n.d)) return n;
      for (r = 1, u = h[0]; 10 <= u; u /= 10) r++;
      if ((s = e - r) < 0)
        (s += R), (o = e), (c = ((a = h[(l = 0)]) / v(10, r - o - 1)) % 10 | 0);
      else if (((l = Math.ceil((s + 1) / R)), (u = h.length) <= l)) {
        if (!t) break n;
        for (; u++ <= l; ) h.push(0);
        (a = c = 0), (o = (s %= R) - R + (r = 1));
      } else {
        for (a = u = h[l], r = 1; 10 <= u; u /= 10) r++;
        c = (o = (s %= R) - R + r) < 0 ? 0 : (a / v(10, r - o - 1)) % 10 | 0;
      }
      if (
        ((t =
          t ||
          e < 0 ||
          void 0 !== h[l + 1] ||
          (o < 0 ? a : a % v(10, r - o - 1))),
        (f =
          i < 4
            ? (c || t) && (0 == i || i == (n.s < 0 ? 3 : 2))
            : 5 < c ||
              (5 == c &&
                (4 == i ||
                  t ||
                  (6 == i &&
                    (0 < s ? (0 < o ? a / v(10, r - o) : 0) : h[l - 1]) % 10 &
                      1) ||
                  i == (n.s < 0 ? 8 : 7)))),
        e < 1 || !h[0])
      )
        return (
          (h.length = 0),
          f
            ? ((e -= n.e + 1),
              (h[0] = v(10, (R - (e % R)) % R)),
              (n.e = -e || 0))
            : (h[0] = n.e = 0),
          n
        );
      if (
        (0 == s
          ? ((h.length = l), (u = 1), l--)
          : ((h.length = l + 1),
            (u = v(10, R - s)),
            (h[l] = 0 < o ? ((a / v(10, r - o)) % v(10, o) | 0) * u : 0)),
        f)
      )
        for (;;) {
          if (0 == l) {
            for (s = 1, o = h[0]; 10 <= o; o /= 10) s++;
            for (o = h[0] += u, u = 1; 10 <= o; o /= 10) u++;
            s != u && (n.e++, h[0] == P && (h[0] = 1));
            break;
          }
          if (((h[l] += u), h[l] != P)) break;
          (h[l--] = 0), (u = 1);
        }
      for (s = h.length; 0 === h[--s]; ) h.pop();
    }
    return (
      N &&
        (n.e > d.maxE
          ? ((n.d = null), (n.e = NaN))
          : n.e < d.minE && ((n.e = 0), (n.d = [0]))),
      n
    );
  }
  function A(n, e, i) {
    if (!n.isFinite()) return J(n);
    var t,
      r = n.e,
      s = M(n.d),
      o = s.length;
    return (
      e
        ? (i && 0 < (t = i - o)
            ? (s = s.charAt(0) + "." + s.slice(1) + B(t))
            : 1 < o && (s = s.charAt(0) + "." + s.slice(1)),
          (s = s + (n.e < 0 ? "e" : "e+") + n.e))
        : r < 0
        ? ((s = "0." + B(-r - 1) + s), i && 0 < (t = i - o) && (s += B(t)))
        : o <= r
        ? ((s += B(r + 1 - o)),
          i && 0 < (t = i - r - 1) && (s = s + "." + B(t)))
        : ((t = r + 1) < o && (s = s.slice(0, t) + "." + s.slice(t)),
          i && 0 < (t = i - o) && (r + 1 === o && (s += "."), (s += B(t)))),
      s
    );
  }
  function k(n, e) {
    var i = n[0];
    for (e *= R; 10 <= i; i /= 10) e++;
    return e;
  }
  function C(n, e, i) {
    if (E < e) throw ((N = !0), i && (n.precision = i), Error(s));
    return _(new n(t), e, 1, !0);
  }
  function I(n, e, i) {
    if (x < e) throw Error(s);
    return _(new n(r), e, i, !0);
  }
  function H(n) {
    var e = n.length - 1,
      i = e * R + 1;
    if ((e = n[e])) {
      for (; e % 10 == 0; e /= 10) i--;
      for (e = n[0]; 10 <= e; e /= 10) i++;
    }
    return i;
  }
  function B(n) {
    for (var e = ""; n--; ) e += "0";
    return e;
  }
  function V(n, e, i, t) {
    var r,
      s = new n(1),
      o = Math.ceil(t / R + 4);
    for (N = !1; ; ) {
      if (
        (i % 2 && Y((s = s.times(e)).d, o) && (r = !0), 0 === (i = Z(i / 2)))
      ) {
        (i = s.d.length - 1), r && 0 === s.d[i] && ++s.d[i];
        break;
      }
      Y((e = e.times(e)).d, o);
    }
    return (N = !0), s;
  }
  function j(n) {
    return 1 & n.d[n.d.length - 1];
  }
  function i(n, e, i) {
    for (var t, r = new n(e[0]), s = 0; ++s < e.length; ) {
      if (!(t = new n(e[s])).s) {
        r = t;
        break;
      }
      r[i](t) && (r = t);
    }
    return r;
  }
  function $(n, e) {
    var i,
      t,
      r,
      s,
      o,
      u,
      c,
      f = 0,
      a = 0,
      h = 0,
      l = n.constructor,
      d = l.rounding,
      p = l.precision;
    if (!n.d || !n.d[0] || 17 < n.e)
      return new l(
        n.d
          ? n.d[0]
            ? n.s < 0
              ? 0
              : 1 / 0
            : 1
          : n.s
          ? n.s < 0
            ? 0
            : n
          : NaN
      );
    for (c = null == e ? ((N = !1), p) : e, u = new l(0.03125); -2 < n.e; )
      (n = n.times(u)), (h += 5);
    for (
      c += t = ((Math.log(v(2, h)) / Math.LN10) * 2 + 5) | 0,
        i = s = o = new l(1),
        l.precision = c;
      ;

    ) {
      if (
        ((s = _(s.times(n), c, 1)),
        (i = i.times(++a)),
        M((u = o.plus(F(s, i, c, 1))).d).slice(0, c) === M(o.d).slice(0, c))
      ) {
        for (r = h; r--; ) o = _(o.times(o), c, 1);
        if (null != e) return (l.precision = p), o;
        if (!(f < 3 && O(o.d, c - t, d, f)))
          return _(o, (l.precision = p), d, (N = !0));
        (l.precision = c += 10), (i = s = u = new l(1)), (a = 0), f++;
      }
      o = u;
    }
  }
  function W(n, e) {
    var i,
      t,
      r,
      s,
      o,
      u,
      c,
      f,
      a,
      h,
      l,
      d = 1,
      p = n,
      g = p.d,
      m = p.constructor,
      w = m.rounding,
      v = m.precision;
    if (p.s < 0 || !g || !g[0] || (!p.e && 1 == g[0] && 1 == g.length))
      return new m(g && !g[0] ? -1 / 0 : 1 != p.s ? NaN : g ? 0 : p);
    if (
      ((a = null == e ? ((N = !1), v) : e),
      (m.precision = a += 10),
      (t = (i = M(g)).charAt(0)),
      !(Math.abs((s = p.e)) < 15e14))
    )
      return (
        (f = C(m, a + 2, v).times(s + "")),
        (p = W(new m(t + "." + i.slice(1)), a - 10).plus(f)),
        (m.precision = v),
        null == e ? _(p, v, w, (N = !0)) : p
      );
    for (; (t < 7 && 1 != t) || (1 == t && 3 < i.charAt(1)); )
      (t = (i = M((p = p.times(n)).d)).charAt(0)), d++;
    for (
      s = p.e,
        1 < t
          ? ((p = new m("0." + i)), s++)
          : (p = new m(t + "." + i.slice(1))),
        c = o = p = F((h = p).minus(1), p.plus(1), a, 1),
        l = _(p.times(p), a, 1),
        r = 3;
      ;

    ) {
      if (
        ((o = _(o.times(l), a, 1)),
        M((f = c.plus(F(o, new m(r), a, 1))).d).slice(0, a) ===
          M(c.d).slice(0, a))
      ) {
        if (
          ((c = c.times(2)),
          0 !== s && (c = c.plus(C(m, a + 2, v).times(s + ""))),
          (c = F(c, new m(d), a, 1)),
          null != e)
        )
          return (m.precision = v), c;
        if (!O(c.d, a - 10, w, u)) return _(c, (m.precision = v), w, (N = !0));
        (m.precision = a += 10),
          (f = o = p = F(h.minus(1), h.plus(1), a, 1)),
          (l = _(p.times(p), a, 1)),
          (r = u = 1);
      }
      (c = f), (r += 2);
    }
  }
  function J(n) {
    return String((n.s * n.s) / 0);
  }
  function z(n, e) {
    var i, t, r;
    for (
      -1 < (i = e.indexOf(".")) && (e = e.replace(".", "")),
        0 < (t = e.search(/e/i))
          ? (i < 0 && (i = t), (i += +e.slice(t + 1)), (e = e.substring(0, t)))
          : i < 0 && (i = e.length),
        t = 0;
      48 === e.charCodeAt(t);
      t++
    );
    for (r = e.length; 48 === e.charCodeAt(r - 1); --r);
    if ((e = e.slice(t, r))) {
      if (
        ((r -= t),
        (n.e = i = i - t - 1),
        (n.d = []),
        (t = (i + 1) % R),
        i < 0 && (t += R),
        t < r)
      ) {
        for (t && n.d.push(+e.slice(0, t)), r -= R; t < r; )
          n.d.push(+e.slice(t, (t += R)));
        (e = e.slice(t)), (t = R - e.length);
      } else t -= r;
      for (; t--; ) e += "0";
      n.d.push(+e),
        N &&
          (n.e > n.constructor.maxE
            ? ((n.d = null), (n.e = NaN))
            : n.e < n.constructor.minE && ((n.e = 0), (n.d = [0])));
    } else (n.e = 0), (n.d = [0]);
    return n;
  }
  function G(n, e, i, t, r) {
    var s,
      o,
      u,
      c,
      f = n.precision,
      a = Math.ceil(f / R);
    for (N = !1, c = i.times(i), u = new n(t); ; ) {
      if (
        ((o = F(u.times(c), new n(e++ * e++), f, 1)),
        (u = r ? t.plus(o) : t.minus(o)),
        (t = F(o.times(c), new n(e++ * e++), f, 1)),
        void 0 !== (o = u.plus(t)).d[a])
      ) {
        for (s = a; o.d[s] === u.d[s] && s--; );
        if (-1 == s) break;
      }
      (s = u), (u = t), (t = o), (o = s), 0;
    }
    return (N = !0), (o.d.length = a + 1), o;
  }
  function K(n, e) {
    for (var i = n; --e; ) i *= n;
    return i;
  }
  function Q(n, e) {
    var i,
      t = e.s < 0,
      r = I(n, n.precision, 1),
      s = r.times(0.5);
    if ((e = e.abs()).lte(s)) return (o = t ? 4 : 1), e;
    if ((i = e.divToInt(r)).isZero()) o = t ? 3 : 2;
    else {
      if ((e = e.minus(i.times(r))).lte(s))
        return (o = j(i) ? (t ? 2 : 3) : t ? 4 : 1), e;
      o = j(i) ? (t ? 1 : 4) : t ? 3 : 2;
    }
    return e.minus(r).abs();
  }
  function X(n, e, i, t) {
    var r,
      s,
      o,
      u,
      c,
      f,
      a,
      h,
      l,
      d = n.constructor,
      p = void 0 !== i;
    if (
      (p
        ? (q(i, 1, g), void 0 === t ? (t = d.rounding) : q(t, 0, 8))
        : ((i = d.precision), (t = d.rounding)),
      n.isFinite())
    ) {
      for (
        p
          ? ((r = 2), 16 == e ? (i = 4 * i - 3) : 8 == e && (i = 3 * i - 2))
          : (r = e),
          0 <= (o = (a = A(n)).indexOf(".")) &&
            ((a = a.replace(".", "")),
            ((l = new d(1)).e = a.length - o),
            (l.d = D(A(l), 10, r)),
            (l.e = l.d.length)),
          s = c = (h = D(a, 10, r)).length;
        0 == h[--c];

      )
        h.pop();
      if (h[0]) {
        if (
          (o < 0
            ? s--
            : (((n = new d(n)).d = h),
              (n.e = s),
              (h = (n = F(n, l, i, t, 0, r)).d),
              (s = n.e),
              (f = S)),
          (o = h[i]),
          (u = r / 2),
          (f = f || void 0 !== h[i + 1]),
          (f =
            t < 4
              ? (void 0 !== o || f) && (0 === t || t === (n.s < 0 ? 3 : 2))
              : u < o ||
                (o === u &&
                  (4 === t ||
                    f ||
                    (6 === t && 1 & h[i - 1]) ||
                    t === (n.s < 0 ? 8 : 7)))),
          (h.length = i),
          f)
        )
          for (; ++h[--i] > r - 1; ) (h[i] = 0), i || (++s, h.unshift(1));
        for (c = h.length; !h[c - 1]; --c);
        for (o = 0, a = ""; o < c; o++) a += m.charAt(h[o]);
        if (p) {
          if (1 < c)
            if (16 == e || 8 == e) {
              for (o = 16 == e ? 4 : 3, --c; c % o; c++) a += "0";
              for (c = (h = D(a, r, e)).length; !h[c - 1]; --c);
              for (o = 1, a = "1."; o < c; o++) a += m.charAt(h[o]);
            } else a = a.charAt(0) + "." + a.slice(1);
          a = a + (s < 0 ? "p" : "p+") + s;
        } else if (s < 0) {
          for (; ++s; ) a = "0" + a;
          a = "0." + a;
        } else if (++s > c) for (s -= c; s--; ) a += "0";
        else s < c && (a = a.slice(0, s) + "." + a.slice(s));
      } else a = p ? "0p+0" : "0";
      a = (16 == e ? "0x" : 2 == e ? "0b" : 8 == e ? "0o" : "") + a;
    } else a = J(n);
    return n.s < 0 ? "-" + a : a;
  }
  function Y(n, e) {
    return n.length > e && ((n.length = e), 1);
  }
  function nn(n) {
    return new this(n).abs();
  }
  function en(n) {
    return new this(n).acos();
  }
  function tn(n) {
    return new this(n).acosh();
  }
  function rn(n, e) {
    return new this(n).plus(e);
  }
  function sn(n) {
    return new this(n).asin();
  }
  function on(n) {
    return new this(n).asinh();
  }
  function un(n) {
    return new this(n).atan();
  }
  function cn(n) {
    return new this(n).atanh();
  }
  function fn(n, e) {
    (n = new this(n)), (e = new this(e));
    var i,
      t = this.precision,
      r = this.rounding,
      s = t + 4;
    return (
      n.s && e.s
        ? n.d || e.d
          ? !e.d || n.isZero()
            ? ((i = e.s < 0 ? I(this, t, r) : new this(0)).s = n.s)
            : !n.d || e.isZero()
            ? ((i = I(this, s, 1).times(0.5)).s = n.s)
            : (i =
                e.s < 0
                  ? ((this.precision = s),
                    (this.rounding = 1),
                    (i = this.atan(F(n, e, s, 1))),
                    (e = I(this, s, 1)),
                    (this.precision = t),
                    (this.rounding = r),
                    n.s < 0 ? i.minus(e) : i.plus(e))
                  : this.atan(F(n, e, s, 1)))
          : ((i = I(this, s, 1).times(0 < e.s ? 0.25 : 0.75)).s = n.s)
        : (i = new this(NaN)),
      i
    );
  }
  function an(n) {
    return new this(n).cbrt();
  }
  function hn(n) {
    return _((n = new this(n)), n.e + 1, 2);
  }
  function ln(n) {
    if (!n || "object" != typeof n) throw Error(f + "Object expected");
    for (
      var e,
        i,
        t = !0 === n.defaults,
        r = [
          "precision",
          1,
          g,
          "rounding",
          0,
          8,
          "toExpNeg",
          -u,
          0,
          "toExpPos",
          0,
          u,
          "maxE",
          0,
          u,
          "minE",
          -u,
          0,
          "modulo",
          0,
          9,
        ],
        s = 0;
      s < r.length;
      s += 3
    )
      if (((e = r[s]), t && (this[e] = c[e]), void 0 !== (i = n[e]))) {
        if (!(Z(i) === i && r[s + 1] <= i && i <= r[s + 2]))
          throw Error(w + e + ": " + i);
        this[e] = i;
      }
    if (((e = "crypto"), t && (this[e] = c[e]), void 0 !== (i = n[e]))) {
      if (!0 !== i && !1 !== i && 0 !== i && 1 !== i)
        throw Error(w + e + ": " + i);
      if (i) {
        if (
          "undefined" == typeof crypto ||
          !crypto ||
          (!crypto.getRandomValues && !crypto.randomBytes)
        )
          throw Error(a);
        this[e] = !0;
      } else this[e] = !1;
    }
    return this;
  }
  function dn(n) {
    return new this(n).cos();
  }
  function pn(n) {
    return new this(n).cosh();
  }
  function gn(n, e) {
    return new this(n).div(e);
  }
  function mn(n) {
    return new this(n).exp();
  }
  function wn(n) {
    return _((n = new this(n)), n.e + 1, 3);
  }
  function vn() {
    var n,
      e,
      i = new this(0);
    for (N = !1, n = 0; n < arguments.length; )
      if ((e = new this(arguments[n++])).d) i.d && (i = i.plus(e.times(e)));
      else {
        if (e.s) return (N = !0), new this(1 / 0);
        i = e;
      }
    return (N = !0), i.sqrt();
  }
  function Nn(n) {
    return n instanceof h || (n && "[object Decimal]" === n.name) || !1;
  }
  function bn(n) {
    return new this(n).ln();
  }
  function En(n, e) {
    return new this(n).log(e);
  }
  function xn(n) {
    return new this(n).log(2);
  }
  function yn(n) {
    return new this(n).log(10);
  }
  function Mn() {
    return i(this, arguments, "lt");
  }
  function qn() {
    return i(this, arguments, "gt");
  }
  function On(n, e) {
    return new this(n).mod(e);
  }
  function Dn(n, e) {
    return new this(n).mul(e);
  }
  function Fn(n, e) {
    return new this(n).pow(e);
  }
  function An(n) {
    var e,
      i,
      t,
      r,
      s = 0,
      o = new this(1),
      u = [];
    if (
      (void 0 === n ? (n = this.precision) : q(n, 1, g),
      (t = Math.ceil(n / R)),
      this.crypto)
    )
      if (crypto.getRandomValues)
        for (e = crypto.getRandomValues(new Uint32Array(t)); s < t; )
          429e7 <= (r = e[s])
            ? (e[s] = crypto.getRandomValues(new Uint32Array(1))[0])
            : (u[s++] = r % 1e7);
      else {
        if (!crypto.randomBytes) throw Error(a);
        for (e = crypto.randomBytes((t *= 4)); s < t; )
          214e7 <=
          (r =
            e[s] +
            (e[s + 1] << 8) +
            (e[s + 2] << 16) +
            ((127 & e[s + 3]) << 24))
            ? crypto.randomBytes(4).copy(e, s)
            : (u.push(r % 1e7), (s += 4));
        s = t / 4;
      }
    else for (; s < t; ) u[s++] = (1e7 * Math.random()) | 0;
    for (
      t = u[--s],
        n %= R,
        t && n && ((r = v(10, R - n)), (u[s] = ((t / r) | 0) * r));
      0 === u[s];
      s--
    )
      u.pop();
    if (s < 0) u = [(i = 0)];
    else {
      for (i = -1; 0 === u[0]; i -= R) u.shift();
      for (t = 1, r = u[0]; 10 <= r; r /= 10) t++;
      t < R && (i -= R - t);
    }
    return (o.e = i), (o.d = u), o;
  }
  function Sn(n) {
    return _((n = new this(n)), n.e + 1, this.rounding);
  }
  function Zn(n) {
    return (n = new this(n)).d ? (n.d[0] ? n.s : 0 * n.s) : n.s || NaN;
  }
  function Pn(n) {
    return new this(n).sin();
  }
  function Rn(n) {
    return new this(n).sinh();
  }
  function Ln(n) {
    return new this(n).sqrt();
  }
  function Tn(n, e) {
    return new this(n).sub(e);
  }
  function Un(n) {
    return new this(n).tan();
  }
  function _n(n) {
    return new this(n).tanh();
  }
  function kn(n) {
    return _((n = new this(n)), n.e + 1, 1);
  }
  ((h = (function n(e) {
    var i, t, r;
    function s(n) {
      var e,
        i,
        t,
        r = this;
      if (!(r instanceof s)) return new s(n);
      if (n instanceof (r.constructor = s))
        return (
          (r.s = n.s),
          void (N
            ? !n.d || n.e > s.maxE
              ? ((r.e = NaN), (r.d = null))
              : n.e < s.minE
              ? ((r.e = 0), (r.d = [0]))
              : ((r.e = n.e), (r.d = n.d.slice()))
            : ((r.e = n.e), (r.d = n.d ? n.d.slice() : n.d)))
        );
      if ("number" == (t = typeof n)) {
        if (0 === n)
          return (r.s = 1 / n < 0 ? -1 : 1), (r.e = 0), void (r.d = [0]);
        if (
          (n < 0 ? ((n = -n), (r.s = -1)) : (r.s = 1), n === ~~n && n < 1e7)
        ) {
          for (e = 0, i = n; 10 <= i; i /= 10) e++;
          return void (N
            ? s.maxE < e
              ? ((r.e = NaN), (r.d = null))
              : e < s.minE
              ? ((r.e = 0), (r.d = [0]))
              : ((r.e = e), (r.d = [n]))
            : ((r.e = e), (r.d = [n])));
        }
        return 0 * n != 0
          ? (n || (r.s = NaN), (r.e = NaN), void (r.d = null))
          : z(r, n.toString());
      }
      if ("string" != t) throw Error(w + n);
      return (
        45 === (i = n.charCodeAt(0))
          ? ((n = n.slice(1)), (r.s = -1))
          : (43 === i && (n = n.slice(1)), (r.s = 1)),
        (b.test(n)
          ? z
          : function (n, e) {
              var i, t, r, s, o, u, c, f, a;
              if ("Infinity" === e || "NaN" === e)
                return +e || (n.s = NaN), (n.e = NaN), (n.d = null), n;
              if (d.test(e)) (i = 16), (e = e.toLowerCase());
              else if (l.test(e)) i = 2;
              else {
                if (!p.test(e)) throw Error(w + e);
                i = 8;
              }
              for (
                o =
                  0 <=
                  (s = (e =
                    0 < (s = e.search(/p/i))
                      ? ((c = +e.slice(s + 1)), e.substring(2, s))
                      : e.slice(2)).indexOf(".")),
                  t = n.constructor,
                  o &&
                    ((s = (u = (e = e.replace(".", "")).length) - s),
                    (r = V(t, new t(i), s, 2 * s))),
                  s = a = (f = D(e, i, P)).length - 1;
                0 === f[s];
                --s
              )
                f.pop();
              return s < 0
                ? new t(0 * n.s)
                : ((n.e = k(f, a)),
                  (n.d = f),
                  (N = !1),
                  o && (n = F(n, r, 4 * u)),
                  c && (n = n.times(Math.abs(c) < 54 ? v(2, c) : h.pow(2, c))),
                  (N = !0),
                  n);
            })(r, n)
      );
    }
    if (
      ((s.prototype = y),
      (s.ROUND_UP = 0),
      (s.ROUND_DOWN = 1),
      (s.ROUND_CEIL = 2),
      (s.ROUND_FLOOR = 3),
      (s.ROUND_HALF_UP = 4),
      (s.ROUND_HALF_DOWN = 5),
      (s.ROUND_HALF_EVEN = 6),
      (s.ROUND_HALF_CEIL = 7),
      (s.ROUND_HALF_FLOOR = 8),
      (s.EUCLID = 9),
      (s.config = s.set = ln),
      (s.clone = n),
      (s.isDecimal = Nn),
      (s.abs = nn),
      (s.acos = en),
      (s.acosh = tn),
      (s.add = rn),
      (s.asin = sn),
      (s.asinh = on),
      (s.atan = un),
      (s.atanh = cn),
      (s.atan2 = fn),
      (s.cbrt = an),
      (s.ceil = hn),
      (s.cos = dn),
      (s.cosh = pn),
      (s.div = gn),
      (s.exp = mn),
      (s.floor = wn),
      (s.hypot = vn),
      (s.ln = bn),
      (s.log = En),
      (s.log10 = yn),
      (s.log2 = xn),
      (s.max = Mn),
      (s.min = qn),
      (s.mod = On),
      (s.mul = Dn),
      (s.pow = Fn),
      (s.random = An),
      (s.round = Sn),
      (s.sign = Zn),
      (s.sin = Pn),
      (s.sinh = Rn),
      (s.sqrt = Ln),
      (s.sub = Tn),
      (s.tan = Un),
      (s.tanh = _n),
      (s.trunc = kn),
      void 0 === e && (e = {}),
      e && !0 !== e.defaults)
    )
      for (
        r = [
          "precision",
          "rounding",
          "toExpNeg",
          "toExpPos",
          "maxE",
          "minE",
          "modulo",
          "crypto",
        ],
          i = 0;
        i < r.length;

      )
        e.hasOwnProperty((t = r[i++])) || (e[t] = this[t]);
    return s.config(e), s;
  })(c)).default = h.Decimal = h),
    (t = new h(t)),
    (r = new h(r)),
    "function" == typeof define && define.amd
      ? define(function () {
          return h;
        })
      : "undefined" != typeof module && module.exports
      ? ("function" == typeof Symbol &&
          "symbol" == typeof Symbol.iterator &&
          ((y[Symbol.for("nodejs.util.inspect.custom")] = y.toString),
          (y[Symbol.toStringTag] = "Decimal")),
        (module.exports = h))
      : ((n =
          n ||
          ("undefined" != typeof self && self && self.self == self
            ? self
            : window)),
        (e = n.Decimal),
        (h.noConflict = function () {
          return (n.Decimal = e), h;
        }),
        (n.Decimal = h));
})(this);
