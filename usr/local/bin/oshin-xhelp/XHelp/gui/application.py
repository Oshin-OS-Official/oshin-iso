import os
import sys
from datetime import datetime

from pathlib import Path

sys.path.append(
   os.path.abspath(
      Path(__file__).resolve().parent.parent.parent
   )
)

from PyQt5 import QtWidgets
import XHelp as App

class Application:
   app = None
   windowWidget = None
   homeWindow = None
   settingsWindow = None
   
   def start ():
      Application.app = QtWidgets.QApplication([])
      Application.windowWidget = QtWidgets.QStackedWidget()
      
      Application.homeWindow = App.gui.HomeWindow()
      
      for message in App.database.DatabaseHandler.Messages.getMessages():
         if (message[1] == App.Configuration.SENDER_MAP['user']):
            Application.homeWindow.addUserChatMessage(
               message[0], App.Configuration.USER_NAME, message[2],
            )
         elif (message[1] == App.Configuration.SENDER_MAP['bot']):
            Application.homeWindow.addBotChatMessage(
               message[0], App.Configuration.BOT_NAME, message[2],
            )
         else:
            Application.homeWindow.addBotChatMessage(
               message[0], message[1], message[2],
            )
      
      Application.showInitMessage()
      
      Application.settingsWindow = App.gui.SettingsWindow()
      
      Application.windowWidget.addWidget(Application.homeWindow)
      Application.windowWidget.addWidget(Application.settingsWindow)
      
      Application.homeWindow.textEdit.setFocus()
      
      Application.windowWidget.show()
   
   def showInitMessage ():
      Application.homeWindow.addBotChatMessage(
         datetime.now().strftime(
            App.Configuration.MESSAGE_TIMESTAMP_FORMAT
         ),
         App.Configuration.BOT_NAME,
         (
            "Hey there! I'm {0}, and am here to assist you!".format(
               App.Configuration.BOT_NAME,
            )
            + "\n\nPlease Type to report:\n1 - Bullying issue\n2 - Spamming issue\n3 - Doxing issue\n4 - Black-mailing issue\n5 - Other issue"
         ),
      )
   
   def homeToSettings ():
      Application.windowWidget.setCurrentIndex(
         Application.windowWidget.currentIndex() + 1
      )
   
   def settingsToHome ():
      Application.windowWidget.setCurrentIndex(
         Application.windowWidget.currentIndex() - 1
      )
   
   def run ():
      return Application.app.exec_()
   
   def close ():
      return Application.app.quit()
