import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import { setMaxListeners } from 'node:events';
import ts from 'typescript';

// Execute the real hook with deterministic browser primitives. No timers or
// browser automation are needed to exercise preference changes and teardown.
const source = await readFile(new URL('../components/motion-effects.tsx', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
}).outputText;

class TrackedTarget extends EventTarget {
  listeners = [];
  addEventListener(type, listener, options) {
    // Tracking adds an extra abort listener; do not warn about the harness itself.
    if (options?.signal) setMaxListeners(0, options.signal);
    super.addEventListener(type, listener, options);
    const record = { type, listener, active: !options?.signal?.aborted };
    this.listeners.push(record);
    options?.signal?.addEventListener('abort', () => { record.active = false; }, { once: true });
  }
  removeEventListener(type, listener, options) {
    super.removeEventListener(type, listener, options);
    for (const record of this.listeners) if (record.type === type && record.listener === listener) record.active = false;
  }
  count(type) { return this.listeners.filter((record) => record.active && (!type || record.type === type)).length; }
}

function harness({ reduced = false, fine = true, hidden = false, intersection = true, animate = true } = {}) {
  const frames = new Map();
  const observers = [];
  const animations = [];
  const effects = [];
  const cleanups = [];
  let nextFrame = 1;

  const window = new TrackedTarget();
  Object.assign(window, { innerHeight: 800, innerWidth: 1200, scrollY: 0 });
  const document = new TrackedTarget();
  document.hidden = hidden;
  document.visibilityState = hidden ? 'hidden' : 'visible';
  const reducedQuery = new TrackedTarget();
  reducedQuery.matches = reduced;
  const fineQuery = new TrackedTarget();
  fineQuery.matches = fine;
  window.matchMedia = (query) => query.includes('prefers-reduced-motion') ? reducedQuery : fineQuery;

  class ElementNode extends TrackedTarget {
    constructor(tag, classes = '', top = 0, height = 100, parent = null) {
      super();
      this.tagName = tag.toUpperCase();
      this.parentElement = parent;
      this.rect = { top, left: 100, width: 400, height };
      this.attributes = new Map();
      this.classes = new Set(classes.split(/\s+/).filter(Boolean));
      this.classList = {
        add: (...names) => names.forEach((name) => this.classes.add(name)),
        remove: (...names) => names.forEach((name) => this.classes.delete(name)),
        contains: (name) => this.classes.has(name),
        toggle: (name, force) => {
          const add = force ?? !this.classes.has(name);
          if (add) this.classes.add(name); else this.classes.delete(name);
          return add;
        },
      };
      const properties = new Map();
      this.style = {
        properties,
        setProperty: (name, value) => properties.set(name, String(value)),
        getPropertyValue: (name) => properties.get(name) ?? '',
        removeProperty: (name) => { const previous = properties.get(name); properties.delete(name); return previous; },
      };
    }
    get id() { return this.getAttribute('id') ?? ''; }
    set id(value) { this.setAttribute('id', value); }
    get href() { return this.getAttribute('href') ?? ''; }
    get hash() { return new URL(this.href, 'https://example.test/').hash; }
    getBoundingClientRect() {
      const top = this.rect.top - window.scrollY;
      return { ...this.rect, top, bottom: top + this.rect.height, right: this.rect.left + this.rect.width, x: this.rect.left, y: top };
    }
    setAttribute(name, value) { this.attributes.set(name, String(value)); }
    getAttribute(name) { return this.attributes.get(name) ?? null; }
    removeAttribute(name) { this.attributes.delete(name); }
    matches(selector) { return selector.split(',').some((part) => matches(this, part.trim())); }
    closest(selector) { if (this.matches(selector)) return this; for (let item = this.parentElement; item; item = item.parentElement) if (item.matches(selector)) return item; return null; }
    contains(other) { for (let item = other; item; item = item.parentElement) if (item === this) return true; return false; }
    querySelectorAll(selector) { return elements.filter((item) => item !== this && this.contains(item) && item.matches(selector)); }
    querySelector(selector) { return this.querySelectorAll(selector)[0] ?? null; }
    animate(keyframes, options) {
      const animation = {
        target: this, keyframes, options, cancelled: false, finished: false,
        cancel() { this.cancelled = true; this.oncancel?.(); },
        finish() { this.finished = true; this.onfinish?.(); },
      };
      animations.push(animation);
      return animation;
    }
  }
  if (!animate) delete ElementNode.prototype.animate;

  function simpleMatch(element, selector) {
    for (const [, excluded] of selector.matchAll(/:not\(([^)]+)\)/g)) if (simpleMatch(element, excluded)) return false;
    selector = selector.replace(/:not\([^)]+\)/g, '');
    const tag = selector.match(/^[a-z][\w-]*/i)?.[0];
    if (tag && element.tagName !== tag.toUpperCase()) return false;
    for (const [, id] of selector.matchAll(/#([\w-]+)/g)) {
      if (!selector.includes(`[href`) && element.id !== id) return false;
    }
    for (const [, name] of selector.matchAll(/\.([\w-]+)/g)) if (!element.classes.has(name)) return false;
    for (const [, name, operator, value] of selector.matchAll(/\[([\w-]+)(\^=|=)?["']?([^\]"']*)["']?\]/g)) {
      const actual = element.getAttribute(name);
      if (actual === null || (operator === '=' && actual !== value) || (operator === '^=' && !actual.startsWith(value))) return false;
    }
    return true;
  }
  function matches(element, selector) {
    const parts = selector.replace(/\s*>\s*/g, ' > ').split(/\s+/);
    let current = element;
    if (!simpleMatch(current, parts.pop())) return false;
    while (parts.length) {
      const part = parts.pop();
      current = current?.parentElement;
      if (part === '>') { if (!current || !simpleMatch(current, parts.pop())) return false; }
      else { while (current && !simpleMatch(current, part)) current = current.parentElement; if (!current) return false; }
    }
    return true;
  }

  const elements = [];
  function element(tag, classes, top, height, parent) {
    const node = new ElementNode(tag, classes, top, height, parent);
    elements.push(node);
    return node;
  }
  const root = element('html', '', 0, 4000, null);
  root.scrollHeight = 4000;
  const body = element('body', '', 0, 4000, root);
  const header = element('header', 'site-header', 0, 80, body);
  const content = element('div', '', 0, 4000, body);
  content.id = 'conteudo';
  const heroCopy = element('div', 'hero-copy', 100, 500, content);
  const heroEyebrow = element('p', 'eyebrow', 100, 30, heroCopy);
  const heroTitle = element('h1', '', 140, 140, heroCopy);
  const heroTitleSpan = element('span', '', 140, 70, heroTitle);
  const heroTitleEm = element('em', '', 210, 70, heroTitle);
  const heroLead = element('p', 'lead', 300, 70, heroCopy);
  const heroActions = element('div', 'actions', 400, 60, heroCopy);
  const surface = element('a', 'archive-card', 400, 60, heroActions);
  const surfaceChild = element('span', '', 400, 20, surface);
  const heroPhoto = element('figure', 'hero-photo', 100, 500, content);
  const visibleCard = element('article', 'archive-card', 200, 200, content);
  const reveal = element('article', 'archive-card', 1300, 240, content);
  const music = element('article', 'music-card', 1300, 240, content);
  const coastal = element('article', 'coastal-card', 1400, 240, content);
  const decor = element('div', 'home-route', 1500, 180, content);
  const marquee = element('div', 'culture-marquee', 900, 80, content);
  const quickNav = element('nav', 'home-quick-nav', 720, 60, content);
  const firstLink = element('a', '', 720, 40, quickNav);
  firstLink.setAttribute('href', '#homenagem');
  const secondLink = element('a', '', 720, 40, quickNav);
  secondLink.setAttribute('href', '#musicas-da-mare');
  const firstSection = element('section', '', 1100, 800, content);
  firstSection.id = 'homenagem';
  const secondSection = element('section', '', 2100, 800, content);
  secondSection.id = 'musicas-da-mare';
  document.documentElement = root;
  document.body = body;
  document.querySelectorAll = (selector) => elements.filter((item) => item.matches(selector));
  document.querySelector = (selector) => document.querySelectorAll(selector)[0] ?? null;
  document.getElementById = (id) => elements.find((item) => item.id === id) ?? null;

  class Observer {
    observed = new Set();
    disconnected = false;
    constructor(callback, options) { this.callback = callback; this.options = options; observers.push(this); }
    observe(target) { this.observed.add(target); }
    unobserve(target) { this.observed.delete(target); }
    disconnect() { this.disconnected = true; this.observed.clear(); }
  }
  if (intersection) window.IntersectionObserver = Observer;
  const requestAnimationFrame = (callback) => { const id = nextFrame++; frames.set(id, callback); return id; };
  const cancelAnimationFrame = (id) => frames.delete(id);
  Object.assign(window, { requestAnimationFrame, cancelAnimationFrame });
  const exports = {};
  runInNewContext(compiled, {
    exports, window, document, Element: ElementNode, HTMLElement: ElementNode, Node: ElementNode,
    IntersectionObserver: intersection ? Observer : undefined,
    AbortController, requestAnimationFrame, cancelAnimationFrame,
    performance: { now: () => 0 },
    require(name) {
      if (name === 'react') return { useEffect: (effect) => effects.push(effect) };
      if (name === 'next/navigation') return { usePathname: () => '/' };
      if (name === 'react/jsx-runtime') return { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
      throw new Error(`Unexpected motion dependency: ${name}`);
    },
  }, { filename: 'motion-effects.js' });
  const markup = exports.MotionEffects();
  function emit(target, type, fields = {}) {
    const event = new Event(type);
    for (const [name, value] of Object.entries(fields)) Object.defineProperty(event, name, { value });
    target.dispatchEvent(event);
  }
  function flush() {
    const queued = [...frames.values()];
    frames.clear();
    for (const callback of queued) callback(16);
  }
  function intersect(target, isIntersecting = true) {
    for (const observer of observers.filter((item) => item.observed.has(target))) {
      observer.callback([{ target, isIntersecting, intersectionRatio: isIntersecting ? 1 : 0 }], observer);
    }
  }
  return {
    root, header, document, window, reducedQuery, fineQuery, elements, frames, observers, animations, markup,
    hero: [heroEyebrow, heroTitleSpan, heroTitleEm, heroLead, heroActions, heroPhoto], visibleCard, reveal, decor, marquee,
    surface, surfaceChild, firstLink, secondLink, firstSection, secondSection, music, coastal,
    mount() { for (const effect of effects) { const cleanup = effect(); if (cleanup) cleanups.push(cleanup); } },
    cleanup() { for (const cleanup of cleanups.splice(0)) cleanup(); },
    emit, flush, intersect,
    preference(query, value) { query.matches = value; emit(query, 'change'); },
    visibility(value) { document.hidden = value; document.visibilityState = value ? 'hidden' : 'visible'; emit(document, 'visibilitychange'); },
  };
}

