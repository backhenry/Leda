const fs = require('fs');
const https = require('https');

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

https.get(SHEET_URL, (res) => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
        try {
            const rows = parseCSV(data);
            console.log("Rows count:", rows.length);
            if (rows.length < 2) return;

            const headers = rows[0].map(h => h.trim().toLowerCase());
            console.log("Headers:", headers);
            const newRecipes = [];

            for (let i = 1; i < rows.length; i++) {
                if (rows[i].length < Math.min(4, headers.length)) continue; // Pula linhas vazias

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
            console.log("First recipe:", newRecipes[0]);
        } catch (err) {
            console.log("Error:", err);
        }
    });
});
