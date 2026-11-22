/* Bee's new wardrobe (5 looks). Moves a saved old outfit to its new look and keeps anything already bought. */
(function () {
  const { S, H } = MA; const st = () => S.state;
  const m0 = H.migrate;
  H.migrate = function () {
    const r = m0 ? m0.apply(this, arguments) : undefined;
    const s = st(), M = MA.OUTFIT_MAP || {}; if (!s || !s.avatar) return r;
    let changed = false;
    Object.entries(M).forEach(([old, nu]) => { if (s.owned && s.owned['outfit:' + old] && !s.owned['outfit:' + nu]) { s.owned['outfit:' + nu] = true; changed = true; } });
    if (M[s.avatar.outfit]) { s.avatar.outfit = M[s.avatar.outfit]; changed = true; }
    if (changed) { s.avatarAt = Date.now(); S.save(true); }
    return r;
  };
})();
