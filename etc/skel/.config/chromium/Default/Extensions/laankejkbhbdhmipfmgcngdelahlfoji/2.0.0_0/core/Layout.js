define(["core/Logger"],function(Logger){function log(funcName,message,payload,level){Logger.log("Layout."+funcName,message,payload,level)}return class{name=null;connections={};constructor(name){this.name=name,this.originator=name+": Layout"}inject(model,view){log("inject","Injecting "+view.getClassName()+" view into "+this.name+" layout"),this.getContainer(view).html(view.render(model))}connect(view,$container){this.connections[view.getInstanceID()]=$container}getContainer(view){return this.connections[view.getInstanceID()]}}});