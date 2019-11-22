// function headsOrTails(n) {
//     let words = ['heads', 'tails'];
//     let arr = [];
//     let nestN = 0;

//     words.map((word, index) => {
//         function recursiveFiller() {
//             let nestNN = 0;

//             if (n - nestN > 0) {
//                 for (let i = 0; i < n; i++) {
//                     if (n - nestN < n) {
//                         //
//                     }
//                     arr[nestN].push(word);
//                 }
//                 nestN++;
//                 recursiveFiller();
//             } else {
//                 return arr;
//             }
//         }
//         recursiveFiller();
//     });
// }

// // To check if you've completed the challenge, uncomment this code!
// console.log(headsOrTails(2)); // -> [['heads', 'heads'], ['heads', 'tails'], ['tails', 'heads'], ['tails', 'tails']]
// // console.log(headsOrTails(3));
// // -> [
// //   ['heads', 'heads', 'heads'],
// //   ['heads', 'heads', 'tails'],
// //   ['heads', 'tails', 'heads'],
// //   ['heads', 'tails', 'tails'],
// //   ['tails', 'heads', 'heads'],
// //   ['tails', 'heads', 'tails'],
// //   ['tails', 'tails', 'heads'],
// //   ['tails', 'tails', 'tails'],
// // ]
