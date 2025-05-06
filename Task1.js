// ex 2_1 Write the function to calculate the combination (Ckn)
function factorial(n){
    if(n===0 || n === 1){
        return 1;
    }
    let result = 1;
    while(n>=2){
        result *=n;
        n--;
    }
    return result;
}

function combination(n,k){
    if(k < 0 || k > n){
        return 0;
    }
    return factorial(n)/(factorial(k)*factorial(n-k));

}
// ex 2_2 Write the function to get a random integer between 2 numbers: min, max;
function randomInt(min,max){
    return Math.floor(Math.random()*(max - min + 1)+min);
    
}
//ex 2_3 Write the function get a random element from an arrays.
function randomElementOfArr(arr){
    const randomIndex = Math.floor(Math.random()*arr.length);
    return arr[randomIndex];
}

//ex 2_4 Given two arrays of integers, find which elements in the second array are missing from the first array.
function findElementInArr2NotInArr1(arr1,arr2){
    return arr2.filter(item => {
        return !arr1.includes(item);
    })
}


console.log(combination(5,2));

const arr = ["a","b","c"];
const randomArr = randomElementOfArr(arr);
console.log(randomArr);

const a = [1, 2, 3, 4];
const b = [2, 3, 4, 5, 6];
console.log(findElementInArr2NotInArr1(a, b));
