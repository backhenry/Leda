// Application State
const state = {
  currentTab: 'receitas',
  currentCategory: 'all',
  searchQuery: '',
  favorites: JSON.parse(localStorage.getItem('vovoleda_favorites')) || []
};

// DOM Elements
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

// Currently viewed recipe ID
let currentRecipeId = null;

// Initialize App
function init() {
  // Sort recipes alphabetically
  recipes.sort((a, b) => a.nome.localeCompare(b.nome));

  setupEventListeners();
  renderRecipes();
  renderFavorites();
  registerServiceWorker();

  // Hide splash screen after 1.5 seconds
  setTimeout(() => {
    elements.splashScreen.classList.add('hidden');
  }, 1500);
}

// Setup Event Listeners
function setupEventListeners() {
  // Navigation Tabs
  elements.tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // Category Filters
  elements.chips.forEach(chip => {
    chip.addEventListener('click', () => {
      elements.chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.currentCategory = chip.dataset.category;
      renderRecipes();
    });
  });

  // Search
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

  // Modal Actions
  elements.modalBackBtn.addEventListener('click', closeModal);

  elements.modalFavBtn.addEventListener('click', () => {
    if (currentRecipeId) {
      toggleFavorite(currentRecipeId);
      updateModalFavoriteState(currentRecipeId);
      // Re-render grids to reflect changes
      renderRecipes();
      renderFavorites();
    }
  });

  // Web Share API
  elements.modalShareBtn.addEventListener('click', async () => {
    if (!currentRecipeId) return;
    const recipe = recipes.find(r => r.id === currentRecipeId);

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Receita de ${recipe.nome}`,
          text: `Olha essa receita deliciosa de ${recipe.nome} da Vovó Leda!`,
          url: window.location.href, // Sharing the current app URL
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback if Web Share is not supported
      alert(`Para compartilhar, copie o link desta página.\nReceita: ${recipe.nome}`);
    }
  });

  // Font Size Resizing
  elements.btnTextPlus.addEventListener('click', () => {
    const html = document.documentElement;
    if (!html.classList.contains('font-large') && !html.classList.contains('font-xlarge')) {
      html.classList.add('font-large');
    } else if (html.classList.contains('font-large')) {
      html.classList.remove('font-large');
      html.classList.add('font-xlarge');
    }
  });

  elements.btnTextMinus.addEventListener('click', () => {
    const html = document.documentElement;
    if (html.classList.contains('font-xlarge')) {
      html.classList.remove('font-xlarge');
      html.classList.add('font-large');
    } else if (html.classList.contains('font-large')) {
      html.classList.remove('font-large');
    }
  });

  // Close modal on swipe down (simple implementation)
  let touchStartY = 0;
  elements.modal.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  elements.modal.addEventListener('touchend', e => {
    const touchEndY = e.changedTouches[0].screenY;
    // If scrolled down significantly and at the top of the modal
    if (touchEndY - touchStartY > 100 && elements.modal.querySelector('.detail-body').scrollTop === 0) {
      closeModal();
    }
  }, { passive: true });
}

// Switch Bottom Tabs
function switchTab(tabId) {
  state.currentTab = tabId;

  // Update Tab Styling
  elements.tabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === tabId);
  });

  // Update Pages
  elements.pages.forEach(page => {
    page.classList.toggle('active', page.id === `tab-${tabId}`);
  });

  // Scroll to top when switching tabs
  window.scrollTo(0, 0);
}

// Render Recipes to Grid
function renderRecipes() {
  const filtered = recipes.filter(recipe => {
    const matchesCategory = state.currentCategory === 'all' || recipe.sabor === state.currentCategory;
    const matchesSearch = recipe.nome.toLowerCase().includes(state.searchQuery) ||
      recipe.ingrediente.toLowerCase().includes(state.searchQuery);
    return matchesCategory && matchesSearch;
  });

  elements.recipeCount.textContent = filtered.length;

  if (filtered.length === 0) {
    elements.recipeGrid.innerHTML = '';
    elements.emptyState.classList.remove('hidden');
  } else {
    elements.emptyState.classList.add('hidden');
    elements.recipeGrid.innerHTML = filtered.map(recipe => createRecipeCard(recipe)).join('');

    // Add click listeners to new cards
    document.querySelectorAll('#recipeGrid .recipe-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Prevent modal open if clicking the favorite button
        if (!e.target.closest('.card-fav-btn')) {
          openModal(card.dataset.id);
        }
      });
    });

    // Add click listeners to favorite buttons
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

// Render Favorites Grid
function renderFavorites() {
  const favRecipes = recipes.filter(r => state.favorites.includes(r.id));

  if (favRecipes.length === 0) {
    elements.favoritesGrid.innerHTML = '';
    elements.emptyFavorites.style.display = 'block';
  } else {
    elements.emptyFavorites.style.display = 'none';
    elements.favoritesGrid.innerHTML = favRecipes.map(recipe => createRecipeCard(recipe)).join('');

    // Add click listeners
    document.querySelectorAll('#favoritesGrid .recipe-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.card-fav-btn')) {
          openModal(card.dataset.id);
        }
      });
    });

    document.querySelectorAll('#favoritesGrid .card-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(btn.dataset.id);
        renderFavorites();
        renderRecipes(); // Update main grid too
      });
    });
  }
}

// Create Recipe Card HTML
function createRecipeCard(recipe) {
  const isFav = state.favorites.includes(recipe.id);
  const badgeInfo = getBadgeInfo(recipe.sabor);

  // Create a short preview of ingredients
  const preview = recipe.ingrediente
    .split('\n')
    .slice(0, 2)
    .map(line => line.trim().replace(/^[\-\*•\s]*/, ''))
    .join(', ') + '...';

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

// Toggle Favorite State
function toggleFavorite(id) {
  const index = state.favorites.indexOf(id);
  if (index === -1) {
    state.favorites.push(id);
  } else {
    state.favorites.splice(index, 1);
  }
  localStorage.setItem('vovoleda_favorites', JSON.stringify(state.favorites));
}

// Open Recipe Modal
function openModal(id) {
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;

  currentRecipeId = id;
  const badgeInfo = getBadgeInfo(recipe.sabor);

  // Populate Modal
  elements.modalTitle.textContent = recipe.nome;
  elements.modalBadge.innerHTML = `<span class="card-badge ${badgeInfo.class}">${badgeInfo.emoji} ${badgeInfo.label}</span>`;

  updateModalFavoriteState(id);

  // Format Ingredients
  const ingredientsHtml = parseLines(recipe.ingrediente).map(line => {
    if (line.endsWith(':') || line.toLowerCase().includes('massa:') || line.toLowerCase().includes('recheio:') || line.toLowerCase().includes('cobertura:')) {
      return `<div class="ingredient-subsection">${line}</div>`;
    }
    return `<div class="ingredient-item">${line}</div>`;
  }).join('');
  elements.modalIngredients.innerHTML = ingredientsHtml;

  // Format Preparo
  const preparoHtml = parseLines(recipe.preparo).map(line => {
    if (line.toLowerCase().startsWith('dica:')) {
      return `<div class="preparo-dica"><strong>Dica:</strong> ${line.substring(5).trim()}</div>`;
    } else if (line.endsWith(':')) {
      return `<strong>${line}</strong>`;
    }
    return `<p class="preparo-paragraph">${line}</p>`;
  }).join('');
  elements.modalPreparo.innerHTML = preparoHtml;

  // Show Modal
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
  elements.modal.classList.add('open');
  elements.modal.querySelector('.detail-body').scrollTop = 0;
}

// Close Recipe Modal
function closeModal() {
  elements.modal.classList.remove('open');
  document.body.style.overflow = ''; // Restore background scrolling
  setTimeout(() => {
    currentRecipeId = null;
  }, 350); // Wait for transition
}

function updateModalFavoriteState(id) {
  const isFav = state.favorites.includes(id);
  elements.modalFavBtn.classList.toggle('favorited', isFav);
}

// Helper Utils
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
  // Split by newline and remove empty lines
  return text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
}

// Service Worker Registration
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').then(registration => {
        console.log('SW registered: ', registration.scope);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
}

// Boot the app
document.addEventListener('DOMContentLoaded', init);
