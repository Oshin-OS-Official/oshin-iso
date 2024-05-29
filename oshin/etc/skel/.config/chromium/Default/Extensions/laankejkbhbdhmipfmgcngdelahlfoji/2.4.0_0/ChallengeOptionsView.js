import{L as o}from"./Logger.js";import{A as r}from"./CoreAPI.js";import{B as h}from"./Brightline.min.js";import c from"./ChallengeView.js";import{$ as g}from"./jquery.js";const u=`<h1>
    Require Challenge
</h1>
<div>
    <p id="requireChallengeMsg" class="attention"></p>
    <p>
        If this option is selected, you will be required to complete a difficult -- but not impossible -- challenge before you are allowed to change any settings.
        This makes it inconvenient for you to change settings, therefore reducing the chances that you'll cheat.
    </p>
    <p>
        <i>Want to test the challenge before you turn it on? <a href="#" class="link link-accent" id="showChallenge">Click here</a>.</i>
    </p>
    <label class="pl-1 flex gap-3 items-center">
        <input type="checkbox" id="requireChallengeCheckbox" class="checkbox checkbox-sm checkbox-primary" {{checked}}>
        <span>Yes, I want to be challenged before being allowed to change any settings (including this one).</span>
    </label>
    <h4>
        Customize Challenge Text
    </h4>
    <p>
        Enter custom text to be used in the challenge (min {{minChallengeTextLength}} chars).
    </p>
    <textarea id="customChallenge" class="textarea textarea-bordered w-full h-40">{{customChallenge}}</textarea>
    <p>
        <input type="button" class="btn btn-primary btn-sm" name="setCustomChallenge" value="Set custom text">&#160;
        <input type="button" class="btn btn-ghost btn-sm" id="resetCustomChallenge" value="Reset to default">
    </p>
    <p>
        <small class="disclaimer">BE WARNED: If you enter something really long and difficult, you will have to complete the challenge with that text before you can change it.</small>
    </p>
</div>
`;let n;var l=function(i,e,t,a,s){o.log(i+"."+e,t,a,s)};class b extends c{setJQuery(e){l(this.originator,"setJQuery","Setting jQuery"),n=e||g}inject(e){super.inject(e,this.render(u))}render(e){l(this.originator,"render","Rendering view"),e=e||"";var t=new h(e);return this.model.isRequired()&&t.set("checked",'checked="checked"'),t.set("customChallenge",this.model.getText()),t.set("minChallengeTextLength",this.model.minLength),t.render()}bindUIHandlers(){l(this.originator,"bindUIHandlers","Binding UI handlers",null,"TRACE");var e=this,t=n("#customChallenge");n("input[name=setCustomChallenge]").click(function(){e.model.setText(t.val())}),n("#resetCustomChallenge").click(function(){e.model.resetText(),t.val(e.model.getText(!0))}),n("#requireChallengeCheckbox").click(function(){e.setChallengeRequired(n(this))})}setChallengeRequired(e){if(l(this.originator,"setChallengeRequired","Setting challenge required",e.prop("checked")?"ON":"OFF"),e.prop("checked")){var t=confirm(r.Chrome.Translation.get("confirmRequireChallenge"));t?this.model.setRequired(!0):e.prop("checked",!1)}else this.model.setRequired(!1)}}export{b as default};
//# sourceMappingURL=ChallengeOptionsView.js.map
