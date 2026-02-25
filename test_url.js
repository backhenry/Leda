const https = require('https');
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3QZTvHES50bme4Rb92wb7yELFXUn0dQ5eczGB4aXHEwtiO0I505g4QBhr_hei08NZP8b4muYpKenZ/pub?output=csv';

https.get(SHEET_URL, (res) => {
    console.log("Status Code:", res.statusCode);
    console.log("Headers:", JSON.stringify(res.headers, null, 2));
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
        console.log("First 200 chars:", data.substring(0, 200));
    });
}).on('error', e => console.log(e));
