import"./Logger.js";import{A as t}from"./CoreAPI.js";(async()=>{await t.Storage.initAsync(),t.StayFocusd.localizeHTML(document);const a=await t.Storage.get("install-id");document.getElementById("installIdDisplay").textContent=a})();
//# sourceMappingURL=help.js.map
