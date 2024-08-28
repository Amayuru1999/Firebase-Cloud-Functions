import * as v2 from 'firebase-functions/v2';
import * as v1 from 'firebase-functions/v1';

type Indexable = { [key: string]: any };

export const helloWorld = v2.https.onRequest((req,res) => {
    const name = req.params[0].replace('/','');
    const items: Indexable = {lamp:'This is a lamp',chair:'This is a chair'};
    const message = items[name] ;
    res.send(`<h1>${message}</h1>`);
})

type Sku = {name: string; usd: number; eur?: number};
const USD_TO_EUROS = 0.85;

export const newsku = v1.firestore.document('/inventory/{sku}')
    .onCreate(snapshot => {
        const data = snapshot.data() as Sku;
        const eur =data.usd * USD_TO_EUROS;
        return snapshot.ref.set({eur}, {merge: true});
    });