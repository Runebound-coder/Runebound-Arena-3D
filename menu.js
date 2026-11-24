// Menu resistente a errori di avvio, compatibile con Safari iOS.
(()=>{'use strict';
const $=id=>document.getElementById(id);
const menu=$('mainmenu'),progress=$('menuprogress');
if(!menu)return;
const notice=document.createElement('p');notice.id='menuerror';notice.setAttribute('role','alert');notice.hidden=true;
notice.style.cssText='background:#4b2246;color:#fff1d7;border:2px solid #ffbd80;border-radius:12px;padding:12px;line-height:1.5;font-size:13px;margin:12px auto;max-width:350px';
$('menubattle').after(notice);
function error(message){notice.textContent=message;notice.hidden=false;}
function ready(){return typeof window.start==='function' && typeof window.render==='function' && typeof game!=='undefined' && !!game && !!$('playerfield') && !!$('hand');}
function close(){menu.hidden=true;menu.style.display='none';document.body.classList.add('game-started');}
function open(){menu.hidden=false;menu.style.display='flex';document.body.classList.remove('game-started');notice.hidden=true;
try{const level=Math.max(1,Math.min(60,Number(localStorage.getItem('rba_unlocked')||1)));progress.textContent=`Livello ${level}/60 sbloccato · 18 boss · 80 creature`;}catch{progress.textContent='60 livelli · 18 boss · 80 creature';}}
function enter(target){notice.hidden=true;
if(!ready()){try{if(typeof window.start==='function')window.start()}catch(e){window.__rbaStartupError=String(e.message||e)}if(!ready()){error('Avvio non riuscito: '+(window.__rbaStartupError||'motore non inizializzato')+'. Controlla Verifica installazione. I salvataggi restano al sicuro.');return;}}
try{if(target==='battle'){close();return;}
const button=$(target==='campaign'?'openmap':'openbook');if(!button){error('Questa sezione non è disponibile: manca un componente.');return;}
close();button.click();const modal=$(target==='campaign'?'campaign':'bestiary');if(!modal||modal.hidden){open();error('La sezione non si è aperta. Controlla la diagnostica.');return;}
}catch(e){console.error('Runebound menu:',e);error('Errore durante l’apertura: '+e.message);}}
$('menubattle').addEventListener('click',()=>enter('battle'));
$('menucampaign').addEventListener('click',()=>enter('campaign'));
$('menucollection').addEventListener('click',()=>enter('collection'));
const back=document.createElement('button');back.id='homebutton';back.className='iconbutton';back.title='Menu principale';back.setAttribute('aria-label','Torna al menu principale');back.textContent='⌂';
const tools=document.querySelector('.displaytools');if(tools)tools.prepend(back);back.addEventListener('click',open);
window.addEventListener('error',e=>{if(!menu.hidden)error('Errore di caricamento: '+(e.message||'file non disponibile')+'. Controlla Verifica installazione.');});
window.addEventListener('rba:startup-error',e=>error('Errore inizializzazione: '+e.detail));
window.addEventListener('unhandledrejection',e=>{console.error('Runebound:',e.reason)});
window.rbaMenuDiagnostic=()=>({ready:ready(),menuVisible:!menu.hidden,buttons:['menubattle','menucampaign','menucollection'].map(id=>({id,found:!!$(id)})),gameStarted:typeof game!=='undefined'&&!!game});
open();
})();
