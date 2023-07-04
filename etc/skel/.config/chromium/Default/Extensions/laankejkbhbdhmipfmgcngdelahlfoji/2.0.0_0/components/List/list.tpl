<!-- BEGIN noSitesYet -->
<li><i>{{noSitesYet}}</i></li>
<!-- END noSitesYet -->

<!-- BEGIN removeDomain -->
<li id="{{id}}" class="domain flex items-center gap-2 h-8">
    <button class="btn btn-xs btn-ghost btn-circle" {{removeBtnAttribute}}>
        <iconify-icon icon="mdi:close-thick" class="text-error m-0" title="{{removeFromList}}" width="18" height="18"></iconify-icon>
    </button>
    {{domain}}
</li>
<!-- END removeDomain -->

<!-- BEGIN addDomain -->
<li id="{{id}}" class="domain flex items-center gap-2 h-8">
    <button class="btn btn-xs btn-ghost btn-circle">
        <iconify-icon icon="mdi:plus" class="text-primary m-0" title="{{removeFromList}}" width="18" height="18"></iconify-icon>
    </button> {{domain}}
</li>
<!-- END addDomain -->
