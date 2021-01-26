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
  const [var1, var2, var3] = ["gcd1", "gcd2", "gcd3"].map(
    (id) => document.getElementById(id).value
  );

  if (var3 === null) gcdans = math.gcd(var1, var2);
  else gcdans = math.gcd(var1, var2, var3);

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

  var result = math.factorial(num);
  $("#factlabel").text(result);
}
