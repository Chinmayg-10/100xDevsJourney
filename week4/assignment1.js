// const fs=require("fs");

// function countWords(filename){
//     fs.readFile(filename,"utf8",function(err,data){
//         let total=0;
//         for(let i=0;i<data.length;i++){
//             if(data[i]==" "){
//                 total++;
//             }
//         }
//         console.log(total);
//     })
// }
// if(process.argv[2]=="-h"){

// }
// else{
//     countWords(process.argv[2]);
// }

const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .name('counter')
  .description('CLI to do file based tasks')
  .version('0.8.0');

program.command('countwords')
  .description('Count the number of words in a file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const words = data.split(' ').length;
        console.log(`There are ${words} words in ${file}`);
      }
    });
  });

program.parse();