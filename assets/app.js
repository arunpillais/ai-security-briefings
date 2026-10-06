/* Friday editions are inserted into data/briefings.json. Render text safely. */
const briefingDataURL = new URL('../data/briefings.json', document.currentScript.src);
const el = (tag, text, cls) => { const n = document.createElement(tag); if (text !== undefined) n.textContent = text; if (cls) n.className = cls; return n; };
const formatDate = value => new Date(value + 'T12:00:00Z').toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric', timeZone:'UTC'});
function safeURL(value) { try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : null; } catch { return null; } }
function editionCard(brief, compact = false) {
 const card = el('article', undefined, 'edition');
 if (compact) card.id = 'brief-' + brief.id;
 card.append(el('p', formatDate(brief.date) + ' · WEEKLY BRIEFING', 'meta'), el('h3', brief.title), el('p', brief.summary, 'summary'));
 const tags = el('div'); brief.topics.forEach(t => tags.append(el('span', t, 'pill'))); card.append(tags);
 const details = el('details'); details.open = !compact;
 details.append(el('summary', 'Read the shortlist · ' + brief.items.length + ' sources'));
 brief.items.forEach((item, i) => {
  const read = el('section', undefined, 'read'), title = el('h4');
  const url = safeURL(item.url);
  if (url) { const a = el('a', (i + 1) + '. ' + item.title); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; title.append(a); }
  else title.textContent = (i + 1) + '. ' + item.title;
  read.append(title, el('p', item.publisher + ' · ' + formatDate(item.date) + (item.mustRead ? ' · MUST READ' : ''), 'source-meta'));
  [['What changed',item.whatChanged],['Why it matters',item.whyItMatters],['Worth reading',item.worthReading],['Evidence & limitations',item.limitations]].forEach(([label, value]) => { const line = el('p'); line.append(el('strong',label + ': '), document.createTextNode(value)); read.append(line); });
  details.append(read);
 });
 card.append(details); return card;
}
async function start() {
 document.querySelector('#year').textContent = new Date().getFullYear();
 const response = await fetch(briefingDataURL, {cache:'no-cache'});
 if (!response.ok) throw new Error('Briefing data could not be loaded.');
 const data = await response.json();
 const editions = data.briefings.filter(b => b.status === 'published').sort((a,b) => b.date.localeCompare(a.date));
 if (editions.length) document.querySelector('#latest').replaceChildren(editionCard(editions[0]));
 function render() {
  const query = document.querySelector('#search').value.toLowerCase().trim(), topic = document.querySelector('#topic').value;
  const matches = editions.filter(b => (topic === 'all' || b.topics.includes(topic)) && JSON.stringify(b).toLowerCase().includes(query));
  const target = document.querySelector('#briefings'); target.replaceChildren();
  document.querySelector('#result-count').textContent = matches.length + ' published edition' + (matches.length === 1 ? '' : 's');
  if (!matches.length) target.append(el('p', editions.length ? 'No briefings match your search.' : 'The archive will grow as Friday editions are published.', 'muted'));
  matches.forEach(b => target.append(editionCard(b, true)));
 }
 document.querySelector('#search').addEventListener('input',render); document.querySelector('#topic').addEventListener('change',render); render();
 if (location.hash.startsWith('#brief-')) { const card = document.getElementById(location.hash.slice(1)); if(card) { card.querySelector('details').open=true; card.scrollIntoView(); } }
}
start().catch(() => { document.querySelector('#result-count').textContent = 'The archive is temporarily unavailable. Please refresh or try again later.'; });
