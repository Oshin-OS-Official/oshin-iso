define(["core/Bugsnag"],function(Bugsnag){return{log:function(funcName,message,payload,level){payload=payload||"",message="["+funcName+"()] "+message,"ERROR"===(level=level?level.toUpperCase():"INFO")?Bugsnag.notifyError(...arguments):"WARN"===level?(Bugsnag.logBreadcrumb(...arguments),Bugsnag.notifyWarning(...arguments)):Bugsnag.logBreadcrumb(...arguments)}}});