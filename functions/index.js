/* eslint-disable promise/no-nesting */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.deleteStories24Hours = functions.pubsub.schedule("every 12 hours").onRun(async(context)=>{
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const yesterday = new Date(now - oneDay);
    await admin.firestore().collection('/stories').where('createdAt', '<', yesterday)
    .get().then( (snapshot)=> {
        snapshot.forEach((doc)=> {
             doc.ref.delete()
             .then((res) => console.log(res))
             .catch((err) => console.log(err))
        });
        return ;
    })
    .catch((err)=>{
        console.log(err);
    })
});
