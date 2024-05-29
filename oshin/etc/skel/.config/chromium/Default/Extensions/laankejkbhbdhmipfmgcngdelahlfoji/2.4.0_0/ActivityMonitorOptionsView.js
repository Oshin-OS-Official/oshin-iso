var c=Object.defineProperty;var h=(i,e,n)=>e in i?c(i,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[e]=n;var s=(i,e,n)=>(h(i,typeof e!="symbol"?e+"":e,n),n);import{L as d}from"./Logger.js";import{B as p}from"./Brightline.min.js";import{$ as l}from"./jquery.js";const u=`<h4>
    "Are you still there?" overlay
</h4>
<p>
    The "Are you still there?" overlay appears when your browser has been idle (no mouse movement, no keyboard input) for {{minutes}} minutes.
</p>
<p>
    <label class="label justify-start gap-3">
        <input type="checkbox" class="checkbox checkbox-sm checkbox-primary" id="disableActivityMonitor" {{checked}} />
        <span class="label-text">Never show "Are you still there?" overlay</span>
    </label>
</p>
<hr />
`;let t=l;var o=function(i,e,n,r,a){d.log(i+"."+e,n,r,a)};class v{constructor(){s(this,"model",null)}setJQuery(e){t=e||l,o(this.originator,"setJQuery","Setting jQuery")}render(e){o(this.originator,"render","Rendering view",null,"DEBUG");var n=new p(u);n.set("minutes",e.maxInactiveTime/60),e.isDisabled()&&n.set("checked",'checked="checked"');var r=t(n.render());return this.bindUIHandlers(e,r),r}bindUIHandlers(e,n){o(this.originator,"bindUIHandlers","Binding UI handlers",null,"TRACE"),t("#disableActivityMonitor",n).click(function(){e.toggle()})}}export{v as default};
//# sourceMappingURL=ActivityMonitorOptionsView.js.map
