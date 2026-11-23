'use strict';
const elements=['fire','water','nature','shadow'];
const specs=[
['Drago di Cenere','🐉','fire',5,6,5,'Assalto'],['Salamandra','🦎','fire',2,3,2,'Assalto'],['Fenice Rubina','🔥','fire',4,3,4,'Rinascita'],['Golem di Lava','🌋','fire',4,4,7,'Guardia'],['Imp Incendiario','👹','fire',1,2,1,'Assalto'],['Cavaliere Ardente','🗡️','fire',3,4,3,'Nessuna'],['Serpente Solare','🐍','fire',3,3,4,'Veleno'],['Titano della Forgia','🛡️','fire',6,7,8,'Guardia'],
['Leviatano','🐋','water',6,6,9,'Guardia'],['Sirena del Gelo','🧜','water',3,2,5,'Cura'],['Elementale Marino','🌊','water',3,3,5,'Nessuna'],['Drago Glaciale','🐲','water',5,5,6,'Congela'],['Granchio Corazzato','🦀','water',2,2,5,'Guardia'],['Spirito della Pioggia','💧','water',1,1,3,'Cura'],['Medusa Abissale','🪼','water',4,4,4,'Veleno'],['Custode del Corallo','🐚','water',4,3,7,'Guardia'],
['Ent Antico','🌳','nature',5,4,9,'Guardia'],['Lupo Silvano','🐺','nature',2,3,2,'Assalto'],['Driade','🧝','nature',3,2,5,'Cura'],['Orso delle Radici','🐻','nature',4,5,5,'Nessuna'],['Fata dei Germogli','🧚','nature',1,1,2,'Cura'],['Idra di Smeraldo','🐲','nature',6,6,7,'Veleno'],['Cervo Runico','🦌','nature',3,3,4,'Nessuna'],['Guardiano Muschioso','🪨','nature',4,3,8,'Guardia'],
['Spettro','👻','shadow',2,3,2,'Assalto'],['Necromante','🧙','shadow',4,3,5,'Cura'],['Drago del Vuoto','🐉','shadow',6,7,6,'Assalto'],['Ragno Crepuscolare','🕷️','shadow',2,2,3,'Veleno'],['Cavaliere Spettrale','💀','shadow',3,4,3,'Nessuna'],['Demone Notturno','😈','shadow',5,6,5,'Assalto'],['Corvo Profetico','🐦‍⬛','shadow',1,2,2,'Assalto'],['Custode delle Cripte','⚰️','shadow',4,3,7,'Guardia']
];

// Espansione: 48 creature aggiuntive, per un bestiario totale di 80.
const expansion={
fire:['Viverna Scarlatta','Arconte delle Braci','Manticora Vulcanica','Grifone Solare','Basilisco Cremisi','Spirito del Magma','Guardiano di Ossidiana','Draco di Zolfo','Leone della Forgia','Arpia Incandescente','Colosso Piroclasta','Volpe delle Scintille'],
water:['Kraken di Cristallo','Naga delle Maree','Serpe dei Ghiacci','Custode delle Profondità','Tartaruga Glaciale','Arpia della Brina','Spirito della Nebbia','Cavaliere delle Onde','Golem di Sale','Drago della Tempesta','Lince Polare','Oracolo degli Abissi'],
nature:['Grifone di Smeraldo','Mandragora Reale','Colosso di Corteccia','Unicorno Selvatico','Ragno di Rovi','Spirito dei Funghi','Cinghiale Runico','Sentinella dei Boschi','Serpe di Giada','Gufo degli Antichi','Golem di Quercia','Drago delle Fronde'],
shadow:['Lich delle Ceneri','Manticora Notturna','Banshee delle Rune','Idra del Crepuscolo','Segugio del Vuoto','Gargoyle Antico','Araldo delle Ombre','Serpe Spettrale','Cervo della Luna Nera','Golem delle Tombe','Arpia del Silenzio',"Drago dell'Eclisse"]
};
const icons={fire:['🐲','🧙','🦁','🦅','🐍','🔥','🗿','🐉','🦁','🦇','🌋','🦊'],water:['🐙','🐍','🐉','🧜','🐢','🦅','🌫️','⚔️','🗿','🐲','🐈','🔮'],nature:['🦅','🌱','🌳','🦄','🕷️','🍄','🐗','🛡️','🐍','🦉','🗿','🐉'],shadow:['💀','🦁','👻','🐉','🐺','🗿','🧙','🐍','🦌','⚰️','🦇','🐲']};
const abilities=['Assalto','Guardia','Veleno','Cura','Congela','Nessuna','Rinascita'];
Object.entries(expansion).forEach(([element,names])=>names.forEach((name,i)=>{const cost=1+(i*5+elements.indexOf(element))%6;specs.push([name,icons[element][i],element,cost,Math.max(1,cost+(i%3)-1),Math.max(2,cost+2+(i%4)),abilities[(i+elements.indexOf(element))%abilities.length]])}));

const cards=specs.map((s,id)=>({id,name:s[0],emoji:s[1],element:s[2],cost:s[3],atk:s[4],hp:s[5],ability:s[6]}));

