import * as DataLoader from "dataloader";

async function batchUsers(User, emails) {
    return await User.find({email: {$in: emails}}).toArray();
}

export const BuildDataloaders = (User) => {

    return {
        cacheKeyFn: (key) => key.toString(),
        users: new DataLoader((emails) => batchUsers(User, emails)),
    };

};
