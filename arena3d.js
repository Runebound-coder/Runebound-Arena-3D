import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';
const arena=document.querySelector('.arena');
const canvas=document.createElement('canvas');canvas.id='scene3d';canvas.setAttribute('aria-label','Arena tridimensionale animata');arena.prepend(canvas);
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.6));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;
const scene=new THREE.Scene();scene.background=new THREE.Color(0x8ecce5);scene.fog=new THREE.Fog(0x8ecce5,18,34);
const camera=new THREE.OrthographicCamera(-5.6,5.6,8.5,-8.5,.1,100);camera.position.set(0,16,17);camera.lookAt(0,0,0);
// Camera and rendering quality can be changed without restarting the match.
let cameraMode=localStorage.getItem('rba_camera')==='top'?'top':'angled';
let graphicsMode=localStorage.getItem('rba_graphics')==='eco'?'eco':'high';
const cameraButton=document.getElementById('cameramode');
const graphicsButton=document.getElementById('graphicsmode');
function applyCamera(){camera.position.set(0,cameraMode==='top'?25:16,cameraMode==='top'?0.01:17);camera.lookAt(0,0,0);cameraButton.textContent=cameraMode==='top'?'▣':'◉';cameraButton.title=cameraMode==='top'?'Visuale dall’alto':'Visuale isometrica';}
function applyGraphics(){renderer.setPixelRatio(Math.min(devicePixelRatio||1,graphicsMode==='eco'?1:1.6));renderer.shadowMap.enabled=graphicsMode==='high';graphicsButton.textContent=graphicsMode==='eco'?'◌':'✦';graphicsButton.title=graphicsMode==='eco'?'Qualità risparmio':'Qualità alta';if(typeof resize==='function')resize();}
cameraButton.addEventListener('click',()=>{cameraMode=cameraMode==='top'?'angled':'top';localStorage.setItem('rba_camera',cameraMode);applyCamera();});
graphicsButton.addEventListener('click',()=>{graphicsMode=graphicsMode==='eco'?'high':'eco';localStorage.setItem('rba_graphics',graphicsMode);applyGraphics();});
applyCamera();
scene.add(new THREE.HemisphereLight(0xcdeaff,0x4d4b65,2.2));const sun=new THREE.DirectionalLight(0xffe4ae,3);sun.position.set(-5,12,7);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-12;sun.shadow.camera.right=12;sun.shadow.camera.top=16;sun.shadow.camera.bottom=-16;scene.add(sun);
const mat=(c,roughness=.65)=>new THREE.MeshStandardMaterial({color:c,roughness,metalness:.04});
const gold=mat(0xf8d37b),ink=mat(0x252044),white=mat(0xfff4df),dark=mat(0x37334b);
function mesh(g,m,parent,x=0,y=0,z=0){const a=new THREE.Mesh(g,m);a.position.set(x,y,z);a.castShadow=true;a.receiveShadow=true;parent.add(a);return a}
function ball(p,m,x,y,z,sx,sy,sz){let a=mesh(new THREE.SphereGeometry(1,14,10),m,p,x,y,z);a.scale.set(sx,sy,sz);return a}
function cone(p,m,x,y,z,r,h){return mesh(new THREE.ConeGeometry(r,h,6),m,p,x,y,z)}
function box(p,m,x,y,z,w,h,d){return mesh(new THREE.BoxGeometry(w,h,d),m,p,x,y,z)}
const platform=new THREE.Group();scene.add(platform);
const laneMats=[mat(0xe69c72),mat(0x7ac2a2),mat(0x88bedc)];
for(let i=0;i<3;i++){const x=(i-1)*3.6;
 box(platform,mat(0x51456b),x,-.45,0,3.35,.8,11.4);
 box(platform,laneMats[i],x,-.04,0,3.15,.16,11.1);
 for(const z of [-2.8,2.8]){const ring=mesh(new THREE.CylinderGeometry(1.15,1.28,.23,32),mat(i===0?0xb35f50:i===1?0x459b7d:0x5d91b4),platform,x,.12,z);ring.receiveShadow=true;mesh(new THREE.TorusGeometry(1.12,.075,6,32),gold,platform,x,.28,z).rotation.x=Math.PI/2;}
 for(const z of [-5,5]){cone(platform,mat(i===0?0xa64e3f:i===1?0x438c65:0xd8f1ff),x+.85,.35,z,.25,.8)}
}
for(let i=0;i<4;i++){const x=(i%2?6.5:-6.5),z=(i<2?4.7:-4.7);box(scene,mat(0x5d5375),x,.6,z,1.1,2,1.1);cone(scene,mat(0xb88bcd),x,2,z,.85,1.4)}
// v1.6 — four distinct, selectable 3D environments. Keep geometry reusable.
const scenery=new THREE.Group();scene.add(scenery);
const themeDefs=[
 {name:'Bosco incantato',icon:'🌲',sky:0x9bd8dc,fog:0x9bd8dc,lanes:[0xe5b07e,0x77cda4,0x95d6eb]},
 {name:'Vulcano di rubino',icon:'🌋',sky:0x9b5b6d,fog:0x9b5b6d,lanes:[0xe48a68,0xb66a69,0x936b91]},
 {name:'Baia cristallina',icon:'🌊',sky:0x78c9e5,fog:0x78c9e5,lanes:[0x8ccbd8,0x6dbfc3,0x7b9edc]},
 {name:'Regno delle ombre',icon:'🌙',sky:0x524a80,fog:0x524a80,lanes:[0x9c759e,0x6c83a0,0x776a9f]}
];
let themeIndex=Math.max(0,Number(localStorage.getItem('rba_theme')||0)%themeDefs.length);
const themeButton=document.getElementById('arenatheme');
function sceneryTree(x,z,leafColor){
 const trunk=mat(0x755442),leaves=mat(leafColor);
 mesh(new THREE.CylinderGeometry(.14,.22,.9,7),trunk,scenery,x,.48,z);
 mesh(new THREE.ConeGeometry(.63,1.35,7),leaves,scenery,x,1.42,z);
 mesh(new THREE.ConeGeometry(.46,.95,7),leaves,scenery,x,2.06,z);
}
function sceneryCrystal(x,z,color){const c=mat(color,.28);const a=mesh(new THREE.OctahedronGeometry(.58,0),c,scenery,x,.65,z);a.scale.y=1.8;mesh(new THREE.OctahedronGeometry(.32,0),c,scenery,x+.52,.35,z+.28).scale.y=1.7}
function applyTheme(){
 const theme=themeDefs[themeIndex];scene.background.setHex(theme.sky);scene.fog.color.setHex(theme.fog);
 laneMats.forEach((m,i)=>m.color.setHex(theme.lanes[i]));
 while(scenery.children.length){const child=scenery.children[0];scenery.remove(child);child.traverse(o=>{if(o.isMesh){o.geometry.dispose();o.material.dispose()}})}
 for(const x of [-6.9,6.9])for(const z of [-4,-1.5,1.5,4]){
  if(themeIndex===0)sceneryTree(x,z,0x409e70);
  else if(themeIndex===1)sceneryCrystal(x,z,0xff794e);
  else if(themeIndex===2)sceneryCrystal(x,z,0x6af1f0);
  else sceneryCrystal(x,z,0xc38af7);
 }
 themeButton.textContent=theme.icon;themeButton.title='Scenario: '+theme.name;themeButton.setAttribute('aria-label',themeButton.title);
}
themeButton.addEventListener('click',()=>{themeIndex=(themeIndex+1)%themeDefs.length;localStorage.setItem('rba_theme',themeIndex);applyTheme();document.getElementById('status').textContent='🌍 Scenario: '+themeDefs[themeIndex].name});
applyTheme();
// Boss showcase: a distinct 3D guardian appears beyond the enemy lanes on boss stages.
const bossDisplay=new THREE.Group();scene.add(bossDisplay);
let bossSig='', bossCrown=null, bossLight=null, bossGuardian=null, bossAttackAt=0, bossHitAt=0;
function clearBossDisplay(){while(bossDisplay.children.length){const obj=bossDisplay.children[0];bossDisplay.remove(obj);obj.traverse(n=>{if(n.isMesh){n.geometry.dispose();if(n.material)n.material.dispose()}})}bossCrown=null;bossLight=null;bossGuardian=null;}
function refreshBossDisplay(){
 const info=typeof stageInfo==='function'&&typeof stage!=='undefined'?stageInfo(stage):null;
 const key=info&&info.isBoss?info.name:'';
 if(key===bossSig)return;
 bossSig=key;clearBossDisplay();
 if(!key)return;
 const element=info.world.tone;
 const palette=palettes[element]||palettes.shadow;
 const body=mat(palette[0]),trim=mat(palette[1],.25),shade=mat(palette[2]);
 const plinth=mesh(new THREE.CylinderGeometry(1.05,1.22,.42,12),shade,bossDisplay,0,.45,-6.65);
 mesh(new THREE.TorusGeometry(1.04,.09,6,28),trim,bossDisplay,0,.7,-6.65).rotation.x=Math.PI/2;
 const guardian=new THREE.Group();guardian.position.set(0,.65,-6.65);bossDisplay.add(guardian);bossGuardian=guardian;
 ball(guardian,body,0,1.2,0,.78,.98,.62);ball(guardian,trim,0,2.45,0,.73,.68,.6);
 for(const side of [-1,1]){
  ball(guardian,shade,side*.93,1.52,0,.32,.7,.32);
  cone(guardian,shade,side*.48,3.18,0,.23,.82).rotation.z=side*-.35;
  ball(guardian,white,side*.29,2.55,.56,.17,.2,.08);
  ball(guardian,ink,side*.29,2.55,.63,.08,.12,.045);
 }
 if(/drago|fenice|grifone|serpente|kraken/i.test(key))for(const side of [-1,1]){
  const wing=cone(guardian,shade,side*1.13,1.95,-.32,.66,1.8);wing.rotation.z=side*-.85;
 }
 if(/ent|cervo|fung|rovi/i.test(key))for(const side of [-1,1]){
  const branch=cone(guardian,trim,side*.8,3.13,0,.26,.95);branch.rotation.z=side*-.6;
 }
 bossCrown=new THREE.Group();bossCrown.position.set(0,3.65,0);guardian.add(bossCrown);
 mesh(new THREE.TorusGeometry(.48,.12,6,18),gold,bossCrown,0,0,0).rotation.x=Math.PI/2;
 for(let i=0;i<5;i++){const a=i*Math.PI*2/5;cone(bossCrown,gold,Math.cos(a)*.46,.2,Math.sin(a)*.46,.13,.43)}
 bossLight=new THREE.PointLight(palette[1],2.5,8);bossLight.position.set(0,3.4,-6.65);bossDisplay.add(bossLight);
}
const creatures=new THREE.Group();scene.add(creatures);let actors=[];const fx=[];const fxGroup=new THREE.Group();scene.add(fxGroup);const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function burst(x,z,element,count=14){const colors=palettes[element]||palettes.fire;for(let i=0;i<count;i++){const m=new THREE.Mesh(new THREE.IcosahedronGeometry(.09+Math.random()*.12,0),new THREE.MeshBasicMaterial({color:colors[i%3],transparent:true,opacity:1}));m.position.set(x,.8+Math.random()*1.4,z);fxGroup.add(m);const a=Math.random()*Math.PI*2;fx.push({mesh:m,vx:Math.cos(a)*(.03+Math.random()*.07),vy:.04+Math.random()*.07,vz:Math.sin(a)*(.03+Math.random()*.07),life:1});}}
window.addEventListener('rba:summon',e=>{const d=e.detail;burst((d.slot-1)*3.6,d.side==='enemy'?-2.8:2.8,d.element,reduceMotion?3:18)});
// v2.5: summoning light pillars and short-lived battle result celebration.
const summonBeams=[];
function summonBeam(d){const x=(d.slot-1)*3.6,z=d.side==='enemy'?-2.8:2.8;const color=({fire:0xffa251,water:0x74e9ff,nature:0x9df58d,shadow:0xd19bff})[d.element]||0xffffff;const material=new THREE.MeshBasicMaterial({color,transparent:true,opacity:.36,depthWrite:false,side:THREE.DoubleSide});const obj=new THREE.Mesh(new THREE.CylinderGeometry(.48,.75,3.8,12,1,true),material);obj.position.set(x,1.9,z);fxGroup.add(obj);summonBeams.push({obj,start:performance.now()});}
window.addEventListener('rba:summon',e=>summonBeam(e.detail));

