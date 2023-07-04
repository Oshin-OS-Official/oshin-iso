import os
import sys

from pathlib import Path

sys.path.append(
   os.path.abspath(
      Path(__file__).resolve().parent.parent.parent
   )
)

import XHelp as App

class DBMapper:
   class Settings:
      def get (key):
         if (key in (0, 'all', 'entire',)):
            return (
               'disappearingMessages',
               'sessionTimeout',
            )
         elif (key in (1, 'disappearingMessages')):
            return (
               0
               if (App.Configuration.disappearingMessages == False)
               else 1
            )
         elif (key in (2, 'sessionTimeout')):
            return App.Configuration.sessionTimeout
         
         return None
      
      def update (key, value):
         if (key in (1, 'disappearingMessages')):
            App.Configuration.disappearingMessages = (
               False
               if (int(value) == 0)
               else True
            )
         elif (key in (2, 'sessionTimeout')):
            App.Configuration.sessionTimeout = int(value)
         
         return None
