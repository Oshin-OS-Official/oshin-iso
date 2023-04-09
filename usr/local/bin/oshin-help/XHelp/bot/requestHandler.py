import os
import sys

from pathlib import Path

sys.path.append(
   os.path.abspath(
      Path(__file__).resolve().parent.parent.parent
   )
)

import XHelp as App
import time
from multiprocessing import (Lock,)

class RequestHandler:
   requestHandler = None
   
   analysisCounter = None
   analysisString = None
   analysisResetFlag = None
   analysisWorkingFlag = None
   analysisPassLock = None
   
   preAnalysisExecutor = None
   
   def start ():
      RequestHandler.requestHandler = App.bot.ChatBot.sendResponse
      
      RequestHandler.analysisCounter = (
         App.Configuration.BOT_ANALYSIS_WAIT_TIME
      )
      RequestHandler.analysisString = ''
      RequestHandler.analysisResetFlag = False
      RequestHandler.analysisWorkingFlag = False
      RequestHandler.analysisPassLock = Lock()
      
      RequestHandler.preAnalysisExecutor = App.core.AutoExecutor(
         exec_function=RequestHandler.preAnalyse,
         runType='thread',
         autopause=True,
         daemon=True,
      )
      
      RequestHandler.preAnalysisExecutor.pause()
      RequestHandler.preAnalysisExecutor.start()
   
   def close ():
      if (RequestHandler.preAnalysisExecutor.is_alive()):
         RequestHandler.preAnalysisExecutor.kill()
   
   def preAnalyse ():
      while (
            (RequestHandler.analysisCounter > 0)
            or (RequestHandler.analysisResetFlag)
         ):
         RequestHandler.analysisWorkingFlag = True
         if (RequestHandler.analysisResetFlag):
            RequestHandler.analysisCounter = (
               App.Configuration.BOT_ANALYSIS_WAIT_TIME
            )
            RequestHandler.analysisResetFlag = False
         else:
            RequestHandler.analysisCounter -= 1
         
         time.sleep(1)
      RequestHandler.analysisWorkingFlag = False
      
      RequestHandler.analysisPassLock.acquire()
      
      if (RequestHandler.analysisString != ''):
         try:
            RequestHandler.requestHandler(RequestHandler.analysisString)
         except:
            pass # Ignore.
      
      RequestHandler.analysisString = ''
      RequestHandler.analysisPassLock.release()
   
   def stackRequest (message):
      if (not RequestHandler.analysisResetFlag):
         RequestHandler.analysisResetFlag = True
         time.sleep(0.2)
      
      RequestHandler.analysisPassLock.acquire()
      
      if (RequestHandler.analysisWorkingFlag):
         RequestHandler.analysisString += '\n' + str(message)
      elif (not RequestHandler.analysisWorkingFlag):
         if (RequestHandler.preAnalysisExecutor.is_alive()
               and RequestHandler.preAnalysisExecutor.is_paused()
            ):
            RequestHandler.analysisString = str(message)
            RequestHandler.preAnalysisExecutor.resume()
         else:
            RequestHandler.analysisString += '\n' + str(message)
         
      RequestHandler.analysisPassLock.release()