// v2.2: distinct elemental spells and impact rings, all disposed after use.
function spellMaterial(color,opacity=1){return new THREE.MeshBasicMaterial({color,transparent:true,opacity,depthWrite:false,side:THREE.DoubleSide})}
function makeSpell(element,color){
 const g=new THREE.Group();
 if(element==='fire'){
  const flame=new THREE.Mesh(new THREE.ConeGeometry(.27,.85,7),spellMaterial(0xff893b));flame.rotation.x=Math.PI/2;g.add(flame);
  const core=new THREE.Mesh(new THREE.IcosahedronGeometry(.22,1),spellMaterial(0xffe38a));g.add(core);
 }else if(element==='water'){
  const drop=new THREE.Mesh(new THREE.OctahedronGeometry(.37,0),spellMaterial(0x75e7ff,.85));drop.scale.set(.8,1.45,.8);g.add(drop);
  const core=new THREE.Mesh(new THREE.SphereGeometry(.14,10,8),spellMaterial(0xe0ffff));g.add(core);
 }else if(element==='nature'){
  for(let i=0;i<3;i++){const leaf=new THREE.Mesh(new THREE.ConeGeometry(.19,.62,5),spellMaterial(i===1?0xd8f884:0x61ca73));leaf.position.set(Math.cos(i*2.094)*.21,Math.sin(i*2.094)*.21,0);leaf.rotation.z=i*2.094-Math.PI/2;g.add(leaf)}
  g.add(new THREE.Mesh(new THREE.IcosahedronGeometry(.14),spellMaterial(0xf1ffa3)));
 }else{
  const core=new THREE.Mesh(new THREE.OctahedronGeometry(.32),spellMaterial(0xb58aff));core.rotation.z=.65;g.add(core);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.42,.055,5,14),spellMaterial(0xf0c5ff,.8));ring.rotation.x=.55;g.add(ring);
 }
 return g;
}
function disposeFX(obj){obj.traverse(n=>{if(n.isMesh){n.geometry.dispose();if(Array.isArray(n.material))n.material.forEach(m=>m.dispose());else n.material.dispose()}})}
// v2.4: short-lived elemental trails, capped to avoid mobile GPU overload.
let lastTrailAt=0;
function trailParticle(x,y,z,element){
 const colors=palettes[element]||palettes.fire;
 const geo=element==='water'?new THREE.OctahedronGeometry(.10):element==='nature'?new THREE.TetrahedronGeometry(.13):new THREE.IcosahedronGeometry(.10);
 const material=spellMaterial(colors[Math.floor(Math.random()*2)],.85);
 const particle=new THREE.Mesh(geo,material);particle.position.set(x,y,z);fxGroup.add(particle);
 fx.push({mesh:particle,vx:(Math.random()-.5)*.035,vy:element==='fire'?.045:element==='water'?-.025:.012,vz:(Math.random()-.5)*.035,life:.65,trail:true});
}
function bossMagic(element){
 if(!bossGuardian||reduceMotion||graphicsMode==='eco')return;
 const colors=palettes[element]||palettes.shadow;
 for(let i=0;i<10;i++){
  const angle=i*Math.PI*2/10;
  trailParticle(Math.cos(angle)*(.7+Math.random()*.6),2.1+Math.random()*1.4,-6.65+Math.sin(angle)*.65,element);
 }
 const ring=new THREE.Mesh(new THREE.TorusGeometry(.8,.09,6,28),spellMaterial(colors[1],.85));
 ring.rotation.x=-Math.PI/2;ring.position.set(0,1.2,-6.65);fxGroup.add(ring);
 fx.push({mesh:ring,shockwave:true,life:1,boss:true});
}
function impact(x,z,element){
 const colors=palettes[element]||palettes.fire;
 const ring=new THREE.Mesh(new THREE.TorusGeometry(.32,.075,6,24),spellMaterial(colors[1],.9));ring.rotation.x=-Math.PI/2;ring.position.set(x,.55,z);fxGroup.add(ring);fx.push({mesh:ring,shockwave:true,life:1});
 burst(x,z,element,reduceMotion?5:22);
}
window.addEventListener('rba:attack',e=>{
 const d=e.detail,x=(d.from-1)*3.6,z=d.side==='enemy'?-2.8:2.8;
 const tx=d.to===null?0:(d.to-1)*3.6,tz=d.side==='enemy'?3.1:-3.1;
 const element=d.element||'fire',orb=makeSpell(element,(palettes[element]||palettes.fire)[1]);
 orb.position.set(x,1.5,z);fxGroup.add(orb);
 fx.push({mesh:orb,projectile:true,start:performance.now(),duration:reduceMotion?160:520,x,z,tx,tz,element});
 if(bossGuardian&&d.side==='enemy'){bossAttackAt=performance.now();bossMagic(element)}
 if(bossGuardian&&d.side==='player'&&d.to===null){bossHitAt=performance.now();bossMagic(element)}
});
const palettes={fire:[0xf36d44,0xffca64,0x943f49],water:[0x43b5de,0xa4e8ff,0x3764b2],nature:[0x75bc5a,0xd8ef83,0x3f8065],shadow:[0x8c65c7,0xd1a6ff,0x43365f]};
// Elemental silhouettes and individual variations are generated from each card name.
function stableSeed(name){let h=2166136261;for(const ch of name){h=Math.imul(h^ch.charCodeAt(0),16777619)}return h>>>0}
function detail(g,m,x,y,z,r=.14){return mesh(new THREE.DodecahedronGeometry(r,0),m,g,x,y,z)}
function appendDetails(g,u,primary,accent,deep){
 const name=u.name.toLowerCase(), seed=stableSeed(u.name), variant=seed%5;
 const fire=u.element==='fire',water=u.element==='water',nature=u.element==='nature',shadow=u.element==='shadow';
 // Silhouette details: horns, fins, leaves, scales and floating runes.
 if(fire){for(let i=0;i<4;i++){const a=(i-1.5)*.48;const spike=cone(g,i%2?accent:deep,Math.sin(a)*.54,2.46+Math.cos(a)*.12,-.12,.13,.45+variant*.045);spike.rotation.z=-a*.45;} }
 if(water){for(let i=0;i<3;i++){const fin=cone(g,accent,(i-1)*.4,2.58,-.18,.2,.55);fin.rotation.z=(i-1)*-.48;}for(let i=0;i<5;i++)detail(g,accent,Math.sin(i*2.4)*.52,1.1+(i%3)*.3,.45,.075)}
 if(nature){for(let i=0;i<5;i++){const a=i*Math.PI*2/5;const leaf=ball(g,i%2?primary:accent,Math.cos(a)*.64,2.46+Math.sin(a)*.24,-.15,.22,.36,.12);leaf.rotation.z=a-.5;} }
 if(shadow){for(let i=0;i<3;i++){const orb=detail(g,accent,Math.cos(i*2.1)*.88,1.3+(i%2)*.5,Math.sin(i*2.1)*.45,.13);orb.rotation.y=i;}}
 // Distinct face / armor decoration, deterministically varied by card name.
 if(variant===0){for(const x of [-.38,.38])detail(g,deep,x,1.48,.47,.17)}
 if(variant===1){const crown=mesh(new THREE.TorusGeometry(.38,.075,5,12),accent,g,0,2.75,0);crown.rotation.x=.45}
 if(variant===2){for(let i=0;i<3;i++)detail(g,accent,(i-1)*.22,1.08,.54,.1)}
 if(variant===3){for(const x of [-.65,.65]){const horn=cone(g,deep,x,2.46,-.03,.17,.65);horn.rotation.z=x>0?-.42:.42}}
 if(variant===4){const gem=mesh(new THREE.OctahedronGeometry(.22),accent,g,0,1.18,.56);gem.rotation.z=.5}
 if(/kraken|polpo|tentacol|medus/.test(name)){for(let i=0;i<4;i++){const t=mesh(new THREE.CylinderGeometry(.08,.16,1.2,7),primary,g,(i-1.5)*.33,.46,.2);t.rotation.z=(i-1.5)*.25}}
 if(/cavaliere|guard|sentinell|paladin/.test(name)){const shield=mesh(new THREE.IcosahedronGeometry(.42,0),deep,g,-.83,1.23,.28);shield.scale.set(.85,1.2,.35);detail(g,accent,-.83,1.23,.52,.13)}
 if(/mago|strega|sciam|necrom/.test(name)){const staff=mesh(new THREE.CylinderGeometry(.045,.065,2.4,8),deep,g,.85,1.22,.15);staff.rotation.z=-.1;detail(g,accent,.98,2.44,.15,.25)}
}
// v2.1: individual silhouettes and attack reactions, driven by the real battle events.
function creatureArchetype(name){
 const n=name.toLowerCase();
 if(/drag|drac|viverna|idra|basilisc/.test(n))return 'dragon';
 if(/golem|colosso|titano|guardiano|sentinella/.test(n))return 'golem';
 if(/mago|strega|sciam|necrom|lich|incant|oracol/.test(n))return 'mage';
 if(/lupo|volpe|leone|cervo|orso|grifon|cinghial|lince|segugio/.test(n))return 'beast';
 if(/spettr|fantasm|ombra|banshee|spirito/.test(n))return 'spirit';
 if(/ent|alber|querc|radic|fung|rovi/.test(n))return 'forest';
 if(/kraken|polpo|tentacol|medus|serpent/.test(n))return 'aquatic';
 return 'warrior';
}
function speciesFeatures(g,u,primary,accent,deep){
 const type=creatureArchetype(u.name),seed=stableSeed(u.name);
 if(type==='dragon'){
  for(const side of [-1,1]){
   const wing=new THREE.Group();wing.position.set(side*.62,1.85,-.35);g.add(wing);
   const membrane=mesh(new THREE.ConeGeometry(.64,1.55,3),deep,wing,side*.52,.1,0);membrane.rotation.z=side*-.95;membrane.scale.z=.35;
   for(let j=0;j<3;j++){const spike=cone(wing,accent,side*(.22+j*.27),.72-j*.27,0,.10,.35);spike.rotation.z=side*-.6}
  }
  const snout=ball(g,primary,0,1.89,.62,.39,.22,.48);for(const side of [-1,1])detail(g,deep,side*.19,1.99,.99,.075);
  for(let i=0;i<4;i++)cone(g,accent,0,1.65-i*.25,-.57-i*.12,.17,.38).rotation.x=-.65;
 }else if(type==='golem'){
  for(const side of [-1,1]){const shoulder=box(g,deep,side*.87,1.6,0,.65,.65,.68);shoulder.rotation.z=side*.2;box(g,primary,side*.9,.85,.06,.43,.8,.47)}
  const chest=mesh(new THREE.OctahedronGeometry(.33),accent,g,0,1.3,.58);chest.rotation.z=Math.PI/4;
  for(let i=0;i<3;i++)box(g,deep,(i-1)*.31,2.63,0,.25,.28,.28);
 }else if(type==='mage'){
  const hat=cone(g,deep,0,2.88,0,.69,1.05);hat.rotation.z=.13;
  const brim=mesh(new THREE.CylinderGeometry(.74,.74,.10,12),accent,g,0,2.48,0);
  const staff=mesh(new THREE.CylinderGeometry(.06,.08,2.5,8),deep,g,.93,1.25,.18);staff.rotation.z=-.14;
  const crystal=mesh(new THREE.OctahedronGeometry(.28),accent,g,1.1,2.51,.18);crystal.rotation.z=.45;
 }else if(type==='beast'){
  for(const side of [-1,1]){ball(g,primary,side*.5,.54,-.25,.26,.48,.28);cone(g,deep,side*.43,2.55,.12,.24,.7)}
  ball(g,accent,0,1.94,.55,.37,.24,.36);ball(g,deep,0,1.88,.87,.13,.11,.15);
 }else if(type==='spirit'){
  for(let i=0;i<5;i++){const tail=cone(g,i%2?accent:deep,(i-2)*.26,.36,.02,.21,.8);tail.rotation.z=Math.PI+(i-2)*.16}
  for(const side of [-1,1])ball(g,accent,side*.85,1.5,0,.22,.5,.21);
 }else if(type==='forest'){
  for(const side of [-1,1]){const branch=mesh(new THREE.CylinderGeometry(.08,.16,1.25,6),deep,g,side*.75,2.45,0);branch.rotation.z=-side*.65;ball(g,accent,side*1.13,2.85,0,.37,.28,.28)}
  for(let i=0;i<4;i++)ball(g,primary,(i-1.5)*.35,2.78,-.18,.32,.29,.31);
 }else if(type==='aquatic'){
  for(let i=0;i<5;i++){const side=i-2;const tentacle=mesh(new THREE.CylinderGeometry(.07,.18,1.18,7),primary,g,side*.3,.48,.2);tentacle.rotation.z=side*.22}
  for(const side of [-1,1]){const fin=cone(g,accent,side*.65,2.48,-.1,.28,.68);fin.rotation.z=-side*.7}
 }else{
  const shield=mesh(new THREE.IcosahedronGeometry(.48,0),deep,g,-.85,1.19,.28);shield.scale.set(.85,1.2,.3);detail(g,accent,-.85,1.19,.48,.18);
  const blade=box(g,accent,.9,1.35,.28,.12,1.2,.13);cone(g,white,.9,2.08,.28,.14,.48);
 }
 // Personal crest: repeatable, individual for each creature.
 const crest=mesh(new THREE.OctahedronGeometry(.10+(seed%3)*.025),accent,g,0,1.23,.61);crest.rotation.z=Math.PI/4;
 return type;
}
function buildCreature(u,side,row){const c=palettes[u.element]||palettes.fire;const primary=mat(c[0]),accent=mat(c[1]),deep=mat(c[2]);const g=new THREE.Group();const x=(row-1)*3.6,z=side==='enemy'?-2.8:2.8;g.position.set(x,.36,z);g.rotation.y=side==='enemy'?0:Math.PI;creatures.add(g);
const name=u.name.toLowerCase();const dragon=/drag|drac|viverna|idra|serpe|serpent|basilisc|kraken/.test(name);const tree=/ent|alber|querc|radic|golem|colosso|titano/.test(name);const ghost=/spettr|fantasm|ombra|lich|banshee|necrom/.test(name);const beast=/lupo|volpe|leone|cervo|orso|grifon|cinghial|lince|segugio/.test(name);
ball(g,primary,0,1.0,0,.66,.85,.56);ball(g,accent,0,2.05,.08,.6,.57,.54);
if(tree){box(g,deep,-.43,.55,.05,.28,.75,.3);box(g,deep,.43,.55,.05,.28,.75,.3);for(let i=-1;i<=1;i++)ball(g,accent,i*.45,2.5,-.1,.38,.38,.38)}
else if(ghost){const skirt=cone(g,deep,0,.53,0,.73,1.1);skirt.rotation.z=Math.PI;for(const s of [-1,1])ball(g,accent,s*.72,1.4,.05,.28,.4,.27);cone(g,accent,0,2.7,0,.53,.7)}
else {for(const s of [-1,1]){ball(g,deep,s*.4,.42,.05,.25,.48,.3);ball(g,primary,s*.77,1.25,.05,.26,.42,.3);}}
if(dragon){for(const s of [-1,1]){const wing=cone(g,deep,s*1.05,1.65,-.28,.72,1.6);wing.rotation.z=s*-.9;cone(g,accent,s*.36,2.65,.03,.23,.55)}cone(g,primary,0,1.05,-.8,.25,1.6).rotation.x=-.6}
else if(beast){for(const s of [-1,1])cone(g,deep,s*.4,2.55,.05,.26,.66);ball(g,accent,0,1.93,.48,.37,.27,.25)}
else if(!tree&&!ghost){for(const s of [-1,1])cone(g,accent,s*.37,2.56,.02,.19,.5)}
for(const s of [-1,1]){ball(g,white,s*.24,2.1,.52,.17,.19,.09);ball(g,ink,s*.24,2.1,.61,.08,.12,.045)}
ball(g,deep,0,1.78,.55,.22,.065,.07);
appendDetails(g,u,primary,accent,deep);
const archetype=speciesFeatures(g,u,primary,accent,deep);
const ring=mesh(new THREE.TorusGeometry(.84,.055,5,32),mat(side==='player'?0x91f9db:0xffa6a6),g,0,.03,0);ring.rotation.x=Math.PI/2;
const aura=mesh(new THREE.OctahedronGeometry(.15),accent,g,0,3.15,0);actors.push({g,aura,ring,archetype,phase:Math.random()*6.28,side,row,attackUntil:0,hitUntil:0});return g}
function disposeActor(g){g.traverse(o=>{if(o.isMesh){o.geometry.dispose();if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material.dispose()}})}
let lastBoardSignature='';function update(){refreshBossDisplay();const signature=typeof game==='undefined'||!game?'':JSON.stringify(['enemy','player'].map(side=>(game[side]?.board||[]).map(u=>u?[u.id,u.name,u.element]:null)));if(signature===lastBoardSignature)return;lastBoardSignature=signature;while(creatures.children.length){const old=creatures.children[0];creatures.remove(old);disposeActor(old)}actors=[];if(typeof game === 'undefined' || !game)return;for(const side of ['enemy','player']){const board=game[side]?.board||[];board.forEach((u,i)=>{if(u)buildCreature(u,side,i)})}}
window.updateArena3D=update;
function resize(){const w=arena.clientWidth,h=arena.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);const ratio=w/h;const viewHeight=Math.max(18,12.8/Math.max(.42,ratio));camera.left=-viewHeight*ratio/2;camera.right=viewHeight*ratio/2;camera.top=viewHeight/2;camera.bottom=-viewHeight/2;camera.updateProjectionMatrix()}
// v2.3 — readable combat feedback projected over the WebGL battlefield.
// Labels are DOM elements so they stay crisp on retina displays and remain accessible.
const combatLabels=document.createElement('div');combatLabels.className='combat-label-layer';combatLabels.setAttribute('aria-hidden','true');arena.append(combatLabels);
let floatingLabels=[];
const elementNames={fire:'FUOCO',water:'ACQUA',nature:'NATURA',shadow:'OMBRA'};
function showDamageLabel(d){
 const el=document.createElement('div');el.className='combat-damage '+(d.element||'fire');
 const amount=Math.max(0,Number(d.damage)||0);
 el.textContent='−'+amount+' '+(elementNames[d.element]||'COLPO');
 combatLabels.append(el);
 const enemyTarget=d.side==='player';
 floatingLabels.push({el,x:d.to===null?0:(d.to-1)*3.6,z:enemyTarget?-2.8:2.8,born:performance.now()});
 if(floatingLabels.length>12){const old=floatingLabels.shift();old.el.remove()}
}
function updateDamageLabels(t){
 for(let i=floatingLabels.length-1;i>=0;i--){
  const f=floatingLabels[i],age=(t-f.born)/1000;
  if(age>1.05){f.el.remove();floatingLabels.splice(i,1);continue}
  const v=new THREE.Vector3(f.x,2.8+age*1.4,f.z).project(camera);
  f.el.style.left=((v.x+1)*.5*arena.clientWidth)+'px';
  f.el.style.top=((-v.y+1)*.5*arena.clientHeight)+'px';
  f.el.style.opacity=String(Math.min(1,(1.05-age)*2.8));
 }
}
window.addEventListener('rba:attack',e=>{
 const d=e.detail,now=performance.now();
 showDamageLabel(d);
 const attacker=actors.find(a=>a.side===d.side&&a.row===d.from);
 if(attacker)attacker.attackUntil=now+480;
 const defender=actors.find(a=>a.side!==(d.side)&&a.row===d.to);
 if(defender)defender.hitUntil=now+560;
});
const resultFX=document.createElement('div');resultFX.className='arena-result-fx';resultFX.setAttribute('aria-live','polite');resultFX.setAttribute('aria-atomic','true');arena.append(resultFX);
let resultTimer=null;
window.addEventListener('rba:battle-start',()=>{resultFX.className='arena-result-fx';resultFX.textContent='';if(resultTimer)clearTimeout(resultTimer);});
window.addEventListener('rba:battle-end',e=>{const d=e.detail;resultFX.textContent=d.win?(d.boss?'👑 BOSS SCONFITTO!':'🏆 VITTORIA!'):'💀 SCONFITTA';resultFX.className='arena-result-fx show '+(d.win?'win':'lose');if(d.win){for(const x of [-3.6,0,3.6])burst(x,0,'nature',graphicsMode==='eco'||reduceMotion?4:18)}resultTimer=setTimeout(()=>{resultFX.className='arena-result-fx'},reduceMotion?1200:2600);});
new ResizeObserver(resize).observe(arena);applyGraphics();resize();let last=0;function frame(t){
 for(let i=summonBeams.length-1;i>=0;i--){const b=summonBeams[i],q=(t-b.start)/(reduceMotion?240:780);if(q>=1){fxGroup.remove(b.obj);b.obj.geometry.dispose();b.obj.material.dispose();summonBeams.splice(i,1)}else{b.obj.material.opacity=.38*(1-q);b.obj.scale.set(1+q*.35,1,1+q*.35)}}
requestAnimationFrame(frame);if(document.hidden||!arena.isConnected)return;if(t-last<(graphicsMode==='eco'?50:32))return;last=t;const sec=t*.001;if(bossCrown){bossCrown.rotation.y=sec*.6;bossCrown.position.y=3.65+Math.sin(sec*2)*.12}if(bossLight)bossLight.intensity=2.2+Math.sin(sec*3)*.45;
 if(bossGuardian){const attack=Math.max(0,1-(t-bossAttackAt)/700),hit=Math.max(0,1-(t-bossHitAt)/550);bossGuardian.rotation.y=Math.sin(sec*.6)*.11+Math.sin((1-attack)*Math.PI)*attack*.3;bossGuardian.position.y=.65+Math.sin(sec*1.8)*.1+Math.sin((1-attack)*Math.PI)*attack*.38;bossGuardian.scale.setScalar(1+Math.sin((1-hit)*Math.PI)*hit*.16)}for(let i=fx.length-1;i>=0;i--){const f=fx[i];if(f.projectile){const q=Math.min(1,(t-f.start)/f.duration);f.mesh.position.set(f.x+(f.tx-f.x)*q,1.5+Math.sin(q*Math.PI)*1.2,f.z+(f.tz-f.z)*q);if(q<1&&graphicsMode==='high'&&!reduceMotion&&t-lastTrailAt>45){lastTrailAt=t;trailParticle(f.mesh.position.x,f.mesh.position.y,f.mesh.position.z,f.element)}if(q>=1){fxGroup.remove(f.mesh);disposeFX(f.mesh);fx.splice(i,1);impact(f.tx,f.tz,f.element)}else{f.mesh.rotation.y+=.14;f.mesh.rotation.z+=.06}}else if(f.shockwave){f.life-=reduceMotion?.15:.065;f.mesh.scale.setScalar(1+(1-f.life)*3);f.mesh.material.opacity=Math.max(0,f.life*.9);if(f.life<=0){fxGroup.remove(f.mesh);disposeFX(f.mesh);fx.splice(i,1)}}else{f.life-=f.trail?.075:.035;f.mesh.position.x+=f.vx;f.mesh.position.y+=f.vy;f.mesh.position.z+=f.vz;f.vy-=f.trail?0:.005;f.mesh.material.opacity=Math.max(0,f.life);if(f.life<=0){fxGroup.remove(f.mesh);disposeFX(f.mesh);fx.splice(i,1)}}}actors.forEach(a=>{
 const attack=Math.max(0,(a.attackUntil-t)/480),hit=Math.max(0,(a.hitUntil-t)/560);
 const lunge=attack>0?Math.sin((1-attack)*Math.PI)*.52:0;
 const recoil=hit>0?Math.sin((1-hit)*Math.PI*3)*.24*hit:0;
 const forward=a.side==='enemy'?1:-1;
 a.g.position.y=.36+Math.sin(sec*2+a.phase)*.09+(attack>0?Math.sin((1-attack)*Math.PI)*.2:0);
 a.g.position.z=(a.side==='enemy'?-2.8:2.8)+forward*lunge-forward*recoil;
 a.g.position.x=(a.row-1)*3.6+(hit>0?Math.sin((1-hit)*Math.PI*7)*.12*hit:0);
 a.g.rotation.y=(a.side==='enemy'?0:Math.PI)+Math.sin(sec+a.phase)*.08+(attack>0?Math.sin((1-attack)*Math.PI)*.16:0);
 const pulse=hit>0?1+Math.sin((1-hit)*Math.PI)*.13:1;a.g.scale.set(pulse,pulse,pulse);
 if(a.archetype==='spirit')a.g.position.y+=Math.sin(sec*3+a.phase)*.14;
 if(a.archetype==='dragon')a.g.rotation.z=Math.sin(sec*2+a.phase)*.035;
 else a.g.rotation.z=0;
 a.aura.rotation.y=sec*1.5;a.aura.position.y=3.15+Math.sin(sec*3+a.phase)*.1;a.ring.rotation.z=sec*.2
});updateDamageLabels(t);renderer.render(scene,camera)}requestAnimationFrame(frame);
const originalRender=window.render;if(typeof originalRender==='function'){window.render=function(){originalRender();update()}};update();
