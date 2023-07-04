<link href="components/Challenge/views/overlay/overlay.css" rel="stylesheet" type="text/css">
<div class="modalOverlay p-4 prose bg-white rounded-md">
    <div class="not-prose flex justify-between items-center">
        <h1 class="text-stylized text-2xl font-medium">Challenge</h1>
        <a href="#" class="close link link-hover link-">
            <small>close</small>
        </a>
    </div>
    <p class="instructions">
        In order to change your settings, you'll have to pass this challenge first. You must re-type the paragraph below, letter for letter, <b>without making a single typo</b>. If you make a typo, or hit the backspace or delete key, everything you typed will be cleared, and you'll have to start again.
    </p>
    <fieldset class="border border-solid border-base-300 p-2 mb-4 rounded-md">
        <legend class="border border-solid border-base-300 px-2 py-1 rounded-md">Re-type the text below</legend>
        <div id="challengeSource" class="h-1/4 overflow-y-auto">{{text}}</div>
    </fieldset>
    <textarea id="challengeText" class="textarea textarea-bordered w-full h-40" />
    <div class="flex justify-between not-prose items-center mt-4 gap-8">
        <a href="#" class="close btn btn-sm btn-secondary"><b>Nevermind, I give up.</b></a>
        <a id="productivityBypass" class="link link-hover text-right">
            <small>Let me access <i>limited</i> settings so I can be more productive</small>
        </a>
    </div>
</div>