function pointer(h, fields = {}) {
  h.emit(h.document, 'pointermove', { target: h.surfaceChild, pointerType: 'mouse', clientX: 300, clientY: 430, ...fields });
}

function assertSurfaceCleared(h) {
  assert.equal(h.surface.style.getPropertyValue('--surface-x'), '');
  assert.equal(h.surface.style.getPropertyValue('--surface-y'), '');
}

function assertStopped(h) {
  assert.equal(h.frames.size, 0, 'Nenhum frame continua pendente');
  assert.equal(h.document.count('pointermove'), 0, 'Rastreamento do ponteiro desligado');
  assert.equal(h.document.count('pointerout'), 0, 'Saída do ponteiro desligada');
  assert.ok(h.observers.every((observer) => observer.disconnected), 'Observers desconectados');
  assert.ok(h.animations.every((animation) => animation.cancelled || animation.finished), 'Animações interrompidas');
  assertSurfaceCleared(h);
}

test('renderização inicial mantém conteúdo disponível sem executar JavaScript de movimento', () => {
  const h = harness();
  assert.equal(h.markup.type, 'div');
  assert.equal(h.markup.props['aria-hidden'], 'true', 'Único markup do componente é decorativo');
  assert.equal(h.root.classes.size, 0, 'Nenhuma classe de preparação antes do effect');
  assert.equal(h.animations.length, 0);
  assert.equal(h.frames.size, 0);
  assert.equal(h.observers.length, 0);
  for (const element of h.elements) {
    assert.equal(element.style.properties.size, 0, 'Sem estilos que escondam conteúdo antes do effect');
    assert.equal(element.getAttribute('hidden'), null);
  }
});

