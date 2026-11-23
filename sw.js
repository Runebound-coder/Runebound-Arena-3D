const CACHE='runebound-web-public-v3.3';
const FILES=['./','./index.html','./style.css','./game.js','./arena3d.js','./display.js','./menu.js','./inspection.js','./icon.svg','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./manifest.webmanifest','./verifica.html','./salvataggi.html','./installa.html','./installazione.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));return}
e.respondWith(fetch(e.request).then(net=>{if(net.ok){const copy=net.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return net}).catch(()=>caches.match(e.request)))});
