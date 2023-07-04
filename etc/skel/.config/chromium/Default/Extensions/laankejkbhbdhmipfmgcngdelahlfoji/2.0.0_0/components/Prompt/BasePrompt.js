define(["core/Prompt","components/Prompt/PromptBirthYear/Controller","components/Prompt/PromptReview/Controller","components/Prompt/PromptSurvey/Controller"],function(Prompt,PromptBirthYearController,PromptReviewController,PromptSurveyController){var log=API.Utils.createScopedLog("BasePrompt");return class{constructor(){log("construct","Constructing BasePrompt",null,"DEBUG")}async init(...types){log("init","Initializing controller",null,"DEBUG");let promptIsAlreadyShown=!1;for(const element of types=0==types.length?Object.values(Prompt.PromptType):types)switch(element){case Prompt.PromptType.PrompBirthYear:promptIsAlreadyShown||(promptBirthYearController=new PromptBirthYearController,promptIsAlreadyShown=await promptBirthYearController.initAsync());break;case Prompt.PromptType.PromptReview:var promptBirthYearController;promptIsAlreadyShown||(promptBirthYearController=new PromptReviewController,promptIsAlreadyShown=await promptBirthYearController.initAsync());break;case Prompt.PromptType.PromptSurvey:var promptSurveyController;promptIsAlreadyShown||(promptSurveyController=new PromptSurveyController,promptIsAlreadyShown=await promptSurveyController.initAsync())}}}});