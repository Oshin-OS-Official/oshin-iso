var C=Object.defineProperty;var T=(a,e,t)=>e in a?C(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var d=(a,e,t)=>(T(a,typeof e!="symbol"?e+"":e,t),t);import{L as v,B as f}from"../../Logger.js";import{U as P,P as o,A as s,M as A,D as k,b as L}from"../../CoreAPI.js";import{$ as i}from"../../jquery.js";import{B as y}from"../../Brightline.min.js";import{B as E}from"../../BasePrompt.js";import"../../iconify-icon.js";const S=`<!-- Logo & Close -->
<header class="flex justify-between items-center gap-4 px-4 py-2 h-12">

  <div class="flex justify-start items-center gap-4">
    <img
      class="h-8"
      src="/common/img/logo.svg"
      title="StayFocusd"
      alt="StayFocusd"
    />
    <!--  Add a switch html-->
    <div id="active-toggle-container">
      <label class='switch switch-primary'>
        <input type='checkbox' class='toggle toggle-sm toggle-primary' id='active-toggle' checked />
      </label>
    </div>
  </div>
  <a
    class="close uppercase text-xs link link-primary link-hover font-medium"
    href="#"
    data-i18n="close"
    >Close</a
  >
</header>

<hr class="h-px border-neutral-focus p-0 m-0" />

<section class="activated-section flex gap-4 px-4 py-2 w-max min-w-[100%]">
  <!-- Current website -->
  <div class="flex-1 flex flex-col">
    <p
      class="text-sm opacity-50"
      data-i18n="currentlyOn"
    >
      You are currently on:
    </p>
    <p class="text-lg font-bold truncate">{{baseDomain}}</p>
    <p
      id="status-msg"
      class="mt-2 text-sm font-medium hidden"
    ></p>
    <div id="addWebsiteToGroup">
      <a
        id="block-entire"
        class="mt-2 link link-secondary link-hover text-sm"
        href="#"
        title="Block all pages on this site"
        data-analytics-click="CLICK_POPUP_BLOCK_ENTIRE_SITE"
      >
        <strong data-i18n="block">Block</strong>
        <span data-i18n="thisEntireSite">this entire site</span>
      </a>
      <p class="text-sm opacity-50">
        The entire site will be added to
        <strong><span id="groupName">Default</span> group</strong>
      </p>
    </div>
    <a
      id="show-advanced-options"
      class="mt-1 link link-hover text-sm"
      href="#"
      data-i18n="advancedOptions"
    >
      Advanced options
    </a>
  </div>

  <!-- Timer -->
  <div
    id="timer-container"
    class="rounded self-center px-3 py-2 text-right"
  >
    <div
      id="group-timer"
      class="hidden"
    >
      <p id="group-label" class="uppercase text-xs opacity-50 whitespace-nowrap">Group</p>
      <p
        id="group-name"
        data-i18n="loading"
        class="text-xl text-primary font-bold"
      >
        Loading...
      </p>
    </div>
    <p
      id="timer-label"
      data-i18n="timeRemaining"
      class="uppercase text-xs opacity-50 whitespace-nowrap"
    >
      Time Remaining
    </p>
    <div class="flex items-baseline gap-2 justify-end">
      <p
        id="display-timer"
        data-i18n="loading"
        class="text-2xl text-primary font-bold"
      >
        Loading...
      </p>
    </div>
  </div>
</section>

<!-- Advanced -->
<section
  id="advanced-options"
  class="px-4 pb-4 space-y-1"
  style="display: none"
>
  <a
    id="allow-entire"
    class="block link link-hover link-accent text-sm"
    href="#"
    data-allow
  >
    <b data-i18n="allow">Allow</b>
    <span data-i18n="thisEntireSite">this entire site</span>
  </a>
  <a
    id="only-allow"
    class="block link link-hover link-accent text-sm"
    style="display: none"
    href="#"
    data-allow
  >
    <span data-i18n="onlyAllowPagesOn">Only allow pages on</span>
    <strong>{{fullDomain}}</strong>
  </a>
  <a
    id="only-block"
    class="block link link-hover link-secondary text-sm"
    style="display: none"
    href="#"
  >
    <span data-i18n="onlyBlockPagesOn">Only block pages on</span>
    <strong class="full-domain">{{fullDomain}}</strong>
  </a>

  <div class="bg-neutral px-4 py-3 rounded">
    <label class="form-control">
      <p>
        <span
          class="text-sm"
          data-i18n="enterCustomURL"
        >
          Enter a custom url
        </span>
      </p>
      <input
        id="custom-url"
        class="input input-bordered input-sm my-1"
        type="text"
        value=""
      />
    </label>
    <div class="flex gap-2">
      <a
        id="block-custom"
        class="link link-hover link-secondary text-sm"
        href="#"
        data-i18n="blockCustomURL"
      >
        Block custom url
      </a>
      <p
        class="text-neutral-content text-opacity-50"
        data-allow
      >
        &bull;
      </p>
      <a
        id="allow-custom"
        class="link link-hover link-accent text-sm"
        href="#"
        data-i18n="allowCustomURL"
        data-allow
      >
        Allow custom url
      </a>
    </div>
  </div>
</section>

<section
  class='deactivated-section flex flex-col flex-1 items-center justify-center gap-2 px-4 py-4 w-max min-w-[100%] min-h-[120px]'>
  <h1
    class='font-bold text-center'
    data-i18n='deactivatedTitle'>

  </h1>
  <p
    class='opacity-50 text-center'
    data-i18n='deactivatedText'
  >
  </p>

  <iconify-icon
    id="power-icon"
    class='icon-6xl cursor-pointer hover:text-primary text-base-content/50'
    icon='mdi:power'
    width='64'
    height='64' />

</section>

<hr class="activated-section h-px border-neutral-focus p-0 m-0" />

<footer class="activated-section flex items-center py-2 px-4 gap-1 justify-between">
  <a
    id="show-nuclear-option"
    class="link link-hover text-sm flex items-center gap-1"
    href="#"
  >
    <img
      class="inline w-4 h-4 shrink-0"
      src="/common/img/icon-nuclear-16.png"
      alt="Nuclear Option"
      id="nuclearOptionIcon"
    />
    <span data-i18n="nuclearOption">Nuclear</span>
  </a>
  <p class="text-neutral-focus">&bull;</p>
    <a
            id="show-dashboard"
            class="link link-hover text-sm"
            href="#"
            data-i18n="dashboard"
    >
        Dashboard
    </a>
    <p class="text-neutral-focus">&bull;</p>
  <a
    id="show-options"
    class="link link-hover text-sm"
    href="#"
    data-i18n="settings"
  >
    Settings
  </a>
  <p class="text-neutral-focus">&bull;</p>
  <a
    id="show-help"
    class="link link-hover text-sm"
    href="#"
    data-i18n="helpFAQ"
  >
    Help/FAQ
  </a>
  <p class="text-neutral-focus">&bull;</p>
  <a
    class="link link-hover link-accent text-sm"
    href="https://discord.com/invite/33kpwusY6Y"
    target="_blank"
    data-i18n="joinDiscord"
  >
    Discord
  </a>
</footer>
`,c=P.createScopedLog("PopupView"),p="Default";class D{constructor(e){d(this,"model",null);c("constructor","Constructing PopupView",null,"DEBUG"),this.model=e,o.listen("Popup.timer.tick",this.updateDisplayTimer.bind(this))}init(){c("init","Initializing view",null,"DEBUG"),this.inject(),this.addListeners()}render(){c("render","Rendering view");const e=new y(S);return e.set("baseDomain",this.model.baseDomain),e.set("fullDomain",this.model.fullDomain),e.render()}inject(){var e,t,n,l;c("inject","Injecting view"),i("body").append(this.render()),this.model.fullDomain!==this.model.baseDomain&&i("#only-allow, #only-block").show(),s.Settings.get("hideAllowSiteLink")?i("*[data-allow]").hide():i("#allow-entire").show(),this.toggleActivated(s.StayFocusd.activated()),this.updateActiveSwitch(s.StayFocusd.isActivateSwitchShown()),this.model.isBlockAllWebsites&&((e=document.getElementById("addWebsiteToGroup"))==null||e.classList.add("hidden"),(t=document.getElementById("only-block"))==null||t.classList.add("hidden"),(n=document.getElementById("block-custom"))==null||n.classList.add("hidden")),s.BlockedGroupsRepository.isBlockable(this.model.baseDomain)&&((l=document.getElementById("addWebsiteToGroup"))==null||l.classList.add("hidden")),s.StayFocusd.localizeHTML(document),this.bindUIHandlers()}bindUIHandlers(){c("bindUIHandlers","Binding UI handlers",null,"TRACE"),i("#show-help").click(function(){o.publish("PopupView.button.clicked",{button:"help"})}),i("#show-options").click(function(){o.publish("PopupView.button.clicked",{button:"options"})}),i("#show-nuclear-option").click(function(){o.publish("PopupView.button.clicked",{button:"nuclearOption"})}),i("#show-dashboard").click(function(){o.publish("PopupView.button.clicked",{button:"dashboard"})}),i("a.close").click(function(){o.publish("PopupView.button.clicked",{button:"close"})}),i("#showBlockedSitesOptions").click(function(){o.publish("PopupView.button.clicked",{button:"blockedSites"})}),i("#show-advanced-options").click(function(){i("#advanced-options").slideToggle("fast")}),i("#block-entire").click(()=>{o.publish("PopupView.button.clicked",{button:"addToList",domain:this.model.baseDomain,listType:"black",groupName:this.model.groupName??p})}),i("#block-custom").click(()=>{o.publish("PopupView.button.clicked",{button:"addToList",domain:i("#custom-url").val(),listType:"black",groupName:this.model.groupName??p})}),i("#allow-custom").click(()=>{o.publish("PopupView.button.clicked",{button:"addToList",domain:i("#custom-url").val(),listType:"white"})}),i("#allow-entire").click(()=>{o.publish("PopupView.button.clicked",{button:"addToList",domain:this.model.baseDomain,listType:"white"})}),i("#only-block").click(()=>{o.publish("PopupView.button.clicked",{button:"addToList",domain:this.model.fullDomain,listType:"black",groupName:this.model.groupName??p})}),i("#only-allow").click(()=>{o.publish("PopupView.button.clicked",{button:"addToList",domain:this.model.fullDomain,listType:"white"})}),i("#active-toggle").change(function(e){o.publish("PopupView.button.clicked",{button:"toggle",value:e.target.checked})}),i("#power-icon").click(()=>{o.publish("PopupView.button.clicked",{button:"toggle",value:!0})}),s.Analytics.bindHtmlEvents()}addListeners(){c("addListeners","Adding listeners",null,"TRACE"),o.listen("*.domain.added",(e,t)=>{this.showAddToListStatus(t.success)}),o.listen("PopupModel.timer.updated",(e,t)=>{this.updateDisplayTimer(t.timer)}),o.listen("PopupModel.toggled",(e,t)=>{this.toggleActivated(t.value)})}showAddToListStatus(e){c("showAddToListStatus",'Showing "add to list" status',e?"SUCCESS":"ERROR","DEBUG"),e===!0?(i("#status-msg").removeClass("text-error").addClass("text-success").html(s.Chrome.Translation.get("success").toUpperCase()+"!"),setTimeout(function(){window.close()},1500)):(i("#status-msg").removeClass("text-success").addClass("text-error").html(s.Chrome.Translation.get("error").toUpperCase()),setTimeout(function(){i("#status-msg").hide()},2e3)),i("#status-msg").show()}toggleActivated(e){i("#active-toggle").prop("checked",e),e?(i(".activated-section").removeClass("hidden"),i(".deactivated-section").addClass("hidden")):(i(".activated-section").addClass("hidden"),i(".deactivated-section").removeClass("hidden"))}updateActiveSwitch(e){e||i("#active-toggle-container").hide()}updateDisplayTimer(e){let t="";const n=i("#display-timer"),l=i("#group-name"),x=i("#group-label"),g=i("#group-timer"),b=i("#nuclearRemainingIcon"),w=i("#timer-container");e.nuclear?(w.addClass("bg-slate-900 text-yellow-300"),n.addClass("text-yellow-300"),l.addClass("text-yellow-300"),b.removeClass("hidden"),t=e.time,g.removeClass("hidden"),x.text(s.Chrome.Translation.get("activeOption")),l.html(s.Chrome.Translation.get("nuclear"))):(w.addClass("bg-neutral text-neutral-content"),n.addClass("text-primary"),l.addClass("text-primary"),b.addClass("hidden"),this.model.isActive()===!1?t=s.Chrome.Translation.get("inactive"):this.model.isBlockAllWebsites==!0?t=e.time:(g.removeClass("hidden"),t=e.time,this.model.groupName=e.groupName,t==="00:00:00"&&n.addClass("expired"),l.html(this.model.groupName))),this.model.groupName!=null&&(document.getElementById("groupName").innerText=this.model.groupName),c("updateDisplayTimer","Updating display timer: "+t,null,"DEBUG"),n.html(t)}}var u=function(a,e,t,n){v.log("PopupModel."+a,e,t,n)};class U{constructor(){d(this,"url",null);d(this,"timer",null);d(this,"status",null);d(this,"fullDomain",null);d(this,"baseDomain",null);d(this,"isBlockAllWebsites",null);d(this,"groupName",null);d(this,"port",null);u("constructor","Constructing PopupModel",null,"DEBUG"),this.status="INACTIVE",this.isBlockAllWebsites=s.Settings.get("isBlockAllWebsites"),this.port=chrome.runtime.connect({name:"popup"})}async init(){u("init","Initializing model",null,"DEBUG"),await this.getCurrentUrl();var e=this;this.port.onMessage.addListener(function({message:t,payload:n}){const l=new A(t);return t==="StayFocusd.timer.updated"?(e.updateTimer(n.displayTimer),o.publish("PopupModel.timer.updated",{timer:n.displayTimer})):l.matches("*.domain.added.*")?o.publish("PopupController.domain.added",{success:n.success}):l.matches("StayFocusd.toggled.*.*")&&o.publish("PopupModel.toggled",n),!0})}async getCurrentUrl(){return new Promise((e,t)=>{try{chrome.tabs.query({active:!0,currentWindow:!0},function(n){e(n[0].url)})}catch(n){t(n)}}).then(e=>{this.url=e,this.fullDomain=k.extractFullDomain(this.url),this.baseDomain=k.extractBaseDomain(this.url)})}updateTimer(e){u("updateTimer","Updating timer",e,"TRACE"),this.timer=e,this.updateStatus()}updateStatus(){var e=this.status;s.NuclearOption.isActive()?this.status="NUCLEAR":s.StayFocusd.isActive()===!1?this.status="INACTIVE":this.status="ACTIVE",this.status!==e&&u("updateStatus","Updating status",this.status)}isActive(){return this.status==="ACTIVE"}isNuclear(){return this.status==="NUCLEAR"}}var r=function(a,e,t,n){v.log("PopupController."+a,e,t,n)};const B=L();class I{constructor(){d(this,"view",null);d(this,"model",null);r("constructor","Constructing PopupController",null,"DEBUG"),this.model=new U,this.view=new D(this.model)}async init(){r("init","Initializing controller",null,"DEBUG"),this.addListeners(),await this.model.init(),this.view.init(),B.hideBadge(),new E().init()}addListeners(){r("addListeners","Adding listeners",null,"TRACE");var e=this;o.listen("PopupView.button.clicked",async function(t,n){switch(n.button){case"help":case"options":e.openPage(n.button);break;case"nuclearOption":case"blockedSites":case"dashboard":e.openPage("options",n.button);break;case"close":window.close();break;case"toggle":if(!n.value){e.openPage("options","dashboard","toggle=true");break}e.toggle(n.value);break;case"addToList":e.addToList(n.domain,n.groupName,n.listType);break}})}openPage(e,t,n){var l=f.runtime.getURL(e+".html")+(n?"?"+n:"")+(t?"#"+t:"");r("openPage","Opening page",l),s.Chrome.Tab.create({url:l})}addToList(e,t,n){if(r("addToList","Adding "+e+" to "+n+"list"),e!==""){var l=n==="black"?"BLACKLIST":"WHITELIST";this.model.port.postMessage({message:"PopupController.domain.add."+l,payload:{domain:e,groupName:t}})}}toggle(e){r("toggle","Toggling extension",null,"TRACE"),this.model.port.postMessage({message:"PopupController.toggle",payload:{value:e}})}}const R=`<div class="flex flex-col gap-4 fixed inset-0 justify-center p-4 px-8 bg-base-100">
    <h1 data-i18n="required" class="text-lg font-bold"></h1>
    <p id="tosMessage" data-i18n="tosHaveChanged" class="text-base"></p>
    <p id="privacyPolicyMessage" data-i18n="onboardingConfirmMessage" class="text-base"></p>
    <button id="btnOpenSettings" class="btn btn-primary" data-i18n="openSettings" target="_blank"></button>
</div>
`;var m=s.Utils.createScopedLog("PopupOnboardingRequiredView");class O{constructor(){m("constructor","Constructing PopupOnboardingRequiredView",null,"DEBUG")}init(){m("init","Initializing view",null,"DEBUG");var e=new y(R);document.body.innerHTML+=e.render();const t=s.Settings.get("hasAcceptedToS");this.setVisible("tosMessage",!t),this.setVisible("privacyPolicyMessage",t),s.StayFocusd.localizeHTML(document),this.bindUIHandlers()}setVisible(e,t){const n=document.getElementById(e);n&&(t?n.classList.remove("hidden"):n.classList.add("hidden"))}bindUIHandlers(){m("bindUIHandlers","Binding UI handlers",null,"TRACE"),document.querySelectorAll(".btn").forEach(e=>{e.addEventListener("click",()=>{o.publish("PopupOnboardingRequired.button.clicked",{id:e.id})})}),s.Analytics.bindHtmlEvents()}}var h=s.Utils.createScopedLog("PopupOnboardingRequiredController");class N{constructor(){d(this,"view",null);h("constructor","Constructing PopupOnboardingRequiredController",null,"DEBUG"),this.view=new O}async init(){h("init","Initializing controller",null,"DEBUG"),await Promise.all([s.Settings.initAsync(),s.Requirements.init()]),this.mountView()}async mountView(){await s.Requirements.isOnboardingCompleted()||(s.Analytics.event("SHOW_POPUP_ACTION_REQUIRED"),this.view.init(),this.addListeners())}addListeners(){h("addListeners","Adding listeners",null,"TRACE"),o.listen("PopupOnboardingRequired.button.clicked",async(e,{id:t})=>{switch(t){case"btnOpenSettings":s.Analytics.event("CLICK_POPUP_ACTION_REQUIRED_OPEN_SETTINGS"),await s.Chrome.Tab.create({url:f.runtime.getURL("/options.html"),active:!0}),await this.dismiss();break}})}}s.Settings.init(function(){var a=new I,e=new N;i(document).ready(function(){s.Bugsnag.init("popup"),s.Analytics.init(),s.BlockedGroupsRepository.init(),a.init(),e.init()})});
//# sourceMappingURL=popup.js.map
