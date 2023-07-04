<div class="bg-black bg-opacity-50 flex fixed inset-0 w-full h-full">
    <div class="onboarding m-auto bg-base-100 overflow-hidden flex flex-col">

        <div class="flex-1 overflow-y-auto">
            <div class="p-4 flex flex-col gap-4">
                <!-- Existing User Header -->
                <div class="flex flex-col gap-4" id="existingUserHeader">
                    <div class="image-container">
                        <img class="logo-sf" src="{{extensionURL}}common/img/logo.svg" />
                        <iconify-icon width="32" class="text-base-content/70 mt-1" icon="fa:handshake-o"></iconify-icon>
                        <img class="logo-st" src="{{extensionURL}}common/img/sensortower-logo.svg"/>
                    </div>
                    <p class="text-base-content" data-i18n="onboardingExistingUserMessage"></p>
                    <div class="row">
                        <div class="chip chip-accent" data-i18n="featureDailyReports"></div>
                        <div class="chip chip-secondary" data-i18n="featureFocusSchedules"></div>
                        <div class="chip chip-info" data-i18n="featureModernizedUI"></div>
                        <div class="chip chip-warning" data-i18n="featureDistractingCategories"></div>
                    </div>

                    <!-- Trusted By Alert -->
                    <div class="alert alert-info">
                        <iconify-icon width="30" class="ml-2" icon="mdi:check-decagram"></iconify-icon>
                        <p class="alert-title flex-1 font-medium" data-i18n="trusted22mlnUsers"></p>
                    </div>
                </div>

                <!-- New User Header -->
                <div class="flex flex-col gap-4" id="newUserHeader">
                    <div class="image-container">
                        <img class="logo-sf" src="{{extensionURL}}common/img/logo.svg" />
                    </div>
                    <h1 class="text-base-content" data-i18n="onboardingNewUserTitle"></h1>
                    <p class="text-base-content" data-i18n="onboardingNewUserMessage"></p>
                </div>

                <!-- Confirm Privacy Policy Header -->
                <div class="flex flex-col gap-4" id="confirmPrivacyPolicyHeader">
                    <div class="image-container">
                        <img class="logo-sf" src="{{extensionURL}}common/img/logo.svg" />
                    </div>
                    <h1 class="text-base-content" data-i18n="onboardingConfirmTitle"></h1>
                    <p class="text-base-content" data-i18n="onboardingConfirmMessage"></p>
                    <div class="row">
                        <div class="chip chip-accent" data-i18n="featureDailyReports"></div>
                        <div class="chip chip-warning" data-i18n="featureDistractingCategories"></div>
                    </div>
                </div>

                <!-- Form Checkboxes -->
                <div class="vert-spacing-4 px-4">

                    <!-- Age -->
                    <div class="age-row" id="ageCheckbox">
                        <div class="flex items-start gap-3">
                            <input class="mt-1.5" type="checkbox" id="isAge18" checked="{{is18OrOlder}}" data-analytics-toggle="TOGGLE_ONBOARDING_AGE"></input>
                            <label class="cursor-pointer" for="isAge18">
                                <span data-i18n="iAm"></span>
                                <span data-i18n="ageOver18" id="ageOver18"></span>
                            </label>
                        </div>
                        <select class="select select-bordered select-xs" name="age" id="ageSelect">
                            <option value="under13" data-i18n="ageUnder13"></option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                        </select>
                    </div>
                    <p class="p-l-checkbox mb-2" data-i18n="under18Message" id="under18Message"></p>


                    <!-- Terms of Service -->
                    <div class="flex items-start gap-3" id="acceptedToSCheckbox">
                        <input class="mt-1.5" type="checkbox" id="hasAcceptedToS" checked="{{hasAcceptedToS}}" data-analytics-toggle="TOGGLE_ONBOARDING_TOS"></input>
                        <label class="cursor-pointer" for="hasAcceptedToS" data-i18n="acceptStayFocusdToS"></label>
                    </div>
                    <p class="text-error p-l-checkbox mb-2" data-i18n="declineToSMessage" id="declineToSMessage"></p>


                    <!-- Privacy Policy -->
                    <div class="flex items-start gap-3" id="acceptedPrivacyPolicyCheckbox">
                        <input class="mt-1.5" type="checkbox" id="hasAcceptedPrivacyPolicy" checked="{{hasAcceptedPrivacyPolicy}}" data-analytics-toggle="TOGGLE_ONBOARDING_PRIVACY_POLICY"></input>
                        <label class="cursor-pointer" for="hasAcceptedPrivacyPolicy" data-i18n="acceptStayFocusdPolicy"></label>
                    </div>
                    <div class="text-sm p-l-checkbox" id="privacyPolicySummary">
                        <p class="text-base-content" data-i18n="privatePolicyTitle"></p>
                        <ul>
                            <li><span class="text-base-content" data-i18n="privatePolicyProps1"></span></li>
                            <li><span class="text-base-content" data-i18n="privatePolicyProps2"></span></li>
                            <li><span class="text-base-content" data-i18n="privatePolicyProps3"></span></li>
                            <li><span class="text-base-content" data-i18n="privatePolicyProps4"></span></li>
                            <li><span class="text-base-content" data-i18n="privatePolicyProps5"></span></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>

        <!-- Buttons -->
        <div class="btn-block bg-base-100 flex gap-2 shrink-0">
            <button class="btn btn-ghost inline-block" data-i18n="decline" id="btnDecline"></button>
            <div class="flex-1"></div>
            <button class="btn btn-outline btn-primary" data-i18n="askLater" id="btnAskLater"></button>
            <button class="btn btn-primary" data-i18n="continue" id="btnContinue"></button>
            <button class="btn btn-primary" data-i18n="continue" id="btnAccept"></button>
        </div>

    </div>
</div>
