import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import ts from 'typescript';
import katex from 'katex';

const root = new URL('../', import.meta.url);
const moduleCache = new Map();

// Read the source modules directly: these content checks do not need a server,
// network, generated production bundle, or a TypeScript runtime loader.
function loadContent(relativeFile) {
  const url = new URL(relativeFile, root);
  if (moduleCache.has(url.href)) return moduleCache.get(url.href);
  const result = ts.transpileModule(fs.readFileSync(url, 'utf8'), {
    fileName: url.pathname,
    compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022},
    reportDiagnostics: true,
  });
  const errors = result.diagnostics?.filter(d => d.category === ts.DiagnosticCategory.Error) ?? [];
  assert.deepEqual(errors.map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n')), [], relativeFile);
  const mod = {exports: {}};
  const require = createRequire(url);
  const contentRequire = name => {
    if (name.startsWith('./reading-') || name === './reading') {
      return loadContent(`app/content/${name.slice(2)}.ts`);
    }
    return require(name);
  };
  new Function('require', 'module', 'exports', result.outputText)(contentRequire, mod, mod.exports);
  moduleCache.set(url.href, mod.exports);
  return mod.exports;
}

const modules = [
  ['app/content/reading-cft.ts', 'readingCft'],
  ['app/content/reading-ads.ts', 'readingAds'],
  ['app/content/reading-susy-strings.ts', 'readingSusyStrings'],
].map(([file, name]) => ({file, name, sections: loadContent(file)[name]}));
const sections = modules.flatMap(mod => mod.sections);
const nonempty = value => typeof value === 'string' && value.trim().length > 0;

for (const {file, name, sections: content} of modules) {
  test(`${name} exports populated, source-linked reading sections`, () => {
    assert.ok(Array.isArray(content) && content.length > 0, `${file}: missing nonempty ${name}`);
    for (const section of content) {
      const label = `${file}: ${section?.id ?? '(missing ID)'}`;
      for (const key of ['id', 'title', 'lead']) assert.ok(nonempty(section[key]), `${label}: empty ${key}`);
      assert.match(section.id, /^reading-[a-z0-9-]+$/, label);
      assert.ok(['cft', 'ads', 'bridge'].includes(section.side), `${label}: invalid side`);
      assert.ok(Number.isInteger(section.chapter) && section.chapter >= 1 && section.chapter <= 7, `${label}: chapter`);
      assert.ok(Number.isInteger(section.order) && section.order > section.chapter * 100 && section.order < (section.chapter + 1) * 100, `${label}: order`);
      assert.ok(Array.isArray(section.concepts) && section.concepts.length > 0, `${label}: concepts`);
      assert.ok(section.concepts.every(nonempty), `${label}: empty concept`);
      assert.equal(new Set(section.concepts).size, section.concepts.length, `${label}: duplicate concept`);
      assert.ok(Array.isArray(section.blocks) && section.blocks.length > 0, `${label}: blocks`);
      assert.ok(Number.isInteger(section.source?.tab) && section.source.tab >= 0, `${label}: source tab`);
      assert.ok(Array.isArray(section.source.ranges) && section.source.ranges.length > 0, `${label}: source ranges`);
      for (const range of section.source.ranges) {
        assert.ok(Array.isArray(range) && range.length === 2, `${label}: malformed source range`);
        const [first, last] = range;
        assert.ok(Number.isInteger(first) && Number.isInteger(last) && first >= 0 && last >= first, `${label}: invalid range ${range}`);
      }
      assert.ok(Array.isArray(section.source.lecturePages) && section.source.lecturePages.length > 0, `${label}: lecture pages`);
      assert.ok(section.source.lecturePages.every(page => Number.isInteger(page) && page >= 1 && page <= 98), `${label}: invalid lecture page`);
      for (const [index, block] of section.blocks.entries()) {
        const where = `${label}: block ${index}`;
        assert.ok(['p', 'math', 'steps', 'list', 'callout'].includes(block.type), `${where}: unsupported block type`);
        if (block.type === 'math') {
          assert.ok(nonempty(block.tex), `${where}: empty equation`);
          if (block.explain !== undefined) assert.ok(nonempty(block.explain), `${where}: empty explanation`);
        } else if (block.type === 'steps' || block.type === 'list') {
          assert.ok(Array.isArray(block.items) && block.items.length > 0 && block.items.every(nonempty), `${where}: empty items`);
        } else {
          assert.ok(nonempty(block.text), `${where}: empty text`);
          if (block.type === 'callout') assert.ok(nonempty(block.title), `${where}: empty callout title`);
        }
      }
    }
  });
}

