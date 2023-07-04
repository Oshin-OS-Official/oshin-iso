import os
import sys
from datetime import datetime

from pathlib import Path

sys.path.append(
   os.path.abspath(
      Path(__file__).resolve().parent.parent.parent
   )
)

from PyQt5 import QtWidgets, uic
from PyQt5.QtCore import Qt, pyqtSignal, pyqtSlot
import XHelp as App
import XHelp.gui.assets as assets

class HomeWindow (QtWidgets.QMainWindow):
   sendBotMessageSignal = pyqtSignal(str)
   
   def __init__ (self, *args, **kwargs):
      super(HomeWindow, self).__init__(*args, **kwargs)
      
      uic.loadUi(
         App.Configuration.PACKAGE_DIR / 'gui' / 'uiFiles'
         / 'homeWindow.ui',
         self,
      )
      
      self.pushButton_6.clicked.connect(App.gui.Application.homeToSettings)
      
      self.textEdit.keyReleaseEvent = self.sendUserMessageOnKeyPress
      self.sendButton.clicked.connect(self.sendUserMessage)
      
      self.sendBotMessageSignal.connect(self.sendBotMessage)
      
      self.scrollArea.verticalScrollBar().rangeChanged.connect(
         self.scrollToEnd,
      )
      
      self.object.setText(App.Configuration.BOT_NAME)
      
      self.textEdit.setFocus()
   
   def addChatMessage (self, timestamp, sender, message):
      self.chat_messages_layout.addWidget(
         App.gui.ChatWidget(
            '{0} || {1}'.format(
               sender,
               timestamp,
            ),
            message,
         ),
      )
   
   def addBotChatMessage (self, timestamp, sender, message):
      self.chat_messages_layout.addWidget(
         App.gui.BotChatWidget(
            '{0} || {1}'.format(
               sender,
               timestamp,
            ),
            message,
         ),
      )
   
   def addUserChatMessage (self, timestamp, sender, message):
      self.chat_messages_layout.addWidget(
         App.gui.UserChatWidget(
            '{0} || {1}'.format(
               sender,
               timestamp,
            ),
            message,
         ),
      )
   
   def scrollToEnd (self, minvalue=None, maxValue=None):
      self.scrollArea.verticalScrollBar().setValue(
         self.scrollArea.verticalScrollBar().maximum()
      )
   
   def clearChats (self):
      for index in reversed(range(self.chat_messages_layout.count())):
         self.chat_messages_layout.itemAt(index).widget().setParent(None)
      
      App.database.DatabaseHandler.Messages.delete()
      App.bot.ChatBot.reset()
      App.gui.Application.showInitMessage()
   
   def sendUserMessageOnKeyPress (self, event):
      if (
            (
               event.key() == Qt.Key_Return or event.key() == Qt.Key_Enter
            ) and (
               QtWidgets.QApplication.keyboardModifiers() != Qt.ShiftModifier
            )
         ):
         self.sendUserMessage()
   
   def sendUserMessage (self):
      if (len(self.textEdit.toPlainText().strip()) > 0):
         timestamp = datetime.now().strftime(
            App.Configuration.MESSAGE_TIMESTAMP_FORMAT
         )
         message = self.textEdit.toPlainText().strip()
         self.addUserChatMessage(
            timestamp,
            App.Configuration.USER_NAME,
            message,
         )
         App.bot.RequestHandler.stackRequest(
            message,
         )
         self.textEdit.setText('')
         App.database.DatabaseHandler.Messages.insert(
            timestamp,
            App.Configuration.SENDER_MAP['user'],
            message,
         )
      
      self.textEdit.setFocus()
   
   @pyqtSlot(str)
   def sendBotMessage (self, message):
      if (len(message.strip()) > 0):
         timestamp = datetime.now().strftime(
            App.Configuration.MESSAGE_TIMESTAMP_FORMAT
         )
         self.addBotChatMessage(
            timestamp,
            App.Configuration.BOT_NAME,
            message.strip(),
         )
         App.database.DatabaseHandler.Messages.insert(
            timestamp,
            App.Configuration.SENDER_MAP['bot'],
            message.strip(),
         )
      
      self.textEdit.setFocus()
