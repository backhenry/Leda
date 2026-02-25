const fs = require('fs');

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3QZTvHES50bme4Rb92wb7yELFXUn0dQ5eczGB4aXHEwtiO0I505g4QBhr_hei08NZP8b4muYpKenZ/pub?output=csv';

function parseCSV(text) {
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
    for (l of text) {
        if ('"' === l) {
            if (s && l === p) row[i] += l;
            s = !s;
        } else if (',' === l && s) l = row[++i] = '';
        else if ('\n' === l && s) {
            if ('\r' === p) row[i] = row[i].slice(0, -1);
            row = ret[++r] = [l = '']; i = 0;
        } else row[i] += l;
        p = l;
    }
    return ret;
}

async function run() {
    const res = await fetch(SHEET_URL);
    const text = await res.text();
    const rows = parseCSV(text);
    console.log("Rows:", rows.length);
    console.log("Headers:", rows[0]);
    if (rows.length > 1) {
        console.log("First row columns:", rows[1].length);
        console.log("First row ID:", rows[1][0]);
    }

    const headers = rows[0].map(h => h.trim().toLowerCase());
    const newRecipes = [];

    for (let i = 1; i < rows.length; i++) {
        if (rows[i].length < Math.min(4, headers.length)) continue;

        const recipe = {};
        headers.forEach((header, index) => {
            if (header && rows[i][index]) {
                recipe[header] = rows[i][index].trim();
            }
        });

        if (recipe.nome) {
            recipe.id = 'r_' + recipe.nome.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (recipe.sabor) recipe.sabor = recipe.sabor.toLowerCase().charAt(0);
            else recipe.sabor = 'd';

            newRecipes.push({
                id: recipe.id,
                nome: recipe.nome,
                ingrediente: recipe.ingrediente || '',
                preparo: recipe.preparo || '',
                sabor: recipe.sabor
            });
        }
    }
    console.log("Parsed recipes count:", newRecipes.length);
}
run();
