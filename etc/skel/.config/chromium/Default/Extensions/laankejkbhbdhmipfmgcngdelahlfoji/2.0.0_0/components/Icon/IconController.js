define(["core/Logger"],function(Logger){function log(originator,funcName,message,payload,level){Logger.log(originator+"."+funcName,message,payload,level)}return class{view=null;model=null;init(){log(this.originator,"init","Initializing controller",null,"DEBUG")}initAPI(API){log(this.originator,"initAPI","Initializing API",null,"DEBUG"),API.mixin("Icon",{hideBadge:this.view.hideBadge.bind(this.view),setIcon:this.view.setIcon.bind(this.view),showBadge:this.view.showBadge.bind(this.view)})}}});