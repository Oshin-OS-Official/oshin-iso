    <h1>
        Blocked Sites
    </h1>
    <p id="blockedSitesMsg" class="alert alert-error hidden"></p>
    <div id="outgoingLinks" class="md:float-right md:ml-8 md:mb-8 md:w-60 border border-base-300 border-solid p-4 flex flex-col gap-1" data-hide-on-bypass>
        <label class="flex items-center gap-2 shrink-0">
            <input type="checkbox" name="stalkerOption" id="stalkerOption" class="checkbox checkbox-primary checkbox-xs">
            <strong>The Stalker Option</strong>
        </label>
        <p>Keep the StayFocusd timer running while visiting links from blocked sites, even if those sites aren't blocked.</p>
        <small>
            <a href="#" id="howDoesThisWork">How does this work?</a>
        </small>
        <div id="stalkerExplanation" style="display:none;">
            <p>
                The Stalker Option is designed to follow you when you visit links clicked from blocked sites. Sites like Reddit and Twitter are notorious time-wasters, and blocking them doesn't do much good. The problem is, you don't waste a lot of time on the sites themselves. Instead, you waste time visiting the sites they link to. You might spend 5 minutes on Reddit, and 5 hours on sites you clicked from there.
            </p>
            <p>
                The Stalker Option solves this problem by keeping your countdown running whenever you're visiting sites via links from blocked sites.
            </p>
            <p>
                For example, if you have Reddit blocked, and you click a link to Wikipedia from there, time will be deducted while you're on Wikipedia ... even though Wikipedia isn't a blocked site. And if you click a link from Wikipedia to yet another site, the timer will <i>still</i> keep running. As long as your click path ultimately leads back to a blocked site, time will be deducted.
            </p>
        </div>
    </div>
    <p>
        Add site(s) to block in the text box below, then click "Add Blocked Site(s)".
    </p>
    <ul class="tips text-sm">
        <li>To block multiple sites, add one per line.</li>
        <li>Do not type the http:// or https://</li>
        <li>If you want to block the entire site, leave off the www (i.e. cnn.com instead of www.cnn.com)</li>
        <li>You can use a preceding asterisk as a wildcard (i.e. *.com blocks all .com sites, or *foo blocks all domains with the word "foo" in them)</li>
        <li>To block all websites, enter a single *</li>
    </ul>
    <p>
        <i>Want some suggestions of sites you should block? <a href="#" id="showSuggestedSitesList" data-analytics-click="CLICK_SETTINGS_BLOCK_SUGGESTED_SITES">Check out this list</a>.</i>
    </p>
    <p>
        <i>Want to stop yourself from disabling StayFocusd? <a href="#" id="blockExtensionsPage" data-analytics-click="CLICK_SETTINGS_BLOCK_EXTENSIONS_PAGE">Block the Chrome Extensions page</a>!</i>
    </p>
    <div id="suggestedSites" class="hidden mb-4">
        <p>
            Click the <iconify-icon icon="mdi:plus" class="text-primary align-text-bottom" title="{{removeFromList}}"></iconify-icon> to add a site to your Blocked Sites list.
        </p>
        <ul class="siteList w-full border border-solid border-neutral-400 list-none px-0" id="suggestedSitesList"></ul>
    </div>
    <label class="gap-3 label justify-start">
        <input type="checkbox" name="blockAllSites" id="blockAllSites" class="checkbox checkbox-primary checkbox-sm">
        <span class="label-text">Block all websites except the ones in Allowed Sites list</span>
    </label>
    <div id="siteListBlock">
        <textarea id="newBlockedSites" class="mt-2 textarea textarea-bordered w-full" placeholder="Enter sites here..."></textarea>
        <p>
            <input type="button" name="addBlockedSites" value="Add Blocked Site(s)" class="btn btn-sm btn-primary">
        </p>
        <p data-hide-on-bypass>
            Click the <iconify-icon icon="mdi:close-thick" class="text-error align-text-bottom"></iconify-icon>
            to remove a site from the list.
        </p>

        <ul class="siteList w-full border border-solid border-neutral-400 list-none px-0" id="blockedSitesList">{{list}}</ul>

        <p>
            <small class="disclaimer">You cannot remove a site from the Blocked Sites list once your time for the day has expired.</small>
        </p>
    </div>