test('reading IDs are globally unique and the combined export includes every section once', () => {
  const ids = sections.map(section => section.id);
  assert.equal(new Set(ids).size, ids.length, 'Reading IDs are HTML anchors: duplicates break links and connections.');
  const {readingSections, readingChapters, notesDocument} = loadContent('app/content/reading.ts');
  assert.deepEqual(readingSections.map(section => section.id).sort(), [...ids].sort());
  for (let index = 1; index < readingSections.length; index++) {
    assert.ok(readingSections[index - 1].order <= readingSections[index].order, 'The combined reading route must retain chapter order.');
  }
  for (const section of readingSections) assert.ok(nonempty(readingChapters[section.chapter]), `Missing chapter label ${section.chapter}`);
  assert.match(notesDocument, /^https:\/\/docs\.google\.com\/document\/d\//);
});

test('every native reading equation renders with strict KaTeX and no trusted HTML', () => {
  const equations = sections.flatMap(section => section.blocks
    .filter(block => block.type === 'math')
    .map(block => ({id: section.id, tex: block.tex})));
  assert.ok(equations.length > 0, 'The native reading route must contain equations.');
  const failures = [];
  for (const {id, tex} of equations) {
    try {
      const html = katex.renderToString(tex, {throwOnError: true, strict: 'error', trust: false});
      assert.doesNotMatch(html, /class="katex-error"/);
    } catch (error) {
      failures.push(`${id}: ${error.message}\n${tex}`);
    }
  }
  assert.deepEqual(failures, [], 'Invalid native reading equations');
});

// Review snapshots are deliberately not shipped with the public site. Prefer
// the newest extraction, but retain coverage checks in an older local checkout.
const snapshotDirectories = ['tmp/notes-latest-review/', 'tmp/notes-current-review/'];
const snapshotTabs = new Set();
for (const directory of snapshotDirectories) {
  const url = new URL(directory, root);
  if (!fs.existsSync(url)) continue;
  for (const file of fs.readdirSync(url)) {
    const match = /^tab-(\d+)\.json$/.exec(file);
    if (match) snapshotTabs.add(Number(match[1]));
  }
}
const snapshots = [...snapshotTabs].sort((a, b) => a - b).map(tab => {
  const file = snapshotDirectories.map(directory => new URL(`${directory}tab-${tab}.json`, root)).find(url => fs.existsSync(url));
  return {file, ...JSON.parse(fs.readFileSync(file, 'utf8'))};
});
const noSnapshots = snapshots.length === 0;

test('reading source ranges resolve to existing local snapshot block IDs', {skip: noSnapshots ? 'Local review snapshots are not present in this checkout.' : false}, () => {
  for (const snapshot of snapshots) {
    assert.ok(Array.isArray(snapshot.blocks), `Invalid snapshot ${snapshot.file.pathname}`);
    const ids = new Set(snapshot.blocks.map(block => block.id));
    for (const section of sections.filter(item => item.source.tab === snapshot.tab)) {
      for (const [first, last] of section.source.ranges) {
        assert.ok(ids.has(first) && ids.has(last), `${section.id}: tab ${snapshot.tab} range ${first}–${last} is outside its snapshot.`);
      }
    }
  }
});

test('selected local source prose, equations and images have a provenance mapping (excluding blank separators and heading-only blocks)', {skip: noSnapshots ? 'Local review snapshots are not present in this checkout.' : false}, () => {
  const uncovered = [];
  let selected = 0;
  for (const snapshot of snapshots) {
    const content = sections.filter(section => section.source.tab === snapshot.tab);
    for (const block of snapshot.blocks) {
      // Empty separators and text-only document/section headings are navigation,
      // not missing physics. A heading containing native math or an image still
      // needs coverage, so that semantic material cannot disappear via styling.
      const hasContent = block.parts?.some(part => nonempty(part.text) || nonempty(part.math) || nonempty(part.image));
      const headingOnly = /^HEADING_[1-6]$/.test(block.style ?? '') && !block.parts?.some(part => nonempty(part.math) || nonempty(part.image));
      if (!block.selected || !hasContent || headingOnly) continue;
      selected++;
      if (!content.some(section => section.source.ranges.some(([first, last]) => block.id >= first && block.id <= last))) {
        uncovered.push(`tab ${snapshot.tab}, block ${block.id}: ${block.parts.map(part => part.text || part.math || part.image || '').join(' ').trim().slice(0, 140)}`);
      }
    }
  }
  assert.ok(selected > 0, 'Local selected snapshots exist but contain no selected nonblank source content.');
  // This checks traceability, not mathematical truth or one-to-one transcription:
  // duplicated screenshots may be consolidated into a shared native equation.
  assert.deepEqual(uncovered, [], 'Selected source content without a reading provenance range');
});
