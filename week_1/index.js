// assignment
function Check(array){
    for(let i=0;i<3;i++){
        if((array[i].age >=18) && (array[i].gender=="male")){
            console.log(array[i].name);
        }
    }
    
}

const users=[{
    name:"Chinmay",
    age:20,
    gender:"male"
},{
    name:"tanmay",
    age:14,
    gender:"male"
},{
    name:"Shailvi", 
    age:24,
    gender:"female"
}]
Check(users);

