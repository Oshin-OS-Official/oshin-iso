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
# import XHelp.gui.assets as assets

class BotChatWidget (QtWidgets.QWidget):
   def __init__ (self, timestring, message, *args, **kwargs):
      super(BotChatWidget, self).__init__(*args, **kwargs)
      
      uic.loadUi(
         App.Configuration.PACKAGE_DIR / 'gui' / 'uiFiles'
         / 'botChatWidget.ui',
         self,
      )
      
      # self.label.setText(timestring)
      self.label_2.setText(message)
