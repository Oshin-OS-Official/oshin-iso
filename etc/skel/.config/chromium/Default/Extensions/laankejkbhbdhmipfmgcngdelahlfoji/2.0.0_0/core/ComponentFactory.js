define(function(){function log(funcName,message,payload,level){Logger.log("ComponentFactory."+funcName,message,payload,level)}var _components={},_instances={};return{initAPI:function(API){API.mixin("Component",{load:this.load.bind(this),loadAsync:this.loadAsync.bind(this),get:this.get.bind(this),getAll:this.getAll.bind(this),getClass:this.getClass.bind(this),getClasses:this.getClasses.bind(this)})},load:function(options){var componentName=options.name,instanceName=options.instance||this.createInstanceID(options.name),view=options.view||null,options="function"==typeof options.onLoaded?options.onLoaded:null;log("load","Loading "+instanceName+" instance of "+componentName+" component",null,"DEBUG");try{var component=this.get(componentName,instanceName);"function"==typeof options&&options(component)}catch(e){_components[componentName]?(component=this.instantiate(_components[componentName],instanceName),"function"==typeof options&&options(component)):this.require(componentName,instanceName,view,options)}},loadAsync(options){return new Promise(res=>{this.load({...options,onLoaded:res})})},require:function(componentName,instanceName,view,onLoaded){log("require","Requiring "+instanceName+" instance of "+componentName+" component",null,"DEBUG");var self=this,path="components/"+componentName+"/",viewPath=view?"views/"+view+"/"+componentName+API.Utils.firstToUpper(view)+"View":componentName+"View";require(["core/Component",path+componentName+"Controller"],function(Component,Controller){var hasCollection=void 0!==Controller.prototype.collection,deps=[path+componentName+"Model",path+viewPath];hasCollection&&deps.push(path+componentName+"Collection"),require(deps,function(Model,View,Collection){log("require",instanceName+" instance of "+componentName+" component require complete",null,"DEBUG"),_components[componentName]=new Component(componentName,{Controller:Controller,Model:Model,View:View,Collection:Collection});Model=self.instantiate(_components[componentName],instanceName);"function"==typeof onLoaded&&onLoaded(Model)})})},instantiate:function(component,instanceName){var componentName=component.name,controller=(log("instantiate","Instantiating "+instanceName+" instance of "+componentName+" component",null,"DEBUG"),component.create("Controller",instanceName)),model=component.create("Model",instanceName),view=component.create("View",instanceName),collection=null;return void 0!==controller.collection&&(collection=component.create("Collection",instanceName),controller.collection=collection,view.collection=collection),controller.model=model,(controller.view=view).model=model,"function"==typeof controller.initAPI&&controller.initAPI(API),_instances[componentName]="object"==typeof _instances[componentName]&&null!==_instances[componentName]?_instances[componentName]:{},_instances[componentName][instanceName]={controller:controller,model:model,view:view,collection:collection},_instances[componentName][instanceName]},get:function(componentName,instanceName){if(log("get","Getting "+instanceName+" instance of "+componentName+" component",null,"TRACE"),!componentName)throw new Error("[ComponentFactory.get()] Must specify component name");if(!(componentName in _instances))throw new Error("[ComponentFactory.get()] "+componentName+" component has not been loaded yet");if(instanceName in _instances[componentName])return _instances[componentName][instanceName];throw new Error("[ComponentFactory.get()] "+instanceName+" instance of "+componentName+" component has not been loaded yet")},getAll:function(componentName){if(log("get","Getting all instances of "+componentName+" component",null,"TRACE"),!componentName)throw new Error("[ComponentFactory.getAll()] Must specify component componentName");if(componentName in _instances)return _instances[componentName];throw new Error("[ComponentFactory.getAll()] "+componentName+" component has not been loaded yet")},getClass:function(componentName,className){if(!componentName)throw new Error("[ComponentFactory.get()] Must specify component name");if(componentName in _components)return _components[componentName][className];throw new Error("[ComponentFactory.get()] "+componentName+" component has not been loaded yet")},getClasses:function(componentName){if(!componentName)throw new Error("[ComponentFactory.get()] Must specify component name");if(componentName in _components)return _components[componentName];throw new Error("[ComponentFactory.get()] "+componentName+" component has not been loaded yet")},createInstanceID:function(componentName){return API.Utils.firstToLower(componentName)+"-"+(new Date).getTime()}}});