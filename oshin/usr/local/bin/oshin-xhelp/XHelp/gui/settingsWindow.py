import os
import sys

from pathlib import Path

sys.path.append(
   os.path.abspath(
      Path(__file__).resolve().parent.parent.parent
   )
)

from PyQt5 import QtWidgets, uic
import XHelp as App

class SettingsWindow (QtWidgets.QMainWindow):
   def __init__ (self, *args, **kwargs):
      super(SettingsWindow, self).__init__(*args, **kwargs)
      
      uic.loadUi(
         App.Configuration.PACKAGE_DIR / 'gui' / 'uiFiles'
         / 'settingsWindow.ui',
         self,
      )
      
      self.pushButton.clicked.connect(App.gui.Application.settingsToHome)
      # self.pushButton_2.clicked.connect(
      #    App.gui.Application.homeWindow.clearChats
      # )
      
      # self.comboBox == session Timeout
      
      # self.comboBox_2.setCurrentText(
      #    'On'
      #    if (App.Configuration.disappearingMessages == True)
      #    else 'Off'
      # )
      
      # self.comboBox_2.activated.connect(self.setDisappearingMessages)
      
      self.pushButton_3.clicked.connect(self.showBotDescription)
      self.pushButton_5.clicked.connect(self.showPrivacyPolicy)
      self.pushButton_4.clicked.connect(self.showHelpAndSupport)
      self.pushButton_6.clicked.connect(self.showTermsAndServices)
      
      self.showBotDescription()
   
   def setDisappearingMessages (self, index):
      if (self.comboBox_2.itemText(index) == 'On'):
         App.Configuration.disappearingMessages = True
         App.database.DatabaseHandler.Settings.update(
            'disappearingMessages'
         )
      elif (self.comboBox_2.itemText(index) == 'Off'):
         App.Configuration.disappearingMessages = False
         App.database.DatabaseHandler.Settings.update(
            'disappearingMessages'
         )
   
   def showBotDescription (self):
      self.label_3.setText(
         'This is a short Bot description!'
      )
   
   def showPrivacyPolicy (self):
      self.label_3.setText(
         'This is a short Privacy policy!'
      )
   
   def showHelpAndSupport (self):
      self.label_3.setText(
         'Yo, need help / support, even in help app !?\n'
         + 'Please press the red cross button on top of this screen !!!'
      )
   
   def showTermsAndServices (self):
      self.label_3.setText(
         'Copyright 2022 KAVACH OS\n'
         + 'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation\n'
         + 'files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy\n'
         + ', modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the \n'
         + 'Software is furnished to do so, subject to the following conditions:\n'
         + '\n'
         + '\n'
         + 'The above copyright notice and this permission notice shall be included in all copies or substantial portions of the \n'
         + 'Software.\n'
         + '\n'
         + '\n'
         + 'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT \n'
         + 'NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND \n'
         + 'NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY \n'
         + 'CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,\n'
         + 'ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n'
      )
