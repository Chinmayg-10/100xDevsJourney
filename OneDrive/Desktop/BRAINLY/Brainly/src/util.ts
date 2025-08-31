export function random(len:number){
    let sample="qwertyuiopasdfghjklzxcvbnm1234567890";
    let length=sample.length;
    let ans="";
    for(let i=0;i<len;i++){
        ans+=sample[Math.floor(Math.random()*length)];
    }
    return ans;

}