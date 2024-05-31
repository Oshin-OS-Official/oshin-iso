import os
from pathlib import Path

class Configuration:
   BASE_DIR = Path(__file__).resolve().parent.parent
   PACKAGE_DIR = Path(__file__).resolve().parent
   
   DB_PATH = f'{os.path.expanduser("~")}/.local/share/xhelp/XHelpCombinedStorage.db'
   # DB_PATH = Path(__file__).resolve().parent / 'storage' / (
   #    'XHelpCombinedStorage.db'
   # )
   
   GUI_INTERRUPT_POLLING_INTERVAL = 1000 # int, ms.
   
   SESSION_ID = None
   BOT_ANALYSIS_WAIT_TIME =0.5 # float | int, sec.
   BOT_PATTERN_MATCH_PROBABILITY = 0.75 # float [0.0 - 1.0].
   
   SENDER_MAP = {
      'bot': 0,
      'user': 1,
   } # Maps senders to database, to be used program-wide. # str - int.
   
   BOT_NAME = 'Sahayak'
   USER_NAME = 'You'
   MESSAGE_TIMESTAMP_FORMAT = '%d/%m/%Y - %I:%M %p'
   
   disappearingMessages = True # On | Off
   sessionTimeout = 0 # Levels: 0 | 1 | 2 | ...
