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
        networks: 4, 
        jobs: 6, 
        messaging: 3, 
        notifications: 3
    }
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