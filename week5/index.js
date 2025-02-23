//map,filter,arrow functions

const sum=(a,b)=>{
    return a+b;
}
console.log(sum(3,4));

//map
let input=[1,2,3,4,5];

function transform(i){
    return i*2;
}
const arr=input.map(transform);
console.log(arr);

//filter
function filterLogic(n){
    if(n%2==0){
        return true;
    }
    else{
        return false;
    }
}

const ans=input.filter(filterLogic);
console.log(ans);

console.log("harkirat".startsWith('h'));