test('entrada de hero e revelação abaixo do viewport acontecem uma vez, sem filtros ou 3D', () => {
  const h = harness();
  h.mount();
  assert.ok(h.root.classList.contains('motion-ready'));
  const heroAnimations = h.animations.filter((animation) => h.hero.includes(animation.target));
  assert.ok(heroAnimations.length > 0, 'Hero recebe movimento de entrada');
  assert.ok(!h.animations.some((animation) => animation.target === h.visibleCard), 'Conteúdo já visível não salta');
  assert.ok(!h.animations.some((animation) => animation.target === h.reveal), 'Revelação aguarda interseção');
  assert.ok(h.observers.some((observer) => observer.observed.has(h.reveal)));
  h.intersect(h.reveal, false);
  assert.ok(!h.animations.some((animation) => animation.target === h.reveal));
  h.intersect(h.reveal);
  h.intersect(h.reveal);
  assert.equal(h.animations.filter((animation) => animation.target === h.reveal).length, 1);
  h.preference(h.fineQuery, false);
  h.preference(h.fineQuery, true);
  assert.equal(h.animations.filter((animation) => h.hero.includes(animation.target)).length, heroAnimations.length, 'Reconfiguração não repete entrada');
  assert.equal(h.animations.filter((animation) => animation.target === h.reveal).length, 1, 'Reconfiguração não repete revelação');
  for (const animation of h.animations) {
    assert.ok(animation.keyframes.some((keyframe) => Object.hasOwn(keyframe, 'translate')));
    assert.ok(animation.keyframes.some((keyframe) => Object.hasOwn(keyframe, 'opacity')));
    for (const keyframe of animation.keyframes) {
      assert.ok(!Object.hasOwn(keyframe, 'filter'), 'Texto não recebe filtros');
      assert.doesNotMatch(JSON.stringify(keyframe), /perspective|rotate[XYZ]|translateZ|translate3d|matrix3d/i);
    }
  }
  h.cleanup();
});

