var v=Object.defineProperty;var y=(a,e,t)=>e in a?v(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var s=(a,e,t)=>(y(a,typeof e!="symbol"?e+"":e,t),t);import{B as f}from"../../Logger.js";import{A as n,P as o,c as P}from"../../CoreAPI.js";import{$ as A}from"../../jquery.js";import{B as C}from"../../Brightline.min.js";import"../../iconify-icon.js";const x=`<div class="bg-black bg-opacity-50 flex fixed inset-0 w-full h-full">
    <div class="onboarding m-auto bg-base-100 overflow-hidden flex flex-col rounded-xl">

        <div class="flex-1 overflow-y-auto">
            <div class="p-4 flex flex-col gap-4">
                <!-- Existing User Header -->
                <div class="flex flex-col gap-4" id="existingUserHeader">
                    <div class="image-container flex items-center justify-center p-4 gap-4 rounded bg-neutral">
                        <img class="logo-sf" src="{{extensionURL}}common/img/logo.svg" />
                        <iconify-icon width="32" class="text-base-content/70 mt-1" icon="fa:handshake-o"></iconify-icon>
                        <img class="logo-st" src="{{extensionURL}}common/img/sensortower-logo.svg"/>
                    </div>
                    <p class="text-base-content" data-i18n="onboardingExistingUserMessage"></p>
                    <div class="flex flex-wrap gap-2">
                        <div class="chip chip-accent" data-i18n="featureDailyReports"></div>
                        <div class="chip chip-secondary" data-i18n="featureFocusSchedules"></div>
                        <div class="chip chip-info" data-i18n="featureModernizedUI"></div>
                        <div class="chip chip-warning" data-i18n="featureDistractingCategories"></div>
                    </div>

                    <!-- Trusted By Alert -->
                    <div class="alert alert-info">
                        <iconify-icon width="30" class="ml-2" icon="mdi:check-decagram"></iconify-icon>
                        <p class="alert-title flex-1 font-medium" data-i18n="trusted22mlnUsers"></p>
                    </div>
                </div>

                <!-- New User Header -->
                <div class="flex flex-col gap-4" id="newUserHeader">
                    <div class="image-container flex items-center justify-center p-4 gap-4 rounded bg-neutral">
                        <img class="logo-sf" src="{{extensionURL}}common/img/logo.svg" />
                    </div>
                    <h1 class="text-base-content font-bold text-lg" data-i18n="onboardingNewUserTitle"></h1>
                    <p class="text-base-content" data-i18n="onboardingNewUserMessage"></p>
                </div>

                <!-- Confirm Privacy Policy Header -->
                <div class="flex flex-col gap-4" id="confirmPrivacyPolicyHeader">
                    <div class="image-container flex items-center justify-center p-4 gap-4 rounded bg-neutral">
                        <img class="logo-sf" src="{{extensionURL}}common/img/logo.svg" />
                    </div>
                    <h1 class="text-base-content font-bold text-lg" data-i18n="onboardingConfirmTitle"></h1>
                    <p class="text-base-content" data-i18n="onboardingConfirmMessage"></p>
                    <div class="flex flex-wrap gap-2">
                        <div class="chip chip-accent" data-i18n="featureDailyReports"></div>
                        <div class="chip chip-warning" data-i18n="featureDistractingCategories"></div>
                    </div>
                </div>

                <!-- Form Checkboxes -->
                <div class="flex flex-col gap-2 px-4">

                    <!-- Age -->
                    <div class="age-row flex gap-4 items-center" id="ageCheckbox">
                        <div class="flex items-start gap-3">
                            <input class="mt-1.5" type="checkbox" id="isAge18" checked="{{is18OrOlder}}" data-analytics-toggle="TOGGLE_ONBOARDING_AGE"></input>
                            <label class="cursor-pointer" for="isAge18">
                                <span data-i18n="iAm"></span>
                                <span data-i18n="ageOver18" id="ageOver18"></span>
                            </label>
                        </div>
                        <select class="select select-bordered select-xs" name="age" id="ageSelect">
                            <option value="under13" data-i18n="ageUnder13"></option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                        </select>
                    </div>
                    <p class="p-l-checkbox ml-6 mb-2" data-i18n="under18Message" id="under18Message"></p>


                    <!-- Terms of Service -->
                    <div class="flex items-start gap-3" id="acceptedToSCheckbox">
                        <input class="mt-1.5" type="checkbox" id="hasAcceptedToS" checked="{{hasAcceptedToS}}" data-analytics-toggle="TOGGLE_ONBOARDING_TOS"></input>
                        <label class="cursor-pointer" for="hasAcceptedToS" data-i18n="acceptStayFocusdToS"></label>
                    </div>
                    <p class="text-error p-l-checkbox ml-6 mb-2" data-i18n="declineToSMessage" id="declineToSMessage"></p>


                    <!-- Privacy Policy -->
                    <div class="flex items-start gap-3" id="acceptedPrivacyPolicyCheckbox">
                        <input class="mt-1.5" type="checkbox" id="hasAcceptedPrivacyPolicy" checked="{{hasAcceptedPrivacyPolicy}}" data-analytics-toggle="TOGGLE_ONBOARDING_PRIVACY_POLICY"></input>
                        <label class="cursor-pointer" for="hasAcceptedPrivacyPolicy" data-i18n="acceptStayFocusdPolicy"></label>
                    </div>
                    <div class="text-sm p-l-checkbox ml-6" id="privacyPolicySummary">
                        <p class="text-base-content" data-i18n="privatePolicyTitle"></p>
                        <ul list>
                            <li><span class="text-base-content" data-i18n="privatePolicyProps1"></span></li>
                            <li><span class="text-base-content" data-i18n="privatePolicyProps2"></span></li>
                            <li><span class="text-base-content" data-i18n="privatePolicyProps3"></span></li>
                            <li><span class="text-base-content" data-i18n="privatePolicyProps4"></span></li>
                            <li><span class="text-base-content" data-i18n="privatePolicyProps5"></span></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>

        <!-- Buttons -->
        <div class="px-4 py-2 w-full border-solid border-t-neutral-focus border-t bg-base-100 flex gap-2 shrink-0">
            <button class="btn btn-ghost inline-block" data-i18n="decline" id="btnDecline"></button>
            <div class="flex-1"></div>
            <button class="btn btn-outline btn-primary" data-i18n="askLater" id="btnAskLater"></button>
            <button class="btn btn-primary" data-i18n="continue" id="btnContinue"></button>
            <button class="btn btn-primary" data-i18n="continue" id="btnAccept"></button>
        </div>

    </div>
</div>
`;var l=n.Utils.createScopedLog("OnboardingView");const h="hidden",g="line-through";class O{constructor(e){s(this,"model",null);l("constructor","Constructing OnboardingView",null,"DEBUG"),this.model=e}init(){l("init","Initializing view",null,"DEBUG"),document.body.innerHTML=this.render(),n.StayFocusd.localizeHTML(document),this.bindUIHandlers(),this.rerender()}render(){l("render","Rendering view");var e=new C(x);return e.set("referrer",this.model.referrer),e.set("isExistingUser",this.model.isExistingUser),e.set("isModal",this.model.isModal),e.set("modalPosition",this.model.modalPosition),e.set("hasAcceptedToS",this.model.hasAcceptedToS),e.set("hasAcceptedPrivacyPolicy",this.model.hasAcceptedPrivacyPolicy),e.set("is18OrOlder",this.model.is18OrOlder),e.set("age",this.model.age),e.set("extensionURL",f.runtime.getURL("/")),e.render()}bindUIHandlers(){l("bindUIHandlers","Binding UI handlers",null,"TRACE"),document.querySelectorAll(".btn").forEach(e=>{e.addEventListener("click",()=>{o.publish("OnboardingView.button.clicked",{id:e.id})})}),document.querySelectorAll('input[type="checkbox"]').forEach(e=>{e.addEventListener("click",t=>{o.publish("OnboardingView.checkbox.checked",{id:e.id,isChecked:t.target.checked})})}),document.querySelectorAll("select").forEach(e=>{e.addEventListener("change",t=>{o.publish("OnboardingView.select.changed",{id:e.id,value:t.target.value})})}),n.Analytics.bindHtmlEvents()}rerender(){const{hasAcceptedToS:e,hasAcceptedPrivacyPolicy:t,is18OrOlder:i,age:u,isExistingUser:m,confirmationCount:d,isConfirmingPrivacy:b}=this.model,c=b?"confirm":m?"existing":"new";this.setVisible("newUserHeader",c==="new"),this.setVisible("existingUserHeader",c==="existing"),this.setVisible("confirmPrivacyPolicyHeader",c==="confirm"),this.setVisible("ageCheckbox",c!=="confirm"),this.setVisible("ageOver18",i),this.setChecked("isAge18",i),this.setVisible("ageUnder18Checkbox",!i),this.setVisible("ageSelect",!i),this.setValue("ageSelect",u),this.setVisible("acceptedToSCheckbox",c!=="confirm"),this.setDisabled("acceptedToSCheckbox",!i),this.setCrossOut("acceptedToSCheckbox",!i),this.setChecked("hasAcceptedToS",i&&e),this.setDisabled("hasAcceptedToS",!i),this.setVisible("declineToSMessage",!e&&i),this.setVisible("acceptedPrivacyPolicyCheckbox",!0),this.setDisabled("acceptedPrivacyPolicyCheckbox",!i),this.setCrossOut("acceptedPrivacyPolicyCheckbox",!i),this.setChecked("hasAcceptedPrivacyPolicy",i&&t),this.setDisabled("hasAcceptedPrivacyPolicy",!i),this.setVisible("under18Message",!i),this.setVisible("privacyPolicySummary",i),this.setVisible("btnDecline",c==="confirm"&&d>=2),this.setVisible("btnAskLater",c==="confirm"&&d<2),this.setVisible("btnContinue",!i),this.setVisible("btnAccept",i),this.setDisabled("btnAccept",!e||c==="confirm"&&!t)}setVisible(e,t){const i=document.getElementById(e);i&&(t?i.classList.remove(h):i.classList.add(h))}setCrossOut(e,t){const i=document.getElementById(e);i&&(t?i.classList.add(g):i.classList.remove(g))}setDisabled(e,t){const i=document.getElementById(e);i&&(t?i.setAttribute("disabled","true"):delete i.removeAttribute("disabled"))}setChecked(e,t){const i=document.getElementById(e);i&&(i.checked=t)}setValue(e,t){const i=document.getElementById(e);i&&(t!=null?i.value=t:i.removeAttribute("value"))}}const p=n.Utils.createScopedLog("OnboardingModel");class w{constructor(){s(this,"referrer",null);s(this,"hasAcceptedToS",null);s(this,"hasAcceptedPrivacyPolicy",null);s(this,"is18OrOlder",null);s(this,"age",null);s(this,"isExistingUser",null);s(this,"explicitlyDeclinedPrivacyPolicy",null);s(this,"shownCount",null);s(this,"confirmationCount",null);p("constructor","Constructing OnboardingModel",null,"DEBUG");const e=new URL(window.location.href).searchParams;this.referrer=e.get("referrer"),this.isExistingUser=!n.Settings.get("isNewUser"),this.hasAcceptedToS=n.Settings.get("hasAcceptedToS")??!0,this.hasAcceptedPrivacyPolicy=n.Settings.get("hasAcceptedPrivacyPolicy")??!0,this.is18OrOlder=n.Settings.get("is18OrOlder")??!0,this.age=n.Settings.get("age"),this.explicitlyDeclinedPrivacyPolicy=n.Settings.get("explicitlyDeclinedPrivacyPolicy"),this.isConfirmingPrivacy&&(this.hasAcceptedPrivacyPolicy=!0)}async init(){p("init","Initializing model",null,"DEBUG"),this.shownCount=await n.Requirements.getOnboardingShownCount(),this.confirmationCount=await n.Requirements.getConfirmationCount()}get isConfirmingPrivacy(){return n.Settings.get("hasAcceptedToS")!==!1&&n.Settings.get("hasAcceptedPrivacyPolicy")===!1}async incrementConfirmationCount(){await n.Requirements.incrementConfirmationCount(),this.confirmationCount++}}const r=n.Utils.createScopedLog("OnboardingController");class S{constructor(){s(this,"view",null);s(this,"model",null);r("constructor","Constructing OnboardingController",null,"DEBUG"),this.model=new w,this.view=new O(this.model)}async init(){r("init","Initializing controller",null,"DEBUG"),this.addListeners(),await n.Requirements.incrementOnboardingShownCount(),await this.model.init(),this.view.init(),this.event("ONBOARDING_STARTED",{referrer:this.model.referrer})}addListeners(){r("addListeners","Adding listeners",null,"TRACE"),o.listen("OnboardingView.button.clicked",(e,{id:t})=>{switch(t){case"btnAskLater":return this.onClickAskLater();case"btnContinue":return this.onClickContinue();case"btnDecline":return this.onClickDecline();case"btnAccept":return this.onClickAccept()}}),o.listen("OnboardingView.checkbox.checked",(e,{id:t,isChecked:i})=>{switch(t){case"isAge18":return this.onIs18OrOlderChecked(i);case"hasAcceptedToS":return this.onAcceptToSChecked(i);case"hasAcceptedPrivacyPolicy":return this.onAcceptPrivacyPolicyChecked(i)}}),o.listen("OnboardingView.select.changed",(e,{id:t,value:i})=>{switch(t){case"ageSelect":return this.onChangeAge(i)}})}dismiss(){window.parent.postMessage("OnboardingOverlay.dismiss","*")}async saveModel(){await n.Settings.setAsync({is18OrOlder:this.model.is18OrOlder,age:this.model.age,hasAcceptedToS:this.model.hasAcceptedToS,hasAcceptedPrivacyPolicy:this.model.hasAcceptedPrivacyPolicy,explicitlyDeclinedPrivacyPolicy:this.model.explicitlyDeclinedPrivacyPolicy})}async declineOnboarding(){this.model.hasAcceptedPrivacyPolicy=!1,this.model.explicitlyDeclinedPrivacyPolicy=!0,await this.saveModel(),await this.event("ONBOARDING_COMPLETE",{acceptedAll:!1}),this.dismiss()}async onClickContinue(){await this.event("CLICK_ONBOARDING_CONTINUE"),await this.declineOnboarding()}async onClickDecline(){await this.event("CLICK_ONBOARDING_DECLINE"),await this.model.incrementConfirmationCount(),await this.declineOnboarding()}async onClickAskLater(){await this.event("CLICK_ONBOARDING_ASK_LATER"),await this.model.incrementConfirmationCount(),await n.Requirements.setPromptAgainAt(Date.now()+3*P),this.dismiss()}async onClickAccept(){await this.saveModel(),this.model.hasAcceptedPrivacyPolicy&&(await this.event("ONBOARDING_ACCEPTED_ALL"),await this.event("ONBOARDING_COMPLETE",{acceptedAll:!0})),this.model.isConfirmingPrivacy?(await this.event("CLICK_ONBOARDING_ACCEPT_CONFIRM_PRIVACY"),this.model.hasAcceptedPrivacyPolicy=!0,this.view.rerender()):(await this.event("CLICK_ONBOARDING_ACCEPT_TOS"),this.dismiss())}onChangeAge(e){this.model.age=e==="under13"?null:Number(e),this.view.rerender()}onIs18OrOlderChecked(e){this.model.is18OrOlder=e,this.model.hasAcceptedToS=e,this.model.hasAcceptedPrivacyPolicy=e,this.model.age=e?null:17,this.view.rerender()}onAcceptToSChecked(e){this.model.hasAcceptedToS=e,this.view.rerender()}onAcceptPrivacyPolicyChecked(e){this.model.hasAcceptedPrivacyPolicy=e,this.view.rerender()}async event(e,t){try{await n.Analytics.event(e,{shownCount:this.model.shownCount,confirmationCount:this.model.confirmationCount,isConfirmingPrivacy:this.model.isConfirmingPrivacy,...t})}catch{}}}async function k(){await n.Settings.initAsync(),await Promise.all([n.Bugsnag.init("onboarding"),n.RemoteConfig.init(),n.Analytics.init()]);const a=new S;A(document).ready(function(){a.init()})}k().catch(a=>{n.Bugsnag.notify(a)});
//# sourceMappingURL=onboarding.js.map
