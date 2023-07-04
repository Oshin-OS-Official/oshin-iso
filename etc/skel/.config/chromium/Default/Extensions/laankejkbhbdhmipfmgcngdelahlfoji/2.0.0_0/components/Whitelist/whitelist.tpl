<div class="prose">
    <h1>
        Allowed Sites
    </h1>
    <p>
        Add site(s) to allow in the text box below, then click "Add Allowed Site(s)". Some tips:
        <ul class="tips text-sm">
            <li>To allow multiple sites, add one per line.</li>
            <li>Do not type the http:// or https://</li>
            <li>If you want to allow the entire site, leave off the www (i.e. cnn.com instead of www.cnn.com)</li>
            <li>You can use a preceding asterisk as a wildcard (i.e. *.com allows all .com sites, or *foo allows all domains with the word "foo" in them)</li>
        </ul>
    </p>
    <textarea id="newAllowedSites" class="textarea textarea-bordered w-full" placeholder="Enter sites here..." />
    <p>
        <input type="button" name="addAllowedSites" value="Add Allowed Site(s)" class="btn btn-sm btn-primary">
    </p>
    <p>
       Click the <iconify-icon icon="mdi:close-thick" class="text-error align-middle"></iconify-icon> to remove a site from the list.
    </p>
    <ul class="siteList w-full border border-solid border-neutral-400 list-none px-0" id="allowedSitesList">{{list}}</ul>
    <p>
        <small class="disclaimer">You can remove sites from the Allowed Sites list at any time, regardless of whether your time has expired.</small>
    </p>
</div>
