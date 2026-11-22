/* MADRID ACADEMY — boot, time tracking, migration */
(function () {
  const { U, S, UI, H } = MA; const st = () => S.state;
  /* ---------- TIME TRACKING ---------- */
  let lastAct = Date.now(), unsaved = 0;
  ['click', 'keydown', 'pointermove', 'scroll'].forEach(ev => document.addEventListener(ev, () => lastAct = Date.now(), { passive: true }));
  setInterval(() => {
    if (document.visibilityState !== 'visible' || Date.now() - lastAct > 90000 || !st().profile.onboarded) return;
    const cat = H.catOf(H.current.name, H.current.arg); if (!cat) return;
    const d = S.today(); const s = st().study[d] = st().study[d] || {}; s[cat] = (s[cat] || 0) + 15; unsaved++;
    if (unsaved >= 4) { unsaved = 0; S.save(); }
  }, 15000);

  /* ---------- BOOT ---------- */
  S.loadLocal();
  H.migrate();
  let rt = null;
  const STABLE = ['home', 'map', 'madrid', 'passport', 'progress', 'quests', 'preferences', 'about', 'calendar', 'stage'];
  S.onChange(() => { clearTimeout(rt); rt = setTimeout(() => { const n = H.current.name, a = H.current.arg; const stable = (STABLE.includes(n) && (!a || n === 'stage')) || (n === 'city' && !/-(practice|vocabulary)/.test(a)); if (stable && !U.$('#modal.open') && !(document.activeElement && document.activeElement.matches('input, textarea, select'))) H.render(); else H.soft(); if ((n === 'create') !== !st().profile.onboarded) H.render(); }, 120); });
  window.addEventListener('hashchange', () => H.onHash());
  window.addEventListener('online', () => S.ref && S.pushCloud());
  H.navInit();
  H.render();
  S.initCloud();
  Promise.all([MA.AI.init(), MA.Audio.init(), MA.Mic.init()]).then(() => { if (['chat', 'talk', 'preferences', 'write', 'radio', 'journal', 'city'].includes(H.current.name) && !(document.activeElement && document.activeElement.matches('input, textarea'))) H.render(); });
})();
