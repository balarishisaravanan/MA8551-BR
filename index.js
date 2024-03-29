console.log("The JS file has been loaded!");
function lcmcalc() {
  const [var1, var2, var3] = ["lcm1", "lcm2", "lcm3"].map(
    (id) => document.getElementById(id).value
  );
  if (var3 == 0) lcmans = math.lcm(var1, var2);
  else lcmans = math.lcm(var1, var2, var3);

  $("#lcmlabel").text(lcmans);
}

function gcdcalc() {
  let gcdans = document.querySelector("#gcdlabel");
  const [var1, var2, var3, var4] = ["gcd1", "gcd2", "gcd3", "gcd4"].map(
    (id) => document.getElementById(id).value
  );

  if (var3 === null) gcdans = math.gcd(var1, var2);
  else gcdans = math.gcd(var1, var2, var3);
  if (var4 == null) gcdans = math.gcd(var1, var2, var3);
  else gcdans = math.gcd(var1, var2, var3, var4);

  $("#gcdlabel").text(gcdans);
}

function primecalc() {
  const [prime1, prime2] = ["prime1", "prime2"].map(
    (id) => document.getElementById(id).value
  );

  const isPrime = (num) => {
    let count = 2;
    while (count < num / 2 + 1) {
      if (num % count !== 0) {
        count++;
        continue;
      }
      return false;
    }
    return true;
  };
  const primeBetween = (a, b) => {
    let count = 0;
    for (let i = Math.min(a, b); i <= Math.max(a, b); i++) {
      if (isPrime(i)) {
        count++;
      }
    }
    return count;
  };
  primeans = primeBetween(prime1, prime2);
  primeans -= 2;

  $("#primelabel").text(primeans);
}
function phi() {
  let n = document.querySelector("#phi1").value;
  function gcd(a, b) {
    if (a === 0) {
      return b;
    }

    return gcd(b % a, a);
  }

  var result = 1;

  for (let i = 2; i < n; i++) {
    if (gcd(i, n) === 1) {
      result++;
    }
  }

  $("#philabel").text(result);
}

function fact() {
  let num = document.querySelector("#fact").value;

  let result = math.factorial(num);
  $("#factlabel").text(result);
}

// find the quotient and remainder
function qandr() {
  const [dividend, divisor] = ["dividend", "divisor"].map(
    (id) => document.getElementById(id).value
  );
  let remainder = dividend % divisor;
  let quotient = dividend / divisor;
  $("#q_qandr").text("Quotient: " + quotient + " Remainder: " + remainder);
  // $("#r_qandr").text("Remainder  is" + remainder);
}

function trailingzeroes() {
  var zeroes = 0;
  var n = document.querySelector("#trailing").value;
  for (let i = 5; n / i >= 1; i *= 5) {
    zeroes += n / i;
  }
  // console.log(zeroes);
  $("#trailing_ans").text(zeroes + " approx");
}
function exponentdivision() {
  const [number, exponent, divisor] = [
    "number_ed",
    "exponent_ed",
    "divisor_ed",
  ].map((id) => document.getElementById(id).value);
  let remainder = number % divisor;
  let flag = 1;
  while (remainder != 1) {
    flag += 1;
    remainder = (remainder * number) % divisor;
  }
  let p1 = exponent % flag;
  remainder = number ** p1 % divisor;
  console.log(remainder);
  $("#ans_ed").text(remainder);
}

function modinverse() {
  let a = document.querySelector("#firstmodulo").value;
  let m = document.querySelector("#secondmodulo").value;
  a = a % m;

  for (let x = 1; x < m; x++) if ((a * x) % m == 1) $("#invmoduloans").text(x);
}

function tau() {
  let num = document.querySelector("#tau1").value;
  let count = 0;
  for (let i = 1; i <= num; i++) {
    if (num % i == 0) {
      count++;
    }
  }
  $("#taulabel").text(count);
}

function sigma() {
  let num = document.querySelector("#sigma1").value;
  let ans = 0;
  for (let i = 1; i <= num; i++) {
    if (num % i == 0) {
      ans += i;
    }
  }
  $("#sigmalabel").text(ans);
}
function divcheck() {
  console.log("div check has loaded");
  let n = document.querySelector("#divisible").value;
  let checkers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  let ans = [];
  for (let i = 0; i < checkers.length; i++) {
    if (n % checkers[i] == 0) ans.push(checkers[i]);
  }
  $("#divisibility").text("Divisible by " + ans);
}

function convert() {
  const [decimal, bina, octal, hexa] = [
    "deci",
    "bina",
    "octa",
    "hexa",
  ].map((id) => document.getElementById(id));
  if (
    decimal.value !== null &&
    bina.value === "" &&
    octal.value === "" &&
    hexa.value === ""
  ) {
    val = parseInt(decimal.value, 10);
    bina.value = val.toString(2);
    octal.value = val.toString(8);
    hexa.value = val.toString(16);
  } else if (
    decimal.value === "" &&
    bina.value === "" &&
    octal.value === "" &&
    hexa.value !== null
  ) {
    val = parseInt(hexa.value, 16);
    bina.value = val.toString(2);
    octal.value = val.toString(8);
    decimal.value = val.toString(10);
  } else if (
    decimal.value === "" &&
    bina.value !== null &&
    octal.value === "" &&
    hexa.value === ""
  ) {
    val = parseInt(bina.value, 2);
    console.log(val);
    decimal.value = val.toString(10);
    octal.value = val.toString(8);
    hexa.value = val.toString(16);
  }
  if (
    decimal.value === "" &&
    bina.value === "" &&
    octal.value !== null &&
    hexa.value === ""
  ) {
    val = parseInt(octal.value, 8);
    decimal.value = val.toString(10);
    bina.value = val.toString(2);
    hexa.value = val.toString(16);
  }
}

function Clear() {
  const [decimal, bina, octal, hexa] = [
    "deci",
    "bina",
    "octa",
    "hexa",
  ].map((id) => document.getElementById(id));
  decimal.value = "";
  octal.value = "";
  hexa.value = "";
  bina.value = "";
}
