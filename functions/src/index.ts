import * as v2 from 'firebase-functions/v2';

type Indexable = { [key: string]: any };

export const helloWorld = v2.https.onRequest((req,res) => {
    const name = req.params[0].replace('/','');
    const items: Indexable = {lamp:'This is a lamp',chair:'This is a chair'};
    const message = items[name] ;
    res.send(`<h1>${message}</h1>`);
})