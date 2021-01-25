console.log("The JS file has been loaded!");
function lcmcalc() {
  let var1 = document.querySelector("#lcm1").value;
  let var2 = document.querySelector("#lcm2").value;
  let var3 = document.querySelector("#lcm3").value;
  if (var3 == 0) lcmans = math.lcm(var1, var2);
  else lcmans = math.lcm(var1, var2, var3);
  // console.log("lcm is " + lcmans);
  $("#lcmlabel").text(lcmans);
}

function gcdcalc() {
  let var1 = document.querySelector("#gcd1").value;
  let var2 = document.querySelector("#gcd2").value;
  let var3 = document.querySelector("#gcd3").value;
  let gcdans = document.querySelector("#gcdlabel");

  if (var3 === null) gcdans = math.gcd(var1, var2);
  else gcdans = math.gcd(var1, var2, var3);
  // console.log("gcd is" + gcdans);
  $("#gcdlabel").text(gcdans);
}

function primecalc() {
  let prime1 = document.querySelector("#prime1").value;
  let prime2 = document.querySelector("#prime2").value;

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
  // console.log(primeans);
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
  // var answer = 1;
  // for (let i = num; i >= 1; i--) {
  //   answer *= i;
  // }
  var result = math.factorial(num);
  $("#factlabel").text(result);
}

// factt();

// function fact() {
//   let num = document.querySelector("#fact");
//   if (num == 0) {
//     console.log(1);
//   }
//   let result = num * fact(num - 1);
//   console.log(result);
// }