const palettes={fire:['#ffb25e','#a92d38','#270e27'],water:['#8fe5f6','#266aaf','#0a2046'],nature:['#d5f3a1','#3e9360','#102e2b'],shadow:['#e0b8ff','#7547a2','#170f37']};
function artwork(c){
 const [light,mid,dark]=palettes[c.element], n=c.id, shape=n%8;
 const colors={fire:['#ffcf4e','#ff7338','#8b2939'],water:['#aaf9ff','#56b5f7','#3454a2'],nature:['#d8f47a','#65c86c','#397d57'],shadow:['#e5b7ff','#9c78e8','#594294']}[c.element];
 const [shine,skin,shade]=colors;
 const rand=(k)=>((n*71+k*97)%101)/101;
 const scenery=c.element==='fire'?'<path d="M0 182 L44 125 84 176 144 98 204 174 258 112 320 181V240H0" fill="#6b2944"/><path d="M0 218Q40 190 80 219T160 214T240 215T320 209V240H0" fill="#f77a3d"/>':c.element==='water'?'<path d="M0 166 Q55 140 100 171T215 166T320 165V240H0" fill="#3476a9"/><path d="M0 205Q40 185 80 207T160 206T240 205T320 207" fill="none" stroke="#b1efff" stroke-width="6"/>':c.element==='nature'?'<path d="M0 190 Q60 100 130 170T320 152V240H0" fill="#347d60"/><path d="M0 207Q70 171 145 202T320 185V240H0" fill="#6aaf64"/>':'<path d="M0 190L55 135 94 169 157 112 218 174 277 123 320 180V240H0" fill="#372c70"/><path d="M0 214Q70 187 140 215T320 207V240H0" fill="#6650a0"/>';
 const wings=shape===0||shape===3||shape===7?`<path d="M137 125Q63 15 22 98L81 89 99 151M184 125Q260 15 297 98L240 89 220 151" fill="${shade}" stroke="${dark}" stroke-width="6"/>`:'';
 const limbs=shape===2?`<path d="M118 170L68 212M203 170L249 211M128 188L107 230M190 188L212 230" stroke="${shade}" stroke-width="21" stroke-linecap="round"/>`:shape===5?`<path d="M112 164Q44 164 34 205M204 164Q273 164 286 205" fill="none" stroke="${shade}" stroke-width="18" stroke-linecap="round"/>`:`<path d="M120 180L105 220M195 180L213 220" stroke="${shade}" stroke-width="25" stroke-linecap="round"/>`;
 const body=shape===1?'<ellipse cx="160" cy="166" rx="71" ry="54"/>':shape===2?'<rect x="101" y="108" width="117" height="105" rx="22"/>':shape===4?'<path d="M95 206Q86 132 143 114Q215 96 226 207Z"/>':shape===6?'<path d="M103 207Q70 157 115 122L159 107 210 130Q242 164 215 207Z"/>':'<path d="M92 210Q82 148 124 115Q166 92 203 125Q232 160 223 210Z"/>';
 const horns=shape===0||shape===3?`<path d="M128 94L100 39 149 75M190 94L222 39 177 75" fill="${shine}" stroke="${dark}" stroke-width="5"/>`:shape===2?`<path d="M119 101L100 68 136 83M201 101L221 68 183 83" fill="${shine}"/>`:shape===5?`<path d="M122 105Q86 64 103 38M195 105Q235 64 215 38" fill="none" stroke="${shade}" stroke-width="12" stroke-linecap="round"/>`:'';
 const eyes=shape===6?`<circle cx="136" cy="131" r="10" fill="#fff"/><circle cx="182" cy="131" r="10" fill="#fff"/><circle cx="138" cy="133" r="5" fill="#232038"/><circle cx="184" cy="133" r="5" fill="#232038"/>`:`<ellipse cx="137" cy="132" rx="12" ry="14" fill="#fff"/><ellipse cx="183" cy="132" rx="12" ry="14" fill="#fff"/><ellipse cx="141" cy="135" rx="6" ry="8" fill="#272039"/><ellipse cx="179" cy="135" rx="6" ry="8" fill="#272039"/>`;
 const ornaments=shape===4?`<circle cx="160" cy="185" r="16" fill="${shine}" stroke="${dark}" stroke-width="5"/>`:shape===7?`<path d="M119 172L160 193 200 172" fill="none" stroke="${shine}" stroke-width="9" stroke-linecap="round"/>`:'';
 const stars=Array.from({length:9},(_,i)=>`<circle cx="${(i*73+n*23)%320}" cy="${(i*43+n*17)%145}" r="${2+i%3}" fill="${shine}" opacity=".65"/>`).join('');
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240"><defs><linearGradient id="bg" x2="0" y2="1"><stop stop-color="${light}"/><stop offset="1" stop-color="${mid}"/></linearGradient><linearGradient id="skin" x2=".9" y2="1"><stop stop-color="${shine}"/><stop offset="1" stop-color="${skin}"/></linearGradient></defs><rect width="320" height="240" fill="url(#bg)"/><circle cx="258" cy="48" r="40" fill="${shine}" opacity=".55"/>${stars}${scenery}<g stroke="#302440" stroke-width="6" stroke-linejoin="round">${wings}${limbs}<g fill="url(#skin)">${body}<ellipse cx="160" cy="126" rx="60" ry="55"/></g>${horns}</g>${eyes}<path d="M145 158Q160 172 176 158" fill="none" stroke="#34243c" stroke-width="5" stroke-linecap="round"/>${ornaments}<ellipse cx="115" cy="157" rx="12" ry="6" fill="#ff7d9a" opacity=".55"/><ellipse cx="205" cy="157" rx="12" ry="6" fill="#ff7d9a" opacity=".55"/></svg>`;
 return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
const $=id=>document.getElementById(id); let game,selection=null,enemyBusy=false;
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const unit=c=>({...c,maxHp:c.hp,ready:c.ability==='Assalto',frozen:0,poison:0,reborn:false});
const factions={all:'Tutte le fazioni',fire:'Fuoco',water:'Acqua',nature:'Natura',shadow:'Ombra'};
let faction=localStorage.getItem('rba_faction')||'all';
const worlds=[
 {name:'Bosco delle Meraviglie',emoji:'🌳',tone:'nature',bosses:['Re dei Funghi','Cervo della Corona','Grande Ent Dorato']},
 {name:'Vulcano delle Risate',emoji:'🌋',tone:'fire',bosses:['Orco delle Braci','Fenice Reale','Drago del Cratere']},
 {name:'Baia delle Bolle',emoji:'🌊',tone:'water',bosses:['Pirata dei Coralli','Serpente della Marea','Kraken Imperiale']},
 {name:'Palude Lunatica',emoji:'🌙',tone:'shadow',bosses:['Strega dei Rovi','Cavaliere Fantasma','Regina delle Ombre']},
 {name:'Picchi del Cielo',emoji:'⚡',tone:'water',bosses:['Grifone del Tuono','Gigante delle Nuvole','Titano della Tempesta']},
 {name:'Regno dell’Eclisse',emoji:'🌘',tone:'shadow',bosses:['Araldo del Vuoto','Drago delle Stelle','Imperatore dell’Eclisse']}
];
const TOTAL_STAGES=60;
const readNumber=(key,fallback)=>{try{return Number(localStorage.getItem(key))||fallback}catch{return fallback}};
const saveNumber=(key,value)=>{try{localStorage.setItem(key,String(value))}catch{}};
let unlocked=Math.max(1,Math.min(TOTAL_STAGES,readNumber('rba_unlocked',readNumber('rba_stage',1))));
let stage=unlocked;
let coins=readNumber('rba_coins',0),crystals=readNumber('rba_crystals',0);
let turnLock=false;
const upgrades=(()=>{try{return JSON.parse(localStorage.getItem('rba_upgrades')||'{}')}catch{return {}}})();
// Reliquie: acquisto permanente, una sola equipaggiata alla volta.
const relics=[
 {id:'heart',icon:'❤️',name:'Cuore del Guardiano',cost:5,desc:'+6 salute iniziale al tuo eroe'},
 {id:'mana',icon:'💠',name:'Sfera del Mana',cost:10,desc:'+1 energia massima iniziale'},
 {id:'blade',icon:'⚔️',name:'Lama dell’Alba',cost:15,desc:'+1 attacco alle creature evocate'},
 {id:'shell',icon:'🛡️',name:'Scudo di Quercia',cost:20,desc:'+2 salute alle creature evocate'},
 {id:'healer',icon:'✨',name:'Calice della Vita',cost:25,desc:'La Cura runica ripristina 5 salute invece di 3'},
 {id:'coin',icon:'🪙',name:'Sigillo della Fortuna',cost:30,desc:'+50% monete nelle vittorie'}
];
const ownedRelics=(()=>{try{return JSON.parse(localStorage.getItem('rba_relics')||'[]')}catch{return []}})();
let equippedRelic=localStorage.getItem('rba_relic_equipped')||'';
function activeRelic(id){return equippedRelic===id&&ownedRelics.includes(id)}
function renderShop(){
 $('shopwallet').textContent='💎 '+crystals+' cristalli · Reliquia equipaggiata: '+(relics.find(r=>r.id===equippedRelic)?.name||'nessuna');
 const root=$('shopitems');root.replaceChildren();
 for(const r of relics){const row=document.createElement('div');row.className='relic-item';
 const glyph=document.createElement('span');glyph.className='relic-glyph';glyph.textContent=r.icon;
 const info=document.createElement('div');info.className='relic-info';
 const name=document.createElement('strong');name.textContent=r.name;
 const desc=document.createElement('small');desc.textContent=r.desc;
 info.append(name,desc);
 const btn=document.createElement('button');const owned=ownedRelics.includes(r.id);
 btn.textContent=owned?(equippedRelic===r.id?'✓ Equipaggiata':'Equipaggia'):'💎 '+r.cost;
 btn.disabled=(owned&&equippedRelic===r.id)||(!owned&&crystals<r.cost);
 btn.onclick=()=>{if(!owned){if(crystals<r.cost)return;crystals-=r.cost;ownedRelics.push(r.id);saveNumber('rba_crystals',crystals);localStorage.setItem('rba_relics',JSON.stringify(ownedRelics))}equippedRelic=r.id;localStorage.setItem('rba_relic_equipped',r.id);renderShop();render()};
 row.append(glyph,info,btn);root.appendChild(row)
 }
}
function openShop(){renderShop();$('shop').hidden=false}
const upgradeLevel=id=>Math.max(0,Math.min(5,Number(upgrades[id])||0));
const upgradeCost=id=>75*(upgradeLevel(id)+1);
function upgradedCard(c){const level=upgradeLevel(c.id);return {...c,atk:c.atk+level,hp:c.hp+level*2,level};}
function openForge(){renderForge();$('forge').hidden=false}
function renderForge(){
 $('forgewallet').textContent='🪙 '+coins+' monete · 💎 '+crystals+' cristalli · Potenziamenti permanenti (massimo livello 5)';
 const root=$('forgecards');root.innerHTML='';
 cards.forEach(c=>{const level=upgradeLevel(c.id),cost=upgradeCost(c.id),row=document.createElement('div');row.className='forge-item';
 const img=document.createElement('img');img.src=artwork(c);img.alt='';
 const label=document.createElement('div');label.className='forge-description';label.textContent=c.name+' · Lv '+(level+1)+'/6 · ⚔ '+(c.atk+level)+' ❤️ '+(c.hp+2*level);
 const button=document.createElement('button');button.textContent=level>=5?'MAX': '⬆ '+cost+' 🪙';button.disabled=level>=5||coins<cost;
 button.onclick=()=>{if(coins<cost||upgradeLevel(c.id)>=5)return;coins-=cost;upgrades[c.id]=level+1;saveNumber('rba_coins',coins);localStorage.setItem('rba_upgrades',JSON.stringify(upgrades));renderForge();render()};
 row.append(img,label,button);root.appendChild(row);
 });
}
const bossPowers=['Spore impazzite','Corna regali','Radici titaniche','Pioggia di scintille','Fuoco immortale','Eruzione','Marea crescente','Serpenti gelidi','Tentacoli abissali','Maledizione dei rovi','Urlo spettrale','Notte eterna','Raffica elettrica','Vento furioso','Ira del titano','Sussurro del vuoto','Pioggia stellare','Eclisse totale'];
function bossPower(){
 const info=stageInfo(stage);if(!info.isBoss||game.over||game.turn%3!==0)return;
 const bossIndex=info.worldIndex*3+(info.level===4?0:info.level===7?1:2);
 const e=game.enemy,p=game.player,power=bossPowers[bossIndex];
 const living=p.board.map((u,i)=>u?i:-1).filter(i=>i>=0);
 const family=bossIndex%6;
 if(family===0){if(living.length)living.forEach(i=>damageUnit(p,i,1));else p.hp-=2;}
 if(family===1){e.hp=Math.min(enemyMaxHp(),e.hp+5);}
 if(family===2){e.board.forEach(u=>{if(u){u.hp+=2;u.maxHp+=2}});}
 if(family===3){p.hp-=3;}
 if(family===4){if(living.length){const u=p.board[living[0]];u.frozen=2;}else p.hp-=2;}
 if(family===5){e.board.forEach(u=>{if(u)u.atk+=1});}
 addLog('👑 '+info.name+' usa '+power+'!');game.message='👑 '+power+'!';checkWin();
}

function stageInfo(n){const worldIndex=Math.floor((n-1)/10),level=(n-1)%10+1,w=worlds[worldIndex];const boss=level===4?0:level===7?1:level===10?2:-1;return {worldIndex,level,world:w,isBoss:boss>=0,name:boss>=0?w.bosses[boss]:['Esploratore','Sentinella','Mago','Guardiano','Predone','Campione','Cavaliere','Oracolo','Custode','Signore'][level-1]+' '+w.emoji};}
function openMap(){renderMap();$('campaign').hidden=false}
function renderMap(){const root=$('mapworlds');root.innerHTML='';worlds.forEach((w,wi)=>{const section=document.createElement('section');section.className='mapworld mapworld3d '+w.tone;section.style.setProperty('--world-number',wi+1);const scenery=document.createElement('div');scenery.className='world-diorama';scenery.setAttribute('aria-hidden','true');scenery.innerHTML='<div class="diorama-sun"></div><div class="diorama-mountain mountain-back"></div><div class="diorama-mountain mountain-front"></div><div class="diorama-castle">'+(wi%2?'🏰':'🏯')+'</div><div class="diorama-ground"></div>';section.appendChild(scenery);const head=document.createElement('h3');head.textContent=w.emoji+' Mondo '+(wi+1)+' · '+w.name;section.appendChild(head);const grid=document.createElement('div');grid.className='mapgrid mapgrid-path';grid.setAttribute('aria-label','Percorso di dieci livelli');for(let i=1;i<=10;i++){const n=wi*10+i,info=stageInfo(n),button=document.createElement('button');button.className='level '+(n>unlocked?'locked':n===stage?'current':'')+(info.isBoss?' bosslevel':'');button.disabled=n>unlocked;button.setAttribute('aria-label','Livello '+n+': '+info.name+(n>unlocked?', bloccato':info.isBoss?', boss':''));button.style.setProperty('--step',i);button.innerHTML='<span>'+(n>unlocked?'🔒':info.isBoss?'👑':'⚔️')+'</span><b>'+i+'</b><small>'+(info.isBoss?'BOSS':n<unlocked?'✓':'LIVELLO')+'</small>';button.title=info.name;button.onclick=()=>{stage=n;$('campaign').hidden=true;start()};grid.appendChild(button)}section.appendChild(grid);const badge=document.createElement('div');badge.className='world-completion';const beaten=Math.max(0,Math.min(10,unlocked-wi*10-1));badge.innerHTML='<span>⭐ '+beaten+'/10 completati</span><div class="world-progress-track"><div style="width:'+(beaten*10)+'%"></div></div>';section.appendChild(badge);root.appendChild(section)});$('mapprogress').textContent='Livelli sbloccati: '+unlocked+'/60 · 🪙 '+coins+' · 💎 '+crystals}
// v0.8: mazzo personalizzato da 24 carte, massimo due copie per creatura.
const DECK_SIZE=24;
let customDeck=(()=>{try{const ids=JSON.parse(localStorage.getItem('rba_custom_deck')||'null');if(!Array.isArray(ids)||ids.length!==DECK_SIZE)return null;const counts={};for(const id of ids){if(!Number.isInteger(id)||!cards[id]||(++counts[id])>2)return null}return ids}catch{return null}})();
let draftDeck=customDeck?[...customDeck]:[];
function saveCustomDeck(){if(draftDeck.length!==DECK_SIZE){$('deckfeedback').textContent='Servono esattamente 24 carte.';return}customDeck=[...draftDeck];localStorage.setItem('rba_custom_deck',JSON.stringify(customDeck));$('deckbuilder').hidden=true;start()}
function autoDeck(){const low=shuffle(cards.filter(c=>c.cost<=3));const high=shuffle(cards.filter(c=>c.cost>3));draftDeck=[...low.slice(0,14),...high.slice(0,10)].map(c=>c.id);renderDeckBuilder()}
function deckEdit(id,add){if(add){if(draftDeck.length>=DECK_SIZE||draftDeck.filter(x=>x===id).length>=2)return;draftDeck.push(id)}else{const i=draftDeck.indexOf(id);if(i>=0)draftDeck.splice(i,1)}renderDeckBuilder()}
function renderDeckBuilder(){const counts={};draftDeck.forEach(id=>counts[id]=(counts[id]||0)+1);$('deckfeedback').textContent=draftDeck.length+'/24 carte · massimo 2 copie per creatura';$('savedeck').disabled=draftDeck.length!==DECK_SIZE;const filter=$('deckfilter').value;const root=$('deckcards');root.innerHTML='';cards.filter(c=>filter==='all'||c.element===filter).forEach(c=>{const item=document.createElement('div');item.className='deck-item';const picture=document.createElement('img');picture.src=artwork(c);picture.alt='';const info=document.createElement('div');info.className='deck-info';const title=document.createElement('strong');title.textContent=c.name;const subtitle=document.createElement('small');subtitle.textContent='💠 '+c.cost+' · ⚔ '+c.atk+' · ❤️ '+c.hp+' · '+c.ability;info.append(title,subtitle);const controls=document.createElement('div');controls.className='deck-controls';const minus=document.createElement('button');minus.textContent='−';minus.setAttribute('aria-label','Rimuovi '+c.name);minus.disabled=!counts[c.id];minus.onclick=()=>deckEdit(c.id,false);const qty=document.createElement('b');qty.textContent=counts[c.id]||0;const plus=document.createElement('button');plus.textContent='+';plus.setAttribute('aria-label','Aggiungi '+c.name);plus.disabled=draftDeck.length>=DECK_SIZE||(counts[c.id]||0)>=2;plus.onclick=()=>deckEdit(c.id,true);controls.append(minus,qty,plus);item.append(picture,info,controls);root.append(item)})}
function openDeckBuilder(){draftDeck=customDeck?[...customDeck]:[];$('deckbuilder').hidden=false;renderDeckBuilder()}
function makeDeck(side){
 if(side==='player'&&customDeck)return shuffle(customDeck.map(id=>({...cards[id]})));
 const pool=side==='player'&&faction!=='all'?cards.filter(c=>c.element===faction):cards;
 // Garantisce carte economiche per evitare mani iniziali inutilizzabili.
 const deck=[];
 for(const cost of [1,1,1,2,2,2,3,3,3,4,4,5]){
  const options=pool.filter(c=>c.cost===cost);if(options.length)deck.push(options[Math.floor(Math.random()*options.length)]);
 }
 while(deck.length<30){let c=pool[Math.floor(Math.random()*pool.length)];deck.push(c)}
 return shuffle(deck.map(c=>({...c})));
}
function addLog(s){if(!game)return;game.log.unshift(s);game.log=game.log.slice(0,9)}
function usePower(){if(game.over||enemyBusy)return;let p=game.player;if(p.energy<2||p.hp>=30+(activeRelic('heart')?6:0)){game.message='Servono 2 energie e almeno 1 punto vita da curare.';render();return}p.energy-=2;p.hp=Math.min(30+(activeRelic('heart')?6:0),p.hp+(activeRelic('healer')?5:3));game.message='✨ Cura runica: +'+(activeRelic('healer')?5:3)+' salute.';addLog(game.message);render()}
function setFaction(f){faction=f;localStorage.setItem('rba_faction',f);start()}

function draw(side,n=1){for(let i=0;i<n;i++){if(side.deck.length&&side.hand.length<8)side.hand.push(side.deck.pop())}}
function start(){window.dispatchEvent(new CustomEvent('rba:battle-start'));$('victory').hidden=true;enemyBusy=false;const info=stageInfo(stage);game={turn:1,over:false,log:[],player:{hp:30+(activeRelic('heart')?6:0),energy:3+(activeRelic('mana')?1:0),max:3+(activeRelic('mana')?1:0),board:[null,null,null],deck:makeDeck('player'),hand:[]},enemy:{hp:enemyMaxHp(),energy:3,max:3,board:[null,null,null],deck:makeDeck('enemy'),hand:[]},message:'Evoca una creatura per iniziare!'};draw(game.player,5);draw(game.enemy,5);for(const side of [game.player,game.enemy]){if(!side.hand.some(c=>c.cost<=3)){const idx=side.deck.findIndex(c=>c.cost<=3);if(idx>=0){side.deck.push(side.hand.pop());side.hand.push(side.deck.splice(idx,1)[0])}}}selection=null;addLog('⚔️ Inizia lo scontro '+stage+' contro '+info.name);render()}
function enemyMaxHp(){return 23+Math.floor((stage-1)/3)*2+(stageInfo(stage).isBoss?9:0)}
function abilityOnSummon(u,side){if(u.ability==='Cura')side.hp=Math.min(side===game.player?30:enemyMaxHp(),side.hp+2)}
function summon(side,index,slot){const c=side.hand[index];if(!c||side.board[slot]||c.cost>side.energy)return false;side.energy-=c.cost;side.hand.splice(index,1);const base=side===game.player?upgradedCard(c):c;const u=unit(side===game.player?{...base,atk:base.atk+(activeRelic('blade')?1:0),hp:base.hp+(activeRelic('shell')?2:0)}:base);side.board[slot]=u;abilityOnSummon(u,side);addLog((side===game.player?'🟢 ':'🔴 ')+c.name+' evocato');window.dispatchEvent(new CustomEvent('rba:summon',{detail:{side:side===game.player?'player':'enemy',slot,element:c.element}}));return true}
function damageUnit(side,index,dmg){let u=side.board[index];if(!u)return;u.hp-=dmg;if(u.hp<=0){if(u.ability==='Rinascita'&&!u.reborn){u.hp=2;u.reborn=true;u.ready=false}else side.board[index]=null}}
function attack(fromSide,fromIndex,targetSide,targetIndex){let attacker=fromSide.board[fromIndex];if(!attacker||!attacker.ready||attacker.frozen>0)return false;const guards=targetSide.board.some(x=>x&&x.ability==='Guardia');if(targetIndex===null){if(guards||targetSide.board.some(Boolean))return false;targetSide.hp-=attacker.atk}else{let target=targetSide.board[targetIndex];if(!target)return false;if(guards&&target.ability!=='Guardia')return false;const counter=target.atk;damageUnit(targetSide,targetIndex,attacker.atk);if(fromSide.board[fromIndex])damageUnit(fromSide,fromIndex,counter);if(targetSide.board[targetIndex]&&attacker.ability==='Veleno')targetSide.board[targetIndex].poison=2;if(targetSide.board[targetIndex]&&attacker.ability==='Congela')targetSide.board[targetIndex].frozen=1}if(fromSide.board[fromIndex])fromSide.board[fromIndex].ready=false;addLog((fromSide===game.player?'🟢 ':'🔴 ')+attacker.name+' attacca '+(targetIndex===null?'l’eroe':(targetSide.board[targetIndex]?.name||'una creatura')));window.dispatchEvent(new CustomEvent('rba:attack',{detail:{side:fromSide===game.player?'player':'enemy',from:fromIndex,to:targetIndex,element:attacker.element,damage:attacker.atk}}));checkWin();return true}
function checkWin(){if(game.player.hp<=0||game.enemy.hp<=0){game.over=true;let win=game.player.hp>game.enemy.hp;game.message=win?'🏆 Vittoria! Nuovo avversario sbloccato!':'💀 Sconfitta! Riprova con una nuova strategia.';let key=win?'wins':'losses';localStorage.setItem('rba_'+key,String(Number(localStorage.getItem('rba_'+key)||0)+1));if(win){const baseReward=25+stage*4+(stageInfo(stage).isBoss?110:0),reward=Math.floor(baseReward*(activeRelic('coin')?1.5:1)),gems=stageInfo(stage).isBoss?5:0;coins+=reward;crystals+=gems;saveNumber('rba_coins',coins);saveNumber('rba_crystals',crystals);if(stage===unlocked&&unlocked<TOTAL_STAGES){unlocked++;saveNumber('rba_unlocked',unlocked)}$('victory').hidden=false;$('victorytitle').textContent=stage===TOTAL_STAGES?'CAMPAGNA COMPLETATA!':'VITTORIA!';$('victorytext').textContent='Ricompensa: 🪙 '+reward+' monete'+(gems?' e 💎 '+gems+' cristalli':'')+'. '+(stage<TOTAL_STAGES?'Prossimo livello sbloccato!':'Hai conquistato tutti i mondi!');$('nextbattle').textContent=stage<TOTAL_STAGES?'PROSSIMO LIVELLO ➜':'TORNA ALLA MAPPA';}else{$('victory').hidden=false;$('victorytitle').textContent='SCONFITTA';$('victorytext').textContent='Riprova: il livello rimane disponibile. Puoi cambiare fazione e strategia.';$('nextbattle').textContent='RIPROVA ➜'}addLog(game.message);window.dispatchEvent(new CustomEvent('rba:battle-end',{detail:{win,stage,boss:stageInfo(stage).isBoss}}))}}
function tick(side){side.max=Math.min(10,side.max+1);side.energy=side.max;draw(side);side.board.forEach((u,i)=>{if(!u)return;if(u.poison){damageUnit(side,i,1);if(side.board[i])side.board[i].poison--}if(side.board[i]){u=side.board[i];if(u.frozen){u.frozen--;u.ready=false}else u.ready=true}})}
function enemyTurn(){if(game.over){enemyBusy=false;return;}const e=game.enemy,p=game.player;let tries=0;while(tries++<3){let playable=e.hand.map((c,i)=>({c,i})).filter(x=>x.c.cost<=e.energy);let slots=e.board.map((x,i)=>x===null?i:-1).filter(x=>x>=0);if(!playable.length||!slots.length)break;playable.sort((a,b)=>(b.c.atk+b.c.hp/2)-(a.c.atk+a.c.hp/2));summon(e,playable[0].i,slots[0])}for(let i=0;i<3&&!game.over;i++){let u=e.board[i];if(!u||!u.ready)continue;let guards=p.board.map((x,j)=>x&&x.ability==='Guardia'?j:-1).filter(j=>j>=0);let targets=guards.length?guards:p.board.map((x,j)=>x?j:-1).filter(j=>j>=0);let t=targets.length?targets.sort((a,b)=>p.board[a].hp-p.board[b].hp)[0]:null;attack(e,i,p,t)}if(!game.over){game.turn++;tick(p);bossPower();if(!game.over&&!stageInfo(stage).isBoss)game.message='Turno '+game.turn+' — scegli le tue mosse.'}enemyBusy=false;render()}
function endTurn(){if(game.over||enemyBusy)return;enemyBusy=true;selection=null;tick(game.enemy);game.message='Il nemico sta giocando...';render();setTimeout(enemyTurn,650)}
function cardHTML(c,extra=''){return `<div class="card ${c.element} ${extra}"><span class="cost">${c.cost}</span><div class="art"><img src="${artwork(c)}" alt="" loading="lazy"></div><div class="name">${c.name}</div><div class="stats">⚔️ ${c.atk} &nbsp; ❤️ ${c.hp}</div><div class="ability">${c.ability}</div></div>`}
function clickHand(i){
 if(game.over||enemyBusy)return;
 const card=game.player.hand[i];if(!card)return;
 if(card.cost>game.player.energy){game.message='Energia insufficiente: servono '+card.cost+' cristalli.';render();return}
 const free=game.player.board.findIndex(u=>!u);
 if(free<0){game.message='Le tre corsie sono occupate. Attacca o termina il turno.';render();return}
 // Mobile: un tocco evoca nella prima corsia libera; la selezione manuale resta possibile sul campo.
 if(summon(game.player,i,free)){selection=null;game.message='✨ '+card.name+' evocato! Tocca una tua creatura e poi un nemico per attaccare.'}
 else game.message='Non posso evocare questa creatura adesso.';
 render()
}
function clickPlayer(i){if(game.over||enemyBusy)return;let p=game.player;if(selection?.type==='hand'){if(summon(p,selection.index,i)){game.message='Creatura evocata!';selection=null}else game.message='Spazio occupato o energia insufficiente.'}else if(p.board[i]){selection={type:'unit',index:i};game.message='Scegli il bersaglio nemico.'}render()}
function clickEnemy(i){if(game.over||enemyBusy||selection?.type!=='unit')return;if(attack(game.player,selection.index,game.enemy,i)){selection=null;game.message='Attacco eseguito!'}else game.message='Attacco non valido: controlla Guardia e disponibilità.';render()}
function clickHero(){if(game.over||enemyBusy||selection?.type!=='unit')return;if(attack(game.player,selection.index,game.enemy,null)){selection=null;game.message='Attacco diretto!'}else game.message='Devi eliminare tutte le creature nemiche prima di attaccare direttamente.';render()}
function render(){let p=game.player,e=game.enemy;$('playerhp').textContent='❤️ '+p.hp+'/'+(30+(activeRelic('heart')?6:0));$('enemyhp').textContent='❤️ '+e.hp+'/'+enemyMaxHp();$('bossname').textContent=stageInfo(stage).name;$('stage').textContent=stageInfo(stage).world.name+' · '+stageInfo(stage).level+'/10'+(stageInfo(stage).isBoss?' 👑 BOSS':'');$('energy').textContent='💠 '+p.energy+'/'+p.max;$('enemyenergy').textContent='💠 '+e.energy+'/'+e.max;$('status').textContent=game.message;$('deck').textContent=' · Mazzo: '+p.deck.length;$('record').textContent='🪙 '+coins+' · 💎 '+crystals+' · 🏆 '+(localStorage.getItem('rba_wins')||0);$('end').disabled=game.over||enemyBusy;$('turnnumber').textContent=game.turn;$('enemydeck').textContent=e.deck.length;$('power').disabled=game.over||enemyBusy||p.energy<2||p.hp>=30+(activeRelic('heart')?6:0);$('log').innerHTML=game.log.map(s=>'<div>'+s+'</div>').join('');$('faction').value=faction;$('openforge').textContent='⚒️ Forgia · 🪙 '+coins;$('openshop').textContent='💎 Bottega · '+crystals;for(let [id,side,cb] of [['playerfield',p,clickPlayer],['enemyfield',e,clickEnemy]]){let el=$(id);el.innerHTML='';side.board.forEach((u,i)=>{let slot=document.createElement('div');slot.className='slot'+(id==='playerfield'&&selection?.type==='hand'&&!u?' valid':'');slot.innerHTML=u?cardHTML(u,(id==='playerfield'&&selection?.type==='unit'&&selection.index===i?'selected ':'')+(!u.ready?'exhausted':'')):'＋';slot.onclick=()=>cb(i);el.appendChild(slot)})}let hand=$('hand');hand.innerHTML='';p.hand.forEach((c,i)=>{let div=document.createElement('div');div.innerHTML=cardHTML(c,selection?.type==='hand'&&selection.index===i?'selected':'');div.firstElementChild.style.opacity=c.cost>p.energy?'.55':'1';div.onclick=()=>clickHand(i);hand.appendChild(div)})}
$('end').onclick=endTurn;$('restart').onclick=start;$('power').onclick=usePower;$('faction').onchange=e=>setFaction(e.target.value);document.querySelector('.hero.enemy').onclick=clickHero;$('count').textContent=cards.length;$('collection').innerHTML=cards.map(c=>cardHTML(upgradedCard(c))).join('');$('collectioncount').textContent=cards.length;start();
if('serviceWorker'in navigator && location.protocol!=='file:')navigator.serviceWorker.register('./sw.js').catch(()=>{});

$('nextbattle').onclick=()=>{if(game.player.hp>0&&stage<TOTAL_STAGES){stage=Math.min(stage+1,unlocked);start()}else if(stage===TOTAL_STAGES&&game.player.hp>0){$('victory').hidden=true;openMap()}else start()};$('openmap').onclick=openMap;$('closemap').onclick=()=>{$('campaign').hidden=true}; $('openforge').onclick=openForge;$('closeforge').onclick=()=>{$('forge').hidden=true};$('openbook').onclick=()=>{$('bestiary').hidden=false};$('closebook').onclick=()=>{$('bestiary').hidden=true};$('bestiary').addEventListener('click',e=>{if(e.target.id==='bestiary')e.currentTarget.hidden=true});$('help').onclick=()=>{$('instructions').hidden=false};$('closehelp').onclick=()=>{$('instructions').hidden=true};

$('openshop').onclick=openShop;$('closeshop').onclick=()=>{$('shop').hidden=true};$('shop').addEventListener('click',e=>{if(e.target.id==='shop')e.currentTarget.hidden=true});

$('opendeck').onclick=openDeckBuilder;$('closedeck').onclick=()=>{$('deckbuilder').hidden=true};$('deckfilter').onchange=renderDeckBuilder;$('autodeck').onclick=autoDeck;$('savedeck').onclick=saveCustomDeck;$('cleardeck').onclick=()=>{customDeck=null;draftDeck=[];localStorage.removeItem('rba_custom_deck');renderDeckBuilder();start()};

// v3.2: inizializzazione effettiva della prima battaglia, dopo il collegamento dei controlli.
try { start(); window.dispatchEvent(new CustomEvent("rba:ready")); } catch (err) { console.error("Runebound: avvio fallito", err); window.__rbaStartupError = String(err && err.message || err); window.dispatchEvent(new CustomEvent("rba:startup-error", {detail: window.__rbaStartupError})); }
