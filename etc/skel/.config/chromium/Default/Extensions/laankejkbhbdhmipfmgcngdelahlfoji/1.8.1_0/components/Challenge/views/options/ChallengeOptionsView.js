define(["core/Logger","core/CoreAPI","core/vendor/jquery.min","core/vendor/Brightline.min","core/vendor/text!components/Challenge/views/options/options.tpl","components/Challenge/ChallengeView"],function(Logger,API,$,Brightline,optionsTpl,ChallengeView){return class extends ChallengeView{setJQuery(jQuery){$=jQuery||$}inject($container){super.inject($container,this.render(optionsTpl))}render(tpl){tpl=new Brightline(tpl=tpl||"");return this.model.isRequired()&&tpl.set("checked",'checked="checked"'),tpl.set("customChallenge",this.model.getText()),tpl.set("minChallengeTextLength",this.model.minLength),tpl.render()}bindUIHandlers(){var self=this,$customChallenge=$("#customChallenge");$("input[name=setCustomChallenge]").click(function(){self.model.setText($customChallenge.val())}),$("#resetCustomChallenge").click(function(){self.model.resetText(),$customChallenge.val(self.model.getText(!0))}),$("#requireChallengeCheckbox").click(function(){self.setChallengeRequired($(this))})}setChallengeRequired(checkbox){checkbox.prop("checked")?confirm(API.Chrome.Translation.get("confirmRequireChallenge"))?this.model.setRequired(!0):checkbox.prop("checked",!1):this.model.setRequired(!1)}}});