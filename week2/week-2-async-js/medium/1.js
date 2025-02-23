const fs=require('fs');

fs.readFile("ab.txt","utf8",function(err,data){
    if(err){
        console.log("file cannot be read!!");
    }
    else{
        const cleanedContent = data.replace(/\s+/g, ' ').trim();
        fs.writeFile("ab.txt",cleanedContent,function(err){
            if(err){
                console.log("file cannot be written");
            }
            else{
                console.log("file updated");
            }
        })
    }
})