test('scroll e ponteiro compartilham um frame e não criam loop quando estão ociosos', () => {
  const h = harness();
  h.mount();
  h.flush();
  assert.equal(h.frames.size, 0);
  h.window.scrollY = 250;
  for (let index = 0; index < 4; index++) { h.emit(h.window, 'scroll'); pointer(h, { clientX: 300 + index }); }
  assert.equal(h.frames.size, 1, 'Eventos agrupados em um único rAF');
  h.flush();
  assert.equal(h.frames.size, 0, 'Pintar uma vez não agenda outro frame');
  assert.equal(Number(h.root.style.getPropertyValue('--scroll-progress')), 250 / 3200);
  assert.ok(h.header.classList.contains('is-scrolled'));
  assert.ok(h.surface.classList.contains('motion-surface'));
  assert.ok(h.surface.style.getPropertyValue('--surface-x').endsWith('px'));
  assert.ok(h.surface.style.getPropertyValue('--surface-y').endsWith('px'));
  h.emit(h.document, 'pointerout', { relatedTarget: h.surfaceChild });
  assert.ok(h.surface.style.getPropertyValue('--surface-x'), 'Mover entre filhos mantém a luz da superfície');
  h.emit(h.document, 'pointerout', { relatedTarget: null });
  h.flush();
  assertSurfaceCleared(h);
  pointer(h, { pointerType: 'touch' });
  assert.equal(h.frames.size, 0, 'Toque não ativa rastreamento de ponteiro');
  h.cleanup();
});

