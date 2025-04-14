import {atom, selector} from "recoil"

export const CounterAtom=atom({
    key:"Counter",
    default:0
})

//selector
export const evenSelector=selector({
    key:"isEvenSelector",
    get:function({get}){
        const currentCount=get(CounterAtom);
        const isEven=(currentCount%2==0);
        return isEven;
    }
})