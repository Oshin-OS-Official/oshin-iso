<h1>
    Require Challenge
</h1>
<div>
    <p id="requireChallengeMsg" class="attention"></p>
    <p>
        If this option is selected, you will be required to complete a difficult -- but not impossible -- challenge before you are allowed to change any settings.
        This makes it inconvenient for you to change settings, therefore reducing the chances that you'll cheat.
    </p>
    <p>
        <i>Want to test the challenge before you turn it on? <a href="#" class="link link-accent" id="showChallenge">Click here</a>.</i>
    </p>
    <label class="pl-1 flex gap-3 items-center">
        <input type="checkbox" id="requireChallengeCheckbox" class="checkbox checkbox-sm checkbox-primary" {{checked}}>
        <span>Yes, I want to be challenged before being allowed to change any settings (including this one).</span>
    </label>
    <h4>
        Customize Challenge Text
    </h4>
    <p>
        Enter custom text to be used in the challenge (min {{minChallengeTextLength}} chars).
    </p>
    <textarea id="customChallenge" class="textarea textarea-bordered w-full h-40">{{customChallenge}}</textarea>
    <p>
        <input type="button" class="btn btn-primary btn-sm" name="setCustomChallenge" value="Set custom text">&#160;
        <input type="button" class="btn btn-ghost btn-sm" id="resetCustomChallenge" value="Reset to default">
    </p>
    <p>
        <small class="disclaimer">BE WARNED: If you enter something really long and difficult, you will have to complete the challenge with that text before you can change it.</small>
    </p>
</div>
