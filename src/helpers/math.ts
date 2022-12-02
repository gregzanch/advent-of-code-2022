import { deepEqual } from "./helpers";

// export function combinations<T>(states: T[], length: number) {
//   return states.map((state) => states.map((state2) => [state, state2])).flat(1); //?
// }

// const res = [
//   [-1, -1],
//   [-1, 0],
//   [-1, +1],
//   [0, -1],
//   [0, 0],
//   [0, +1],
//   [+1, -1],
//   [+1, 0],
//   [+1, +1],
// ];

// function makeCombi(n, k) {
//   const ans = [];
//   const tmp = [];

//   function makeCombiUtil(n, left, k) {
//     // Pushing this vector to a vector of vector
//     if (k == 0) {
//       ans.push([...tmp]);
//       return;
//     }

//     // i iterates from left to n. First time
//     // left will be 1
//     for (let i = left; i <= n; ++i) {
//       tmp.push(i);
//       makeCombiUtil(n, i + 1, k - 1);

//       // Popping out last inserted element
//       // from the vector
//       tmp.pop();
//     }
//   }

//   makeCombiUtil(n, 1, k);
//   return ans;
// }

// const ans = makeCombi(3, 2);

// ans; //?
