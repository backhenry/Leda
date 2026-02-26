// ==========================================
// CONFIGURAÇÃO DA PLANILHA DO GOOGLE SHEETS
// ==========================================
// Para pegar o link: 
// 1. Abra sua planilha do Google
// 2. Vá em Arquivo > Compartilhar > Publicar na Web
// 3. Escolha a aba da sua planilha, e mude "Página da Web" para "Valores separados por vírgula (.csv)"
// 4. Copie o link e cole na variável abaixo dentro das aspas!
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3QZTvHES50bme4Rb92wb7yELFXUn0dQ5eczGB4aXHEwtiO0I505g4QBhr_hei08NZP8b4muYpKenZ/pub?output=csv';


// Elementos DOM
const elements = {
  tabs: document.querySelectorAll('.nav-tab'),
  pages: document.querySelectorAll('.tab-page'),
  chips: document.querySelectorAll('.chip'),
  searchInput: document.getElementById('searchInput'),
  clearSearchBtn: document.getElementById('clearSearch'),
  recipeGrid: document.getElementById('recipeGrid'),
  favoritesGrid: document.getElementById('favoritesGrid'),
  recipeCount: document.getElementById('recipeCount'),
  emptyState: document.getElementById('emptyState'),
  emptyFavorites: document.getElementById('emptyFavorites'),

  // Header Actions
  btnTextMinus: document.getElementById('btnTextMinus'),
  btnTextPlus: document.getElementById('btnTextPlus'),

  // Splash Screen
  splashScreen: document.getElementById('splashScreen'),

  // Modal Elements
  modal: document.getElementById('recipeDetail'),
  modalBackBtn: document.getElementById('detailBack'),
  modalFavBtn: document.getElementById('detailFav'),
  modalShareBtn: document.getElementById('detailShare'),
  modalTitle: document.getElementById('detailTitle'),
  modalBadge: document.getElementById('detailBadge'),
  modalIngredients: document.getElementById('detailIngredients'),
  modalPreparo: document.getElementById('detailPreparo')
};

// Application State
const state = {
  currentTab: 'receitas',
  currentCategory: 'all',
  searchQuery: '',
  favorites: JSON.parse(localStorage.getItem('vovoleda_favorites')) || [],
  currentFontSize: 100
};

// Receitas Locais / Fallback (caso o usuário não coloque o link ou esteja offline sem cache)
const defaultRecipes = [
  {
    id: "r1", nome: "Bolo de Requeijão",
    ingrediente: "3 ovos\n1 copo de requeijão (250g)\n2 xícaras de chá de açúcar\n1/2 xícara de chá de óleo\n1 pacote de coco ralado (100gr)\n2 xícaras de chá de farinha de trigo\n1 colher de sopa de fermento em pó",
    preparo: "Em uma batedeira, bata todos os ingredientes até incorporar bem.\nPasse para uma forma de furo central untada e enfarinhada e leve ao forno pré-aquecido em temperatura média por cerca de 40 minutos.\nEspere amornar e desenforme.",
    sabor: "d"
  },
  {
    id: "r2", nome: "Quibe Assado",
    ingrediente: "800g de carne moída\n500g de trigo para quibe\n3 dentes de alhos amassados\n2 cebolas picadinhas\n1 a 2 tomates picados sem sementes\nCebolinha e cheiro verde a gosto\nhortelã picadinho a gosto\nSal e pimenta do reino a gosto\n3/4 xícara de azeite",
    preparo: "Deixar o trigo para quibe de molho por 1 hora em água morna.\nEscorrer muito bem e espremer o trigo.\nMisturar os demais ingredientes.\nEspalhe o quibe em uma forma untada com azeite e jogue por cima um pouco mais de azeite.",
    sabor: "s"
  },
  {
    id: "r3", nome: "Pudim Prestígio",
    ingrediente: "Pudim Chocolate:\n1 Leite condensado, creme de leite, leite e chocolate em pó. 1 gelatina incolor.\nPudim Coco:\n1 Leite condensado, creme de leite, leite de coco, coco ralado. 1 gelatina incolor.",
    preparo: "Bata os ingredientes do pudim de chocolate com a gelatina hidratada e coloque na forma. Gele por 1 hora.\nBata os ingredientes do pudim de coco (exceto o ralado) com a gelatina hidratada, misture o coco e jogue por cima. Gele por 6 horas.",
    sabor: "d"
  }
];

let recipes = JSON.parse(localStorage.getItem('vovoleda_recipes')) || defaultRecipes;
let currentRecipeId = null;

// Inicialização
function init() {
  recipes.sort((a, b) => a.nome.localeCompare(b.nome));

  setupEventListeners();
  renderRecipes();
  renderFavorites();
  registerServiceWorker();

  // Esconder splash screen com suavidade imediatamente
  setTimeout(() => {
    elements.splashScreen.classList.add('hidden');
  }, 1200);

  // Tentar buscar novas receitas da Planilha em background
  fetchRecipes();
}

