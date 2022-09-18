// uestion Name: Cupcakes



// Problem Statement



// Gru, the criminal mastermind successfully performed the heist at the Deshute Bank with the help of his N minions.So he decided to give a treat to the minions.

// For the treat, Gru bought M cupcakes.There are several types of cupcakes and the ith cupcake is of type Ai.

// The minions don’ t like variety, hence a minion accepts the treat
// if and only
// if he gets all the cupcakes of the same type.Also not giving the same number of cupcakes to every minion may cause the minions to fight and Gru does not want that.Hence Gru will distribute the cupcakes among the minions such that:

//     Each minion gets the same number of cupcakes.
// All the cupcakes a minion gets must be of the same type.Different minions may get cupcakes of different(or the same) types.
// It can be seen that this type of distribution may lead to the wastage of cupcakes(see the sample example).Hence Gru wants to distribute the cupcakes among the minions such that a minimum of cupcakes are wasted.Given N, M, and array A, tell the maximum number of cupcakes Gru can distribute among the minions.



// Input Format



// First line contains two space separated integers denoting N and M.
// Next line contains M space separated integers denoting array A.


// Output Format



// Print the maximum number of cupcakes Gru can distribute among the minions.


// Constraints



// 1 <= N, M <= 105
// 1 <= Ai <= 109


// Sample Input 1



// 2 6

// 1 2 1 2 1 3



// Sample Output 1



// 4



// Explanation of Sample 1



// Distribute the cupcakes as:

//     1 st minions get 2 cupcakes of type 1
// 2 nd minion gets 2 cupcakes of type 2
// This distribution leads to wastage of 2 cupcakes(one of type 1 and one of type 3).