/*
  site.js — lógica compartida entre todas las páginas (index.html, galeria.html)
  ================================================================
  EDITA SOLO ESTAS DOS LÍNEAS cuando tengan nombre y número listos.
  Como este archivo lo cargan todas las páginas, el cambio se
  refleja en todas a la vez.
  ================================================================
*/
const SONIDO_NOMBRE = "Sonido Komando";
const SONIDO_WHATSAPP = "5214445101682"; // formato: 521 + 10 dígitos, sin espacios ni signos

// Inserta el nombre en el logo, hero y footer (donde exista en la página)
document.querySelectorAll('#logoName, #heroName, #footerName').forEach(el => el.textContent = SONIDO_NOMBRE);

// Arma los links de WhatsApp (donde existan en la página)
const waMsg = encodeURIComponent(`Hola, vi la página de ${SONIDO_NOMBRE} y quiero cotizar un evento.`);
const waLink = `https://wa.me/${SONIDO_WHATSAPP}?text=${waMsg}`;
document.querySelectorAll('#navWhatsapp, #heroWhatsapp, #contactWhatsapp').forEach(el => el.href = waLink);

const contactPhoneDisplay = document.getElementById('contactPhoneDisplay');
if (contactPhoneDisplay) {
  contactPhoneDisplay.textContent = `WHATSAPP: +${SONIDO_WHATSAPP.replace(/(\d{3})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')}`;
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============ EQ BARS GENERATOR ============ */
function buildEq(container, count, minRange, maxRange) {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const bar = document.createElement('span');
    const min = (Math.random() * (minRange[1] - minRange[0]) + minRange[0]).toFixed(2);
    const max = (Math.random() * (maxRange[1] - maxRange[0]) + maxRange[0]).toFixed(2);
    const dur = (0.7 + Math.random() * 0.9).toFixed(2);
    const delay = (Math.random() * 1.2).toFixed(2);
    bar.style.setProperty('--min', min);
    bar.style.setProperty('--max', max);
    bar.style.animationDuration = dur + 's';
    bar.style.animationDelay = delay + 's';
    frag.appendChild(bar);
  }
  container.appendChild(frag);
}
document.querySelectorAll('.divider-eq').forEach(el => buildEq(el, 60, [0.08, 0.2], [0.5, 1]));
const heroEqEl = document.getElementById('heroEq');
if (heroEqEl) buildEq(heroEqEl, 90, [0.05, 0.15], [0.6, 1]);

/* ============ MOBILE NAV ============ */
const navToggle = document.getElementById('navToggle');
const navUl = document.querySelector('nav ul');
if (navToggle && navUl) {
  navToggle.addEventListener('click', () => {
    const open = navUl.style.display === 'flex';
    navUl.style.cssText = open ? '' : 'display:flex; flex-direction:column; gap:14px; position:fixed; top:72px; right:24px; background:#15151f; border:1px solid var(--border); padding:20px 28px; border-radius:14px;';
  });
  document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => navUl.style.cssText = ''));
}

/* ============ SCROLL REVEAL ============ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('in'); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