// Buscar da Planilha do Google (Formato CSV)
async function fetchRecipes() {
  if (SHEET_URL.includes('COLE_AQUI')) return;

  try {
    const fetchUrl = SHEET_URL.includes('?') ? `${SHEET_URL}&_t=${new Date().getTime()}` : `${SHEET_URL}?_t=${new Date().getTime()}`;
    const response = await fetch(fetchUrl, { cache: "no-store" });
    if (!response.ok) throw new Error('Falha ao baixar planilha');

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    // Assumimos que a primeira linha são os títulos (cabeçalhos)
    if (rows.length < 2) return;

    const headers = rows[0].map(h => h.trim().toLowerCase());
    const newRecipes = [];

    for (let i = 1; i < rows.length; i++) {
      if (!rows[i] || rows[i].join('').trim() === '') continue; // Pula linhas vazias

      const recipe = {};
      headers.forEach((header, index) => {
        if (header && rows[i][index]) {
          recipe[header] = rows[i][index].trim();
        }
      });

      // Gera ID baseado no nome
      if (recipe.nome) {
        recipe.id = 'r_' + recipe.nome.toLowerCase().replace(/[^a-z0-9]/g, '');
        // Garantir que sabor seja uma letra
        if (recipe.sabor) recipe.sabor = recipe.sabor.toLowerCase().charAt(0);
        else recipe.sabor = 'd'; // Padrao

        newRecipes.push({
          id: recipe.id,
          nome: recipe.nome,
          ingrediente: recipe.ingrediente || '',
          preparo: recipe.preparo || '',
          sabor: recipe.sabor
        });
      }
    }

    if (newRecipes.length > 0) {
      recipes = newRecipes;
      recipes.sort((a, b) => a.nome.localeCompare(b.nome));
      localStorage.setItem('vovoleda_recipes', JSON.stringify(recipes));
      // Forced re-render
      renderRecipes();
      renderFavorites();

      // Force reload UI if empty state
      if (document.getElementById('recipeCount').textContent === "0" && newRecipes.length > 0) {
        window.location.reload();
      }
    }
  } catch (error) {
    console.error('Erro ao processar planilha:', error);
  }
}

// Analisador de CSV simples que suporta aspas duplas (usadas em textos com quebra de linha)
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

