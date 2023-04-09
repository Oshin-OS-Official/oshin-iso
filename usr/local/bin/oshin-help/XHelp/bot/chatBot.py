import os
import sys

from pathlib import Path

sys.path.append(
   os.path.abspath(
      Path(__file__).resolve().parent.parent.parent
   )
)

import XHelp as App

import random
import json
# import torch

class ChatBot:
   responseHandler = None

   device = None
   model = None
   intents = None
   data = None

   reportActive = None
   reportMessages = None

   def start (responseHandler):
      ChatBot.responseHandler = responseHandler
      ChatBot.reportActive = False
      ChatBot.reportMessages = ''

   def reset ():
      App.Configuration.SESSION_ID += 1

   def sendResponse (message):
      original_message = str(message).strip()
      Output(message)
      return None

#Doxing-related
DQ1=["\nDo you know the person who is doxxing you ? "]

DQ2=["\nOkay please tell me the name. "]

DQ3=["\nOkay then, please help me with name of the platform where you were doxxed ? "]

DQ4=["\nIf you want to share more details about the incident. \nIf done, Please type 'submit'."]
DA4=["\nI have noted down the information and will pass on to the proper authorithies. Meanwhile, try to stay away from such platforms and people.\nAlso inform your parents about this incident.\nPlease type 'submit'."]


#Black-mailing
BQ1=["\nDo you know the person who is blackmailng you ?"]

BQ2=["\nOkay please share the name ? "]

BQ3=["\nOkay then, tell me medium through which the person is blackmailing you ? "]

BQ4=["\nDid the person blackmail you in public or in private ?\n\nPlease reply by typing:\nY for Public\nN for Private"]

BQ5=["\nIf you want to share more details about the incident, please type in.\nIf done, Please type 'submit'."]
BA5=["\nDo not worry, I have noted down the issue. Please inform your parents about this incident as soon as possible.\nI will forward this issue to the concerned authorities.\nPlease type 'submit'."]


#Others
OQ1=["\nPlease categorize the type of issue(Eg: Stalking, CyberFraud etc.) ? "]

OQ2=["\nOkay share more details regarding your issue... "]
OA2=["\nDo not worry, I have noted down the issue and will forward this to the concerned authorities.\nPlease type 'submit'. "]


#Bullying-related
CQ1=["\nDo you know the person who bullied you ?"]

CQ2=["\nDid You try informing your parents about this incident ?"]
CN2=["\nWell Parents are our biggest supporters, So please share this incident with them. They will surely help you out."]
CY2=["\nThat's really wise of you. I appreciate that."]

CQ3=["\nWas it a Cyber bullying through any online platform? Or through Physical interaction ?\n\nPlease reply by typing:\nY for Cyber Bullying\nN for Physical-interaction Bullying"]
CN3=["\nThen try to avoid them as much as possible in public places. And if they are in same organisation of yours, try filing a complaint against them."]

CQ4=["\nSo did you try reporting about this on that Online Platform ?"]
CN4=["\nPlease You should report it and seek as much help as possible. You also have the option to block the source."]

CQ5=["\nDoes this incident keeps on repeating ?"]
CY5=["\nWell in this case, do not respond to the texts or emails and you should try Blocking the source or person.\nYou can also get support from cybercrime.gov.in website."]
CN5=["\nNo problem,I guess that was once a while and you can refer to cybercrime.gov.in website for more help."]


#SPAMMING_TEXT-RELATED
STQ1=["\nDo you get spam texts continuously ?"]
STN1=["\nThat's fine, Once a while it happens and Keep a check if it ever happens again."]

STQ2=["\nIs it from the same user or Organisation ?"]
#STY2=["\nPlease try blocking or reporting junk for those spams."]
STN2=["\nOkay, try not to share your phone number or any IDs with such websites and organisations."]

STQ3=["\nSo did you try reporting them on the online platform where you received the spams?"]
STN3=["\nPlease try blocking or reporting junk for those spams and do not respond to any of them."]

STQ4=["\nWas that helpful in any way ?"]
STN4=["\nThen I suggest you copy the message and forward it to 7726 (SPAM HelpLine).\nIf still it goes then you can directly Report it to ReportFraud.ftc.gov website."]
STY4=["\nThat's great, you can still prefer to ReportFraud.ftc.gov website for more help."]


#SPAMMING_ADS-RELATED
SAQ1=["\nDo you get spam ads very frequently ?"]
SAN1=["\nThen that should not be bothering as ads are a result of daily part of our online activities."]

SAQ2=["\nAre those mostly refering to a particular kind of advertisement ?"]
SAN2=["\nIn this case do not click on any of those ads. If possible please enable Ad-block."]
SAY2=["\nWell it might be due to that you had subscribed at some website or shared any information there."]

