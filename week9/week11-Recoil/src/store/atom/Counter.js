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

//Asynchronous Data queries
export const notifications = atom({
    key: "networkAtom",
    default: {
        networks: 3, 
        jobs: 0, 
        messaging: 4, 
        notifications:112

    }
    // default:selector({
    //     key:"networkAtomSelector",
    //     get:async()=>{
    //         const res=await axios.get("https://sum-server.100xdevs.com/notifications");
    //         return res.data
    //     }
    // })
});

export const totalNotificationSelector = selector({
    key: "totalNotificationSelector",
    get: ({get}) => {
        const allNotifications = get(notifications);
        return allNotifications.networks + 
        allNotifications.jobs + 
        allNotifications.notifications + 
        allNotifications.messaging
    }
})