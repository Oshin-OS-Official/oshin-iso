import os
import sys

from pathlib import Path

sys.path.append(
   os.path.abspath(
      Path(__file__).resolve().parent.parent.parent
   )
)

import XHelp as App
import signal
from PyQt5.QtCore import QTimer

class Executor:
   running = None
   
   def gui_close (*args):
      Executor.running = False
      print('Exiting ...')
      App.gui.Application.close()
      App.bot.RequestHandler.close()
      App.database.DatabaseHandler.close()
      App.core.EmailClient.close()
   
   def gui_executor ():
      Executor.running = True
      # Start
      try:
         if (not App.core.EmailClient.start(
                  receiver_email=None, # email where reports will be sent, str.
                  sender_email=None, # your email id as str.
                  sender_email_password=None, # your password as str.
               )
            ):
            print('\nExiting ...')
            exit(0)
      except:
         print('\nExiting ...')
         exit(0)
      
      App.database.DatabaseHandler.start()
      App.database.DatabaseHandler.Settings.load()
      App.database.DatabaseHandler.Messages.load()
      
      App.bot.RequestHandler.start()
      App.gui.Application.start()
      App.bot.ChatBot.start(
         App.gui.Application.homeWindow.sendBotMessageSignal.emit
      )
      
      # Load messages in ui:
      # App.database.DatabaseHandler.Messages.getMessages()
      
      # Run
      # App.gui.Application.run()
      # App.bot.RequestHandler.stackRequest(message)
      # applicationExecutor.start()
      
      signal.signal(signal.SIGINT, Executor.gui_close)
      
      timer = QTimer()
      timer.start(App.Configuration.GUI_INTERRUPT_POLLING_INTERVAL)
      timer.timeout.connect(lambda: None)
      
      App.gui.Application.run()
      
      if (Executor.running == True):
         Executor.gui_close()
