define(["core/Logger","core/CoreAPI","core/vendor/jquery.min","core/vendor/Brightline.min","core/vendor/text!components/Challenge/views/overlay/overlay.tpl","components/Challenge/ChallengeView"],function(Logger,API,$,Brightline,overlayTpl,ChallengeView){function log(originator,funcName,message,payload,level){Logger.log(originator+"."+funcName,message,payload,level)}return class extends ChallengeView{lastKeyDown=0;setJQuery(jQuery){log(this.originator,"setJQuery","Setting jQuery"),$=jQuery||$}inject($container){super.inject($container,this.render(overlayTpl));var self=this;API.PubSub.listen("ChallengeModel.text.set",function(message,payload){$("#challengeSource").html(self.model.getText())})}render(tpl){log(this.originator,"render","Rendering view");tpl=new Brightline(tpl=tpl||"");return tpl.set("text",this.model.getText()),tpl.render()}bindUIHandlers(){log(this.originator,"bindUIHandlers","Binding UI handlers",null,"TRACE");var self=this,$challengeText=$("#challengeText"),$close=$("a.close"),$productivityBypass=$("#productivityBypass");$close.click(this.onCloseClicked.bind(this)),$productivityBypass.click(self.model.setProductivityBypass.bind(self.model)),$challengeText.keydown(this.onKeyDown.bind(this)),$challengeText.on("input",function(){self.onInput($(this).val())})}onCloseClicked(){API.Chrome.Tab.getSelected(null,function(tab){API.Chrome.Tab.remove(tab.id)})}onKeyDown(e){this.lastKeyDown=e.keyCode}onInput(inputText){return 1<inputText.length-this.model.getKeyCounter()?(alert(API.Chrome.Translation.get("numberOfKeysDoesNotMatch")),this.resetChallenge(),!1):(this.model.updateKeyCounter(inputText.length),this.model.isCorrect(inputText,229===this.lastKeyDown?-1:0)?void(this.model.isComplete(inputText)&&($.modal.close(),this.resetChallenge())):(alert(API.Chrome.Translation.get("madeAMistake")),this.resetChallenge(),!1))}resetChallenge(){log(this.originator,"resetChallenge","Resetting challenge");var $challengeText=$("#challengeText");$challengeText.val(""),$challengeText.focus(),this.model.resetKeyCounter()}}});