SAQ3=["\nDid you try reporting or unsubscribing from that partcilar source or website ?"]
SAN3=["\nThen please do that, it will surely help and also try to block the notification of such websites."]

SAQ4=["\nDid those ads reduce after doing so ?"]
SAN4=["\nThen please try to block the notification of such websites."]
SAY4=["\nThat's great, be careful in the future not to share or visit such websites."]

SAQ5=["\nDo you still frequently visit a particular page or website from where you get these spam ads ?"]
SAN5=["\nIn this case, You can file a complaint with the FTC online or call toll-free 1-877-FTC-HELP (1-877-382-4357)."]
SAY5=["\nWell if it not very necesarry, avoid using such websites and try Ad-blocks and try not to share any information there."]


#Basics
greet_patterns= ["HI","HEY","HOW ARE YOU","IS ANYONE THERE?","HELLO","GOOD DAY"]
greet_responses=["Hey :-)","Hello ","Hi there, what can I do for you?","Hi there", "how can I help?"]

adios_patterns=["BYE","SEE YOU LATER","GOODBYE","GOOD NIGHT"]
adios_responses= ["See you later","Have a nice day","Bye!"]
##grat
gratitude_patterns=["THANKS","THANK YOU","THANK'S A LOT!"]
gratitude_responses=["Happy to help!","Any time!","My pleasure","Most welcome"]
##rept
report_patterns=["I WANT TO REPORT","REPORT","HELP","I AM FACING ISSUE.","CYBER BULLYING","HARASSMENT.","CREEPY MESSAGE","BULLYING","DISTURBING.","TROUBLING"]
report_responses=["Please go ahead and give more details.","Tell us your issue. We will surely help.","Could you please share some more information regarding it"]

bullying_patterns=["VIOLENT BEHAVIOR","ABUSIVE","HATEFUL","FOUL LANGUAGE","BAD WORDS","BULLY","BULLYING","1"]
bullying_responses=["No worries, Almost 59% of user face bullying once a while, So just cheer up. Lets try to overcome this incident."]
#bullying_responses=["->Please inform your parents.\n->Stop responding to such texts or emails.\n->You can try to get support from cybercrime.gov.in website.\n->Avoid or ignore as much as possible.\n->If possible, please block the source."]

spam_patterns=["I HAVE BEEN SPAMMING","SPAMMING","SPAM","SPAMMED","I WANT TO REPORT SPAMMING","2"]
spam_responses= ["Please specify by typing:\nA - for SPAM ADS\nB - for SPAMS TEXTS/EMAILS"]

spam_ads_patterns=["A","SPAM ADS","ADS","ADVERTISEMENT"]
spam_ads_responses=["Ad spam is generally something you wish you hadn't encountered while online. Its generally the Pop-up ads But We try to fix that for you."]


spam_text_patterns=["B","SPAM TEXTS","MESSAGES","DMS","TEXT","EMAIL","SPAM EMAIL","SPAM EMAILS"]
spam_text_responses=["Spamming is very common issue & It's not harmful in any way. So worry not, let's sort this out"]


#Doxing
dox_patterns=["3","DOX","DOXXING","DOXXED","REPORT DOXXING"]
dox_responses=["No worries, We will help you out. Do not panic.\nFirstly tell me few details to access the situation."]


#Black-mail
blackmail_patterns=["4","BLACKMAIL","BLACKMAILING","BLACKMAILED"]
blackmail_responses=["No worries, I will help you to the best of my limits. In the meantime, Do not panic and just stay calm."]

#Others
others_patterns=["5","I HAVE TO REPORT SOMETHING ELSE","NOT LISTED"]
others_responses=["Okay, no worries I will help you with any cyber or online issue you face."]

actions_patterns=["BLOCK","MORE HELP","TAKE ACTION","DO SOMETHING"]
actions_responses=["we will do our best to look up on this matter and help you.","Necessary actions will be taken as soon as possible. Worry not"]

end_patterns=["SUBMIT","OK","DONE","SURELY","LINK","INSTAGRAM","WHATSAPP","FACEBBOOK","EVIDENCE"]
end_responses=["Noting it down. Your report will be submitted. Type 'Return' to return back to main menu"]

main_menu="\nPlease Type to report:\n1 - Bullying issue\n2 - Spamming issue\n3 - Doxing issue\n4 - Black-mailing issue\n5 - Other issue"
finish_text="\n\nIf done, Please type 'submit'."
option_text="\n\nPlease reply by typing:\nY for Yes\nN for No"


