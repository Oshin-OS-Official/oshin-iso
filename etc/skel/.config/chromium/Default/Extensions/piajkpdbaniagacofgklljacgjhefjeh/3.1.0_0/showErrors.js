window.onerror=function(e,t,n,o,r){const c=document.querySelector("BODY > #uncaughtErrors");if(c){if(!c.childElementCount){const e=document.createElement("P");e.textContent="Errors:",c.appendChild(e)}const t=document.createElement("P");t.textContent=e.toString(),c.appendChild(t)}else window.alert(e)};