// Configurar Eventos
function setupEventListeners() {
  // Tabs
  elements.tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // Categorias
  elements.chips.forEach(chip => {
    chip.addEventListener('click', () => {
      elements.chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.currentCategory = chip.dataset.category;
      renderRecipes();
    });
  });

  // Busca
  elements.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.toLowerCase();
    elements.clearSearchBtn.classList.toggle('visible', state.searchQuery.length > 0);
    renderRecipes();
  });

  elements.clearSearchBtn.addEventListener('click', () => {
    elements.searchInput.value = '';
    state.searchQuery = '';
    elements.clearSearchBtn.classList.remove('visible');
    elements.searchInput.focus();
    renderRecipes();
  });

  // Modal Botoes
  elements.modalBackBtn.addEventListener('click', closeModal);

  elements.modalFavBtn.addEventListener('click', () => {
    if (currentRecipeId) {
      toggleFavorite(currentRecipeId);
      updateModalFavoriteState(currentRecipeId);
      renderRecipes();
      renderFavorites();
    }
  });

  // Compartilhar Nativo Web API
  elements.modalShareBtn.addEventListener('click', async () => {
    if (!currentRecipeId) return;
    const recipe = recipes.find(r => r.id === currentRecipeId);
    if (!recipe) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Receita de ${recipe.nome}`,
          text: `Olha essa receita deliciosa de ${recipe.nome} da Vovó Leda!`,
          url: window.location.href,
        });
      } catch (err) { }
    } else {
      alert(`Compartilhamento não suportado neste navegador. Copie o link principal.\n\nReceita: ${recipe.nome}`);
    }
  });

  // Tamanho do Texto A+ A- (Escala infinita)
  elements.btnTextPlus.addEventListener('click', () => {
    state.currentFontSize += 10;
    document.documentElement.style.fontSize = `${state.currentFontSize}%`;
  });

  elements.btnTextMinus.addEventListener('click', () => {
    if (state.currentFontSize > 80) { // Limite mínimo para não sumir
      state.currentFontSize -= 10;
      document.documentElement.style.fontSize = `${state.currentFontSize}%`;
    }
  });

  // Fechar modal ao deslizar para baixo
  let touchStartY = 0;
  elements.modal.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  elements.modal.addEventListener('touchend', e => {
    const touchEndY = e.changedTouches[0].screenY;
    if (touchEndY - touchStartY > 100 && elements.modal.querySelector('.detail-body').scrollTop === 0) {
      closeModal();
    }
  }, { passive: true });
}

function switchTab(tabId) {
  state.currentTab = tabId;
  elements.tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.tab === tabId));
  elements.pages.forEach(page => page.classList.toggle('active', page.id === `tab-${tabId}`));
  window.scrollTo(0, 0);
}

function renderRecipes() {
  const filtered = recipes.filter(recipe => {
    const matchesCategory = state.currentCategory === 'all' || recipe.sabor === state.currentCategory;
    const query = state.searchQuery;
    const matchesSearch = recipe.nome.toLowerCase().includes(query) ||
      (recipe.ingrediente && recipe.ingrediente.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  elements.recipeCount.textContent = filtered.length;

  if (filtered.length === 0) {
    elements.recipeGrid.innerHTML = '';
    elements.emptyState.classList.remove('hidden');
  } else {
    elements.emptyState.classList.add('hidden');
    elements.recipeGrid.innerHTML = filtered.map(recipe => createRecipeCard(recipe)).join('');

    document.querySelectorAll('#recipeGrid .recipe-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.card-fav-btn')) openModal(card.dataset.id);
      });
    });

    document.querySelectorAll('#recipeGrid .card-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(btn.dataset.id);
        renderRecipes();
        renderFavorites();
      });
    });
  }
}

function renderFavorites() {
  const favRecipes = recipes.filter(r => state.favorites.includes(r.id));

  if (favRecipes.length === 0) {
    elements.favoritesGrid.innerHTML = '';
    elements.emptyFavorites.style.display = 'block';
  } else {
    elements.emptyFavorites.style.display = 'none';
    elements.favoritesGrid.innerHTML = favRecipes.map(recipe => createRecipeCard(recipe)).join('');

    document.querySelectorAll('#favoritesGrid .recipe-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.card-fav-btn')) openModal(card.dataset.id);
      });
    });

    document.querySelectorAll('#favoritesGrid .card-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(btn.dataset.id);
        renderFavorites();
        renderRecipes();
      });
    });
  }
}

function createRecipeCard(recipe) {
  const isFav = state.favorites.includes(recipe.id);
  const badgeInfo = getBadgeInfo(recipe.sabor);

  const preview = recipe.ingrediente
    ? recipe.ingrediente.split('\n').slice(0, 2).map(line => line.trim().replace(/^[\-\*•\s]*/, '')).join(', ') + '...'
    : '';

  return `
    <article class="recipe-card" data-id="${recipe.id}">
      <div class="card-header">
        <span class="card-emoji">${badgeInfo.emoji}</span>
        <button class="card-fav-btn ${isFav ? 'favorited' : ''}" data-id="${recipe.id}" aria-label="Favoritar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <h3 class="card-name">${recipe.nome}</h3>
      <span class="card-badge ${badgeInfo.class}">${badgeInfo.label}</span>
      <p class="card-preview">${preview}</p>
    </article>
  `;
}

function toggleFavorite(id) {
  const index = state.favorites.indexOf(id);
  if (index === -1) state.favorites.push(id);
  else state.favorites.splice(index, 1);
  localStorage.setItem('vovoleda_favorites', JSON.stringify(state.favorites));
}

function openModal(id) {
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;

  currentRecipeId = id;
  const badgeInfo = getBadgeInfo(recipe.sabor);

  elements.modalTitle.textContent = recipe.nome;
  elements.modalBadge.innerHTML = `<span class="card-badge ${badgeInfo.class}">${badgeInfo.emoji} ${badgeInfo.label}</span>`;
  updateModalFavoriteState(id);

  const ingredientsHtml = parseLines(recipe.ingrediente).map(line => {
    if (line.endsWith(':') || /massa:|recheio:|cobertura:/i.test(line)) {
      return `<div class="ingredient-subsection">${line}</div>`;
    }
    const cleanLine = line.replace(/^[\-\*•\s]+/, '');
    return `<div class="ingredient-item">${cleanLine}</div>`;
  }).join('');
  elements.modalIngredients.innerHTML = ingredientsHtml || '<div class="ingredient-item">-</div>';

  const preparoHtml = parseLines(recipe.preparo).map(line => {
    if (line.toLowerCase().startsWith('dica:')) {
      return `<div class="preparo-dica"><strong>Dica:</strong> ${line.substring(5).trim()}</div>`;
    } else if (line.endsWith(':')) {
      return `<strong>${line}</strong>`;
    }
    return `<p class="preparo-paragraph">${line}</p>`;
  }).join('');
  elements.modalPreparo.innerHTML = preparoHtml || '<p class="preparo-paragraph">-</p>';

  document.body.style.overflow = 'hidden';
  elements.modal.classList.add('open');
  elements.modal.querySelector('.detail-body').scrollTop = 0;
}

function closeModal() {
  elements.modal.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => currentRecipeId = null, 350);
}

function updateModalFavoriteState(id) {
  const isFav = state.favorites.includes(id);
  elements.modalFavBtn.classList.toggle('favorited', isFav);
}

function getBadgeInfo(sabor) {
  switch (sabor) {
    case 'd': return { label: 'Doce', class: 'badge-doce', emoji: '🍰' };
    case 's': return { label: 'Salgado', class: 'badge-salgado', emoji: '🍖' };
    case 'b': return { label: 'Bebida', class: 'badge-bebida', emoji: '🍹' };
    default: return { label: 'Receita', class: 'badge-doce', emoji: '🍽️' };
  }
}

function parseLines(text) {
  if (!text) return [];
  return text.toString().split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(err => console.log('SW failed: ', err));
    });
  }
}

document.addEventListener('DOMContentLoaded', init);