import random
def rand(n):
    num = random.randint(0,n-1)
    return num


def Output(user):
    global PYA
    if(user in'aA'):
        ChatBot.reportMessages+='\n'
        ChatBot.reportMessages+= "SPAM ADS"
    elif(user in'bB'):
        ChatBot.reportMessages+='\n'
        ChatBot.reportMessages+= "SPAM TEXTS/EMAILS"
    elif(user=='2'):
        ChatBot.reportMessages+='\n'
        ChatBot.reportMessages+= "report Spamming realted isues"
    elif(user=='1'):
        ChatBot.reportMessages+='\n'
        ChatBot.reportMessages+= "report cyber bullying related issues"
    elif(user in 'nNoO'):
        ChatBot.reportMessages+='\n'
        ChatBot.reportMessages+= "NO"
    elif(user=='YESyes'):
        ChatBot.reportMessages+='\n'
        ChatBot.reportMessages+= "YES"
    else:
        ChatBot.reportMessages+='\n'
        ChatBot.reportMessages+= user
    user=user.upper()
    
    if user in greet_patterns:
        i=rand(len(greet_responses))
        Send_Output(greet_responses[i])
       
         
    elif user in others_patterns:
        PYA="OQ1"
        Send_Output(others_responses[0]+ OQ1[0])

    elif user in blackmail_patterns:
        PYA="BQ1"
        Send_Output(blackmail_responses[0]+ BQ1[0]+ option_text)



    elif user in adios_patterns:
        i=rand(len(adios_responses))
        Send_Output(adios_responses[i]+finish_text)
         

    elif user in gratitude_patterns:
        i=rand(len(gratitude_responses))
        Send_Output(gratitude_responses[i]+finish_text)
        
    elif user in report_patterns:
        i=rand(len(report_responses))
        Send_Output(report_responses[i])


    elif user in actions_patterns:
        i=rand(len(actions_responses))
        Send_Output(actions_responses[i]+finish_text)


    elif user in end_patterns:
        i=rand(len(end_responses))
        Send_Output(end_responses[i])    
        #App.core.EmailClient.sendMessage(ChatBot.reportMessages)


#CYBERBULLING-RELATED

    elif user in bullying_patterns:
        i=rand(len(bullying_responses))
        PYA="CQ1"
        Send_Output(bullying_responses[i]+CQ1[0]+ option_text)


    elif(user in "yesYES") and (PYA == "CQ1"):
        PYA = "CQ2"
        Send_Output(CQ2[0]+option_text)

    
    elif (user in"noNO") and (PYA == "CQ1"):
        PYA= "CQ2"
        Send_Output(CQ2[0]+option_text)


    elif (user in"noNO") and (PYA == "CQ2"):
        PYA= "CQ3"
        Send_Output(CN2[0]+CQ3[0])


    elif (user in "yesYES") and (PYA == "CQ2"):
        PYA= "CQ3"
        Send_Output(CY2[0]+CQ3[0])


    elif (user in"noNO") and (PYA == "CQ3"):
        PYA= "CQ5"
        Send_Output(CN3[0]+CQ5[0]+option_text)


    elif (user in "yesYES") and (PYA == "CQ3"):
        PYA= "CQ4"
        Send_Output(CQ4[0]+ option_text)


    elif (user in"noNO") and (PYA == "CQ4"):
        PYA= "CQ5"
        Send_Output(CN4[0]+ CQ5[0]+ option_text)


    elif (user in "yesYES") and (PYA == "CQ4"):
        PYA= "CQ5"
        Send_Output(CQ5[0] + option_text)
    

    elif (user in"noNO") and (PYA == "CQ5"):
        PYA= "NULL"
        Send_Output(CN5[0]+finish_text)


    elif (user in "yesYES") and (PYA == "CQ5"):
        PYA= "NULL"
        Send_Output(CY5[0]+finish_text)



    elif user in spam_patterns:
        i=rand(len(spam_responses))
        Send_Output(spam_responses[i])    


