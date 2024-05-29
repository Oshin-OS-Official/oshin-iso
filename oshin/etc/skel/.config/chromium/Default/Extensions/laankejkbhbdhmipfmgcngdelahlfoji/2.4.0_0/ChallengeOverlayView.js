var h=Object.defineProperty;var c=(l,t,e)=>t in l?h(l,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[t]=e;var a=(l,t,e)=>(c(l,typeof t!="symbol"?t+"":t,e),e);import{L as g}from"./Logger.js";import{A as s}from"./CoreAPI.js";import{B as u}from"./Brightline.min.js";import m from"./ChallengeView.js";import{$ as b}from"./jquery.js";const y=`<div id="challenge-overlay" class="p-4 prose bg-white rounded-md">
    <div class="not-prose flex justify-between items-center">
        <h1 class="text-stylized text-2xl font-medium">Challenge</h1>
        <button class="btn btn-sm btn-circle btn-ghost" data-close>
            <iconify-icon icon="mdi:close" width="20" height="20" />
        </button>
    </div>
    <p class="instructions">
        In order to change your settings, you'll have to pass this challenge first. You must re-type the paragraph below, letter for letter, <b>without making a single typo</b>. If you make a typo, or hit the backspace or delete key, everything you typed will be cleared, and you'll have to start again.
    </p>
    <fieldset class="border border-solid border-base-300 p-2 mb-4 rounded-md">
        <legend class="border border-solid border-base-300 px-2 py-1 rounded-md">Re-type the text below</legend>
        <div id="challengeSource" class="h-1/4 overflow-y-auto">{{text}}</div>
    </fieldset>
    <textarea id="challengeText" class="textarea textarea-bordered w-full h-40" />
    <div class="flex justify-between not-prose items-center mt-4 gap-4 flex-wrap">
        <button class="btn btn-sm btn-secondary" data-close>Nevermind, I give up</button>
        <a id="productivityBypass" class="btn btn-sm btn-outline text-right gap-2">
            <span>Let me access <i>limited</i> settings so I can be more productive</span>
            <iconify-icon icon="mdi:arrow-right" width="20" height="20" />
        </a>
    </div>
</div>
`;let o;var i=function(l,t,e,n,r){g.log(l+"."+t,e,n,r)};class k extends m{constructor(){super(...arguments);a(this,"lastKeyDown",0)}setJQuery(e){i(this.originator,"setJQuery","Setting jQuery"),o=e||b}inject(e){super.inject(e,this.render(y));var n=this;s.PubSub.listen("ChallengeModel.text.set",function(){o("#challengeSource").html(n.model.getText())})}render(e){i(this.originator,"render","Rendering view"),e=e||"";var n=new u(e);return n.set("text",this.model.getText()),n.render()}bindUIHandlers(){i(this.originator,"bindUIHandlers","Binding UI handlers",null,"TRACE");var e=this,n=o("#challengeText"),r=o("#challenge-overlay *[data-close]"),d=o("#productivityBypass");r.click(this.onCloseClicked.bind(this)),d.click(e.model.setProductivityBypass.bind(e.model)),n.keydown(this.onKeyDown.bind(this)),n.on("input",function(){e.onInput(o(this).val())})}onCloseClicked(){s.Chrome.Tab.getSelected(null,function(e){s.Chrome.Tab.remove(e.id)})}onKeyDown(e){this.lastKeyDown=e.keyCode}onInput(e){if(e.length-this.model.getKeyCounter()>1)return alert(s.Chrome.Translation.get("numberOfKeysDoesNotMatch")),this.resetChallenge(),!1;if(this.model.updateKeyCounter(e.length),!this.model.isCorrect(e,this.lastKeyDown===229?-1:0))return alert(s.Chrome.Translation.get("madeAMistake")),this.resetChallenge(),!1;this.model.isComplete(e)&&(o.modal.close(),this.resetChallenge(),s.PubSub.publish("Challenge.complete"))}resetChallenge(){i(this.originator,"resetChallenge","Resetting challenge");var e=o("#challengeText");e.val(""),e.focus(),this.model.resetKeyCounter()}}export{k as default};
//# sourceMappingURL=ChallengeOverlayView.js.map
