const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3QZTvHES50bme4Rb92wb7yELFXUn0dQ5eczGB4aXHEwtiO0I505g4QBhr_hei08NZP8b4muYpKenZ/pub?output=csv';

async function testFetch() {
    console.log("Fetching...");
    const res = await fetch(SHEET_URL);
    console.log("Status:", res.status);
    console.log("URL:", res.url);
    const text = await res.text();
    console.log("Length:", text.length);
    console.log("First 500 chars:", text.substring(0, 500));
}
testFetch().catch(console.error);