test('ponteiro só funciona com hover fino e reage a mudanças da mídia', () => {
  const h = harness({ fine: false });
  h.mount();
  assert.equal(h.document.count('pointermove'), 0);
  pointer(h);
  assert.equal(h.frames.size, 0);
  h.preference(h.fineQuery, true);
  assert.equal(h.document.count('pointermove'), 1);
  assert.equal(h.document.count('pointerout'), 1);
  pointer(h);
  h.flush();
  assert.ok(h.surface.style.getPropertyValue('--surface-x'));
  h.preference(h.fineQuery, false);
  assert.equal(h.document.count('pointermove'), 0);
  assert.equal(h.document.count('pointerout'), 0);
  assertSurfaceCleared(h);
  h.cleanup();
});

test('reduced-motion impede movimento desde o início e interrompe efeitos já ativos', () => {
  const initial = harness({ reduced: true });
  initial.mount();
  assert.ok(!initial.root.classList.contains('motion-ready'));
  assert.equal(initial.animations.length, 0);
  assert.equal(initial.observers.length, 0);
  assert.equal(initial.document.count('pointermove'), 0);
  initial.cleanup();

  const h = harness();
  h.mount();
  h.intersect(h.reveal);
  h.intersect(h.decor);
  pointer(h);
  assert.equal(h.frames.size, 1);
  h.preference(h.reducedQuery, true);
  assertStopped(h);
  assert.ok(!h.root.classList.contains('motion-ready'));
  assert.ok(!h.decor.classList.contains('motion-in-view'));
  pointer(h);
  assert.equal(h.frames.size, 0);
  h.preference(h.reducedQuery, false);
  assert.ok(h.root.classList.contains('motion-ready'));
  assert.equal(h.document.count('pointermove'), 1, 'Rastreamento pode retomar');
  h.cleanup();
});

test('aba oculta interrompe frames, ponteiro e animações; ao voltar retoma sem listeners duplicados', () => {
  const initial = harness({ hidden: true });
  initial.mount();
  assertStopped(initial);
  assert.ok(initial.root.classList.contains('motion-paused'));
  initial.cleanup();

  const h = harness();
  h.mount();
  pointer(h);
  h.visibility(true);
  assertStopped(h);
  assert.ok(h.root.classList.contains('motion-paused'));
  h.emit(h.window, 'scroll');
  h.emit(h.window, 'resize');
  pointer(h);
  assert.equal(h.frames.size, 0, 'Nenhum trabalho visual na aba oculta');
  h.visibility(false);
  assert.ok(!h.root.classList.contains('motion-paused'));
  assert.equal(h.document.count('pointermove'), 1);
  assertSurfaceCleared(h);
  assert.equal(h.frames.size, 0);
  h.cleanup();
});

test('decoração acompanha visibilidade e scrollspy marca apenas uma seção com aria-current', () => {
  const h = harness();
  h.mount();
  for (const decoration of [h.decor, h.marquee]) {
    h.intersect(decoration);
    assert.ok(decoration.classList.contains('motion-in-view'));
    h.intersect(decoration, false);
    assert.ok(!decoration.classList.contains('motion-in-view'));
  }
  h.intersect(h.firstSection);
  assert.equal(h.firstLink.getAttribute('aria-current'), 'location');
  assert.ok(h.firstLink.classList.contains('is-current'));
  assert.equal(h.secondLink.getAttribute('aria-current'), null);
  h.intersect(h.firstSection, false);
  h.intersect(h.secondSection);
  assert.equal(h.firstLink.getAttribute('aria-current'), null);
  assert.ok(!h.firstLink.classList.contains('is-current'));
  assert.equal(h.secondLink.getAttribute('aria-current'), 'location');
  assert.ok(h.secondLink.classList.contains('is-current'));
  h.cleanup();
});

