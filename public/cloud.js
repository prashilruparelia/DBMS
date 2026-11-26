(() => {
 const menu=document.getElementById('menu'),sidebar=document.getElementById('sidebar'),shade=document.getElementById('navShade');
 const sync=()=>{const open=sidebar.classList.contains('open');shade.hidden=!open;menu.setAttribute('aria-expanded',String(open))};
 new MutationObserver(sync).observe(sidebar,{attributes:true,attributeFilter:['class']});sync();shade.onclick=()=>sidebar.classList.remove('open');document.addEventListener('keydown',e=>{if(e.key==='Escape')sidebar.classList.remove('open')});
 document.getElementById('share').onclick=async()=>{const url=location.origin+location.pathname;try{if(navigator.share){await navigator.share({title:'DBMS Study Hub',text:'Study DBMS: notes, flashcards, SQL and mock tests.',url});return}if(navigator.clipboard){await navigator.clipboard.writeText(url);alert('Study portal link copied.');return}}catch(e){if(e.name==='AbortError')return}prompt('Copy the study portal link:',url)};
 if('serviceWorker' in navigator&&window.isSecureContext)navigator.serviceWorker.register('sw.js').catch(()=>{});
})();
