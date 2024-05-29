var r=Object.defineProperty;var c=(t,e,n)=>e in t?r(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var l=(t,e,n)=>(c(t,typeof e!="symbol"?e+"":e,n),n);import{B as g}from"../../Logger.js";import{A as i,P as d,k as u}from"../../CoreAPI.js";import{$ as b}from"../../jquery.js";import{B as m}from"../../Brightline.min.js";const h=`<!-- Container -->
<div class="p-4">
    <!-- Modal -->
    <div class="dialog flex flex-col bg-base-100 rounded-lg overflow-hidden">
        <!-- Header -->
        <div class="header flex p-2 justify-between items-center">
            <img class="logo-sf" src="/common/img/logo.svg" />
            <div class="btn btn-ghost btn-circle" id="btnDismiss">
                <svg class="Bz112c Bz112c-r9oPif" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#5f6368"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path><path fill="none" d="M0 0h24v24H0z"></path></svg>
            </div>
        </div>

        <!-- Content -->
        <div class="flex flex-col gap-4 p-4">
            <h1 data-i18n="required" class="text-lg font-bold"></h1>
            <p id="tosMessage" data-i18n="tosHaveChanged" class="text-base"></p>
            <p id="privacyPolicyMessage" data-i18n="onboardingConfirmMessage" class="text-base"></p>
            <button id="btnOpenSettings" class="btn btn-primary" data-i18n="openSettings" target="_blank"></button>
        </div>
    </div>
</div>
`;var a=i.Utils.createScopedLog("BlockedPageOnboardingRequiredView");class p{constructor(){a("constructor","Constructing view",null,"DEBUG")}init(){a("init","Initializing view",null,"DEBUG");var e=new m(h);document.body.innerHTML=e.render();const n=i.Settings.get("hasAcceptedToS");this.setVisible("tosMessage",!n),this.setVisible("privacyPolicyMessage",n),i.StayFocusd.localizeHTML(document),this.bindUIHandlers()}setVisible(e,n){const s=document.getElementById(e);s&&(n?s.classList.remove("hidden"):s.classList.add("hidden"))}bindUIHandlers(){a("bindUIHandlers","Binding UI handlers",null,"TRACE"),document.querySelectorAll(".btn").forEach(e=>{e.addEventListener("click",()=>{d.publish("BlockedPageOnboardingRequired.button.clicked",{id:e.id})})}),i.Analytics.bindHtmlEvents()}}var o=i.Utils.createScopedLog("BlockedPageOnboardingRequiredController");class v{constructor(){l(this,"view",null);o("constructor","Constructing controller",null,"DEBUG"),this.view=new p}async init(){o("init","Initializing controller",null,"DEBUG"),await Promise.all([i.Settings.initAsync(),i.Requirements.init()]),this.addListeners(),this.view.init()}addListeners(){o("addListeners","Adding listeners",null,"TRACE"),d.listen("BlockedPageOnboardingRequired.button.clicked",async(e,{id:n})=>{switch(n){case"btnDismiss":i.Analytics.event("CLICK_BLOCKED_PAGE_ACTION_REQUIRED_DISMISS"),await this.dismiss();break;case"btnOpenSettings":i.Analytics.event("CLICK_BLOCKED_PAGE_ACTION_REQUIRED_OPEN_SETTINGS"),await i.Chrome.Tab.create({url:g.runtime.getURL("/options.html"),active:!0}),await this.dismiss();break}})}async dismiss(){await i.Requirements.setPromptAgainAt(Date.now()+5*u),window.parent.postMessage("BlockedPageOnboardingRequired.dismiss","*")}}Promise.all([i.Bugsnag.init("blocked-page-onboarding-required"),i.Settings.initAsync(),i.RemoteConfig.init(),i.Analytics.init()]).then(()=>{var t=new v;b(document).ready(function(){t.init()})});
//# sourceMappingURL=onboarding-required.js.map