test('APIs opcionais ausentes deixam conteúdo disponível sem animações de entrada', () => {
  for (const options of [{ intersection: false }, { animate: false }, { intersection: false, animate: false }]) {
    const h = harness(options);
    assert.doesNotThrow(() => h.mount());
    assert.equal(h.animations.length, 0);
    for (const element of h.elements) {
      assert.equal(element.style.getPropertyValue('opacity'), '');
      assert.equal(element.style.getPropertyValue('visibility'), '');
      assert.equal(element.getAttribute('hidden'), null);
    }
    assert.doesNotThrow(() => h.cleanup());
  }
});

test('cards de vídeo não recebem revelação que possa mover um player iniciado pelo usuário', () => {
  const h = harness();
  h.mount();
  for (const card of [h.music, h.coastal]) {
    assert.ok(!h.observers.some((observer) => observer.observed.has(card)));
    card.classList.add('is-playing');
    h.intersect(card);
    assert.ok(!h.animations.some((animation) => animation.target === card));
  }
  h.cleanup();
});

test('scrollspy usa altura em pixels e recalcula a faixa ao redimensionar sem repetir entradas', () => {
  const h = harness();
  h.window.innerWidth = 1920;
  h.window.innerHeight = 1080;
  h.mount();
  const initial = h.observers.find((observer) => observer.observed.has(h.firstSection));
  assert.equal(initial.options.rootMargin, '-346px 0px -733px 0px');
  const [top, , bottom] = initial.options.rootMargin.split(' ').map(Number.parseFloat);
  assert.equal(h.window.innerHeight + top + bottom, 1, 'Marcador de um pixel não inclui faixa residual da seção anterior');
  const animationCount = h.animations.length;
  h.window.innerHeight = 844;
  h.emit(h.window, 'resize');
  const current = h.observers.findLast((observer) => observer.observed.has(h.firstSection));
  assert.ok(initial.disconnected);
  assert.equal(current.options.rootMargin, '-270px 0px -573px 0px');
  assert.equal(h.animations.length, animationCount);
  assert.equal(h.frames.size, 1);
  h.flush();
  h.cleanup();
  assertStopped(h);
});

test('cleanup remove estados e listeners; remontagem não acumula trabalho nem controles', () => {
  const h = harness();
  h.mount();
  h.intersect(h.reveal);
  h.intersect(h.decor);
  h.intersect(h.firstSection);
  pointer(h);
  h.flush();
  h.emit(h.window, 'scroll');
  assert.equal(h.frames.size, 1);
  h.cleanup();
  assertStopped(h);
  for (const target of [h.window, h.document, h.reducedQuery, h.fineQuery]) assert.equal(target.count(), 0, 'Todos os listeners desmontados');
  assert.equal(h.root.style.getPropertyValue('--scroll-progress'), '');
  assert.ok(!h.root.classList.contains('motion-ready'));
  assert.ok(!h.root.classList.contains('motion-paused'));
  assert.ok(!h.header.classList.contains('is-scrolled'));
  for (const element of h.elements) {
    for (const name of ['motion-surface', 'motion-decor', 'motion-in-view', 'is-current']) assert.ok(!element.classList.contains(name), `Estado ${name} limpo`);
  }
  for (const link of [h.firstLink, h.secondLink]) assert.equal(link.getAttribute('aria-current'), null);
  h.emit(h.window, 'scroll');
  pointer(h);
  h.preference(h.reducedQuery, true);
  h.visibility(true);
  assert.equal(h.frames.size, 0, 'Eventos após cleanup não executam trabalho');
  h.reducedQuery.matches = false;
  h.document.hidden = false;
  h.document.visibilityState = 'visible';
  h.mount();
  assert.equal(h.window.count('scroll'), 1);
  assert.equal(h.document.count('pointermove'), 1);
  h.emit(h.window, 'scroll');
  pointer(h);
  assert.equal(h.frames.size, 1);
  h.cleanup();
  assertStopped(h);
});
