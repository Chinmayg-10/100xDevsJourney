import { atomFamily, selectorFamily } from "recoil";
import {TODOS} from "./todos"
import axios from "axios";
// export const todosAtomFamily=atomFamily({
//     key:"todoAtomFamily",
//     default:id=>{
//         let foundtodo=null;
//         for(let i=0;i<TODOS.length;i++){
//             if(TODOS[i].id===id){
//                 foundtodo=TODOS[i];
//             }
//         }
//         return foundtodo;
//     },
// });

//selector Family
//if there is a proper link
// export const todosAtomFamily=atomFamily({
//     key:"todosAtomFamily",
//     default:selectorFamily({
//         get:(id)=>async({get})=>{
//             await new Promise(r => setTimeout(r,5000));
//             const res=await axios.get('https://sum-server.100xdevs.com/todo?id=${id}');
//             return res.data.todo;
//         }
//     })
// })
export const todosAtomFamily = atomFamily({
    key: "todosAtomFamily",
    default: selectorFamily({
      key: "todosSelectorFamily",
      get: (id) => async ({ get }) => {
        await new Promise((r) => setTimeout(r, 5000)); // reduced delay for testing
        const todoItem = TODOS.find(item => item.id === id);
        return todoItem
      }
    })
  });