#SPAMMING_TEXT-RELATED

    elif user in spam_text_patterns:
        i=rand(len(spam_text_responses))
        PYA="STQ1"
        Send_Output(spam_text_responses[i]+STQ1[0]+ option_text)
    

    elif (user in"noNO") and (PYA == "STQ1"):
        PYA= "STQ3"
        Send_Output(STN1[0]+ STQ3[0] + option_text)


    elif (user in "yesYES") and (PYA == "STQ1"):
        PYA= "STQ2"
        Send_Output(STQ2[0] + option_text)


    elif (user in"noNO") and (PYA == "STQ2"):
        PYA= "STQ3"
        Send_Output(STN2[0] + STQ3[0] + option_text)


    elif (user in "yesYES") and (PYA == "STQ2"):
        PYA= "STQ3"
        Send_Output(STQ3[0] + option_text)


    elif (user in"noNO") and (PYA == "STQ3"):
        PYA= "STQ4"
        Send_Output(STN3[0]+ STQ4[0] + option_text)

    elif (user in "yesYES") and (PYA == "STQ3"):
        PYA= "STQ4"
        Send_Output(STQ4[0] + option_text)


    elif (user in"noNO") and (PYA == "STQ4"):
        PYA= "NULL"
        Send_Output(STN4[0] + finish_text)


    elif (user in "yesYES") and (PYA == "STQ4"):
        PYA= "NULL"
        Send_Output(STY4[0] + finish_text) 



#SPAMMING_ADS-RELATED

    elif user in spam_ads_patterns:
        PYA="SAQ1"
        Send_Output(spam_ads_responses[0]+SAQ1[0]+ option_text)


    elif (user in"noNO") and (PYA == "SAQ1"):
        PYA= "SAQ3"
        Send_Output(SAN1[0]+ SAQ3[0] + option_text)


    elif (user in "yesYES") and (PYA == "SAQ1"):
        PYA= "SAQ2"
        Send_Output(SAQ2[0] + option_text)


    elif (user in"noNO") and (PYA == "SAQ2"):
        PYA= "SAQ3"
        Send_Output(SAN2[0]+ SAQ3[0] + option_text)


    elif (user in "yesYES") and (PYA == "SAQ2"):
        PYA= "SAQ3"
        Send_Output(SAY2[0] +SAQ3[0] + option_text)


    elif (user in"noNO") and (PYA == "SAQ3"):
        PYA= "SAQ4"
        Send_Output(SAN3[0]+ SAQ4[0] + option_text)


    elif (user in "yesYES") and (PYA == "SAQ3"):
        PYA= "SAQ4"
        Send_Output(SAQ4[0] + option_text)


    elif (user in"noNO") and (PYA == "SAQ4"):
        PYA= "SAQ5"
        Send_Output(SAN4[0]+ SAQ5[0] + option_text)


    elif (user in "yesYES") and (PYA == "SAQ4"):
        PYA= "NULL"
        Send_Output(SAY4[0]  + finish_text)


    elif (user in"noNO") and (PYA == "SAQ5"):
        PYA= "NULL"
        Send_Output(SAN5[0] + finish_text)


    elif (user in "yesYES") and (PYA == "SAQ5"):
        PYA= "NULL"
        Send_Output(SAY5[0]  + finish_text)



#Doxing-related 

    elif user in dox_patterns:
        PYA="DQ1"
        Send_Output(dox_responses[0]+DQ1[0]+ option_text)

    elif (user in"noNO") and (PYA == "DQ1"):
        PYA= "DQ3"
        Send_Output(DQ3[0] )

    elif (user in "yesYES") and (PYA == "DQ1"):
        PYA= "DQ2"
        Send_Output(DQ2[0])
    
    elif PYA=="DQ2":
        PYA="DQ3"
        Send_Output(DQ3[0])

    elif PYA=="DQ3":
        PYA="DQ4"
        Send_Output(DQ4[0])

    elif PYA=="DQ4":
        PYA="NULL"
        Send_Output(DA4[0])

#BLACKMAILING-related

    elif user in blackmail_patterns:
        PYA="BQ1"
        Send_Output(blackmail_responses[0]+ BQ1[0]+ option_text)


    elif (user in"noNO") and (PYA == "BQ1"):
        PYA= "BQ3"
        Send_Output(BQ3[0] )


    elif (user in "yesYES") and (PYA == "BQ1"):
        PYA= "BQ2"
        Send_Output(BQ2[0])
    

    elif PYA=="BQ2":
        PYA="BQ3"
        Send_Output(BQ3[0])


    elif PYA=="BQ3":
        PYA="BQ4"
        Send_Output(BQ4[0])


    elif PYA=="BQ4":
        PYA="BQ5"
        Send_Output(BQ5[0])


    elif PYA=="BQ5":
        PYA="NULL"
        Send_Output(BA5[0])



#Other_issues

    elif PYA=="OQ1":
        PYA="OQ2"
        Send_Output(OQ2[0])

    elif PYA=="OQ2":
        PYA="NULL"
        Send_Output(OA2[0])


#BACK TO MENU
    elif (user in"returnRETURN") and (PYA == "NULL"):
        Send_Output(main_menu) 

    else:
        Send_Output("Sorry, I could not get you, Please rephrase.")
         
def Send_Output(message):
    ChatBot.responseHandler(message)
    
