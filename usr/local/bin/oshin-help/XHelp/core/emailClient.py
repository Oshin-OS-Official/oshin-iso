import os
import sys
import json

from pathlib import Path

sys.path.append(
   os.path.abspath(
      Path(__file__).resolve().parent.parent.parent
   )
)

import smtplib
import ssl
import XHelp as App

with open(f'{os.path.expanduser("~")}/.local/share/xhelp/login.json') as f:
    cred = json.load(f)
    receiver_email_ = cred['receiver_email']
    sender_email_ = cred['sender_email']
    sender_email_password_ = cred['sender_email_password']


class EmailClient:
   smtp_server = None
   port = None
   receiver_email = None
   sender_email = None
   sender_email_password = None
   context = None
   server = None
   
   def start (
         receiver_email=None,
         sender_email=None,
         sender_email_password=None,
         smtp_server='smtp.gmail.com',
         smtp_port=587,
      ):
      EmailClient.smtp_server = smtp_server
      EmailClient.port = smtp_port
      
      if (receiver_email):
         EmailClient.receiver_email = receiver_email.strip()
      else:
         # EmailClient.receiver_email = str(
         #    input('\nReceiver\'s email [example@domain.com]: ')
         # ).strip()
         EmailClient.receiver_email = receiver_email_
      
      if (not EmailClient.receiver_email):
         raise ValueError('EmailClient: Invalid receiver email.')
      
      if (sender_email):
         EmailClient.sender_email = sender_email.strip()
      else:
         # EmailClient.sender_email = str(
         #    input('\nSender\'s email [example@domain.com]: ')
         # ).strip()
         EmailClient.sender_email = sender_email_
      
      if (not EmailClient.sender_email):
         raise ValueError('EmailClient: Invalid sender email.')
      
      if (sender_email_password):
         EmailClient.sender_email_password = sender_email_password.strip()
      else:
         # EmailClient.sender_email_password = str(
         #    input('\nPassword for [{0}]: '.format(EmailClient.sender_email,))
         # ).strip()
         EmailClient.sender_email_password = sender_email_password_
         os.system(
            (
               'clear'
               if (
                  os.path.sep == '/'
               )
               else
               'cls'
            ),
         )
      
      if (not EmailClient.sender_email_password):
         raise ValueError('EmailClient: Invalid sender email password.')
      
      EmailClient.context = ssl.create_default_context()
      
      try:
         EmailClient.server = smtplib.SMTP(
            EmailClient.smtp_server, EmailClient.port
         )
         # EmailClient.server.ehlo()
         EmailClient.server.starttls(context=EmailClient.context)
         # EmailClient.server.ehlo()
         EmailClient.server.login(
            EmailClient.sender_email, EmailClient.sender_email_password,
         )
      except Exception as e:
         print(
            'EmailClient:: Error occured: ', e,
         )
         return False
      
      return True
   
   def sendMessage (message):
      if (not message):
         return None
      
      message = (
         'Subject: XHelp report submission. [{0}]\n\n'
         + 'Messages sent by [{0}] are as follows:\n{1}\n'
      ).format(
         App.Configuration.USER_NAME, message,
      )
      
      try:
         EmailClient.server.sendmail(
            EmailClient.sender_email,
            EmailClient.receiver_email,
            message,
         )
      except Exception as e:
         print(
            'EmailClient:: Error occured while sending: ', e,
         )
      
      return None
   
   def close ():
      try:
         EmailClient.server.quit()
      except:
         pass
      
      return None
