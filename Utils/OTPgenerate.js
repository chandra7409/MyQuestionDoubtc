const otpGenerator = require('otp-generator')
otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });



var val = Math.floor(1000 + Math.random() * 9000);
console.log(val);

// var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
// console.log(seq);


//bhai repuest me params me userId dena aur body me otp