define(["core/Logger"],function(Logger){return class{name=null;connections={};constructor(name){this.name=name,this.originator=name+": Layout"}inject(model,view){this.getContainer(view).html(view.render(model))}connect(view,$container){this.connections[view.getInstanceID()]=$container}getContainer(view){return this.connections[view.getInstanceID()]}}});