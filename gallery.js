/*
  gallery.js — galería reutilizable, se usa en index.html (vista previa)
  y en galeria.html (galería completa)
  ================================================================
  No edites nada aquí. Para agregar o quitar fotos/videos:
  1) Copia o borra archivos en la carpeta /media
  2) git add / commit / push
  Vercel corre generate-media.js automáticamente al publicar,
  que crea media/manifest.json con la lista de archivos.
  Esta página solo lee ese manifiesto.
  ================================================================
*/

async function fetchGaleriaItems() {
  try {
    const res = await fetch('media/manifest.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('manifest.json no encontrado');
    return await res.json();
  } catch (e) {
    return [];
  }
}

function setupLightbox(lightboxEl, contentEl, closeEl) {
  function openLightbox(item) {
    contentEl.innerHTML = item.type === 'video' ?
      `<video src="${item.file}" controls autoplay></video>` :
      `<img src="${item.file}" alt="Foto de un evento">`;
    lightboxEl.classList.add('open');
  }
  closeEl.addEventListener('click', () => { lightboxEl.classList.remove('open'); contentEl.innerHTML = ''; });
  lightboxEl.addEventListener('click', (e) => {
    if (e.target === lightboxEl) { lightboxEl.classList.remove('open'); contentEl.innerHTML = ''; }
  });
  return openLightbox;
}

function renderGalleryGrid(items, gridEl, openLightbox, emptyMessage) {
  gridEl.innerHTML = '';
  if (items.length === 0) {
    gridEl.innerHTML = `<div class="gal-empty">${emptyMessage}</div>`;
    return;
  }
  items.forEach((item) => {
    const cell = document.createElement('div');
    cell.className = 'gal-item';
    const media = item.type === 'video' ?
      `<video src="${item.file}" muted></video><span class="play-badge"><svg viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.35)"/><path d="M9 7l9 5-9 5V7z" fill="white"/></svg></span>` :
      `<img src="${item.file}" alt="Foto de un evento" loading="lazy">`;
    cell.innerHTML = media;
    cell.addEventListener('click', () => openLightbox(item));
    gridEl.appendChild(cell);
  });
}

async function initGallery({
  gridId = 'galGrid',
  lightboxId = 'lightbox',
  contentId = 'lightboxContent',
  closeId = 'lightboxClose',
  limit = null,
  emptyMessage = 'Aún no hay fotos ni videos.'
} = {}) {
  const gridEl = document.getElementById(gridId);
  const lightboxEl = document.getElementById(lightboxId);
  const contentEl = document.getElementById(contentId);
  const closeEl = document.getElementById(closeId);
  if (!gridEl || !lightboxEl || !contentEl || !closeEl) return;

  const openLightbox = setupLightbox(lightboxEl, contentEl, closeEl);
  let items = await fetchGaleriaItems();
  if (limit) items = items.slice(0, limit);
  renderGalleryGrid(items, gridEl, openLightbox, emptyMessage);
}
