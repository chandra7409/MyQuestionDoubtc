// WALL
// Problem Statement
// Amy wants to make a rectangular wall
// for her garden.She has N different coloured bricks.AK denotes the number of bricks with colour K(1 <= K <= N), that she has.All the bricks are cubes with dimension 1 x 1 x 1(length x height x width).She wants her wall to follow are the below condition:
//     ·The wall must be rectangular in shape.
// ·Height of the wall must be exactly H.
// ·Each column must contain bricks of different colour.
// Find the maximum area of the wall that you can make
// for her.Since the area can be large print, it modulo 109 + 7. If she cannot construct such a wall print 0. See the Sample
// for better understanding.
// NOTE: It is not necessary to use all the bricks.
// You are given T independent test cases.
// Constraints
// 1 <= T <= 3
// 1 <= H <= N <= 105
// 1 <= AK <= 1011
// All input values are integers.
// Input Format
// First - line contains T.
// First line of each test
// case contains two space separated integers N and H.
// Second line of each test
// case consists of N space separated integers A1, A2, …, AN
// Output Format
// Print in a newline
// for each test
// case a single integer denoting her score the maximum area modulo 109 + 7. If she cannot construct such a wall print 0.
// Sample Input 1
// 1
// 5 3
// 2 2 1 3 1
// Sample Output 1
// 9
// Explanation of Sample 1
// Let Colour of the wall be Red, Yellow, Blue, Pink and Green.She can use all the bricks and make the following wall from it.Each column consists of bricks of different colour and height of the wall is 3.