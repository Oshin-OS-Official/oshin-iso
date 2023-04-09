import os
import sys

from pathlib import Path

sys.path.append(
   os.path.abspath(
      Path(__file__).resolve().parent.parent.parent
   )
)

import sqlite3
import XHelp as App

class DatabaseHandler:
   connection = None
   cursor = None
   
   def start ():
      DatabaseHandler.connection = sqlite3.connect(
         App.Configuration.DB_PATH,
         check_same_thread=False,
      )
      DatabaseHandler.cursor = DatabaseHandler.connection.cursor()
   
   def close (commit=False):
      if (commit):
         DatabaseHandler.connection.commit()
      
      DatabaseHandler.connection.close()
   
   class Settings:
      tablename = 'settings'
      
      def load ():
         DatabaseHandler.cursor.execute(
            """
               CREATE TABLE IF NOT EXISTS {0} (
                  key TEXT UNIQUE PRIMARY KEY NOT NULL,
                  value TEXT NOT NULL
               );
            """.format(DatabaseHandler.Settings.tablename)
         )
         
         DatabaseHandler.connection.commit()
         
         settingRecords = DatabaseHandler.cursor.execute(
            """
               SELECT * FROM {0};
            """.format(DatabaseHandler.Settings.tablename)
         ).fetchall()
         
         if (len(settingRecords) < 1):
            for key in App.database.DBMapper.Settings.get(0):
               DatabaseHandler.cursor.execute(
                  """
                     INSERT INTO {0} VALUES (
                        "{1}",
                        "{2}"
                     );
                  """.format(
                     DatabaseHandler.Settings.tablename,
                     key,
                     App.database.DBMapper.Settings.get(key),
                  )
               )
            
            DatabaseHandler.connection.commit()
         else:
            for record in settingRecords:
               App.database.DBMapper.Settings.update(
                  key=record[0],
                  value=record[1],
               )
      
      def update (key=0):
         if (type(key).__name__ not in ('int', 'str',)):
            raise TypeError (
               "DatabaseHandler:Settings:update: key requires 'int' or 'str',"
               + " got '{0}'".format(type(key).__name__)
            )
         
         if (key in (0, 'all', 'entire',)):
            for rkey in App.database.DBMapper.Settings.get(0):
               DatabaseHandler.cursor.execute(
                  """
                     UPDATE {0} SET value = "{2}"
                     WHERE key = "{1}";
                  """.format(
                     DatabaseHandler.Settings.tablename,
                     rkey,
                     App.database.DBMapper.Settings.get(rkey),
                  )
               )
            
            DatabaseHandler.connection.commit()
         elif (key in App.database.DBMapper.Settings.get(0)):
            DatabaseHandler.cursor.execute(
               """
                  UPDATE {0} SET value = "{2}"
                  WHERE key = "{1}";
               """.format(
                  DatabaseHandler.Settings.tablename,
                  key,
                  App.database.DBMapper.Settings.get(key),
               )
            )
            
            DatabaseHandler.connection.commit()
         else:
            raise KeyError(
               "DatabaseHandler:Settings:update:: Invalid key '{0}'".format(
                  key,
               )
            )
   
   class Messages:
      tablename = 'messages'
      
      def load ():
         DatabaseHandler.cursor.execute(
            """
               CREATE TABLE IF NOT EXISTS {0} (
                  id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
                  sessionid INTEGER NOT NULL,
                  timestamp TEXT NOT NULL,
                  sender INTEGER NOT NULL,
                  message TEXT NOT NULL,
                  deleted INTEGER NOT NULL DEFAULT 0
               );
            """.format(DatabaseHandler.Messages.tablename)
         )
         
         DatabaseHandler.connection.commit()
         
         App.Configuration.SESSION_ID = int(
            DatabaseHandler.cursor.execute(
               """
                  SELECT COALESCE(MAX(sessionid), 0)
                  FROM {0};
               """.format(DatabaseHandler.Messages.tablename)
            ).fetchall()[0][0]
         ) + 1
      
      def insert (timestamp, sender, message):
         DatabaseHandler.cursor.execute(
            """
               INSERT INTO {0}
               (sessionid, timestamp, sender, message, deleted)
               VALUES (
                  {1},
                  "{2}",
                  {3},
                  "{4}",
                  {5}
               );
            """.format(
               DatabaseHandler.Messages.tablename,
               App.Configuration.SESSION_ID,
               timestamp,
               sender,
               message,
               App.database.DBMapper.Settings.get('disappearingMessages'),
            )
         )
         
         DatabaseHandler.connection.commit()
      
      def getMessages ():
         messages = DatabaseHandler.cursor.execute(
            """
               SELECT timestamp, sender, message
               FROM {0} WHERE deleted = 0;
            """.format(DatabaseHandler.Messages.tablename)
         ).fetchall()
         
         return messages
      
      def delete ():
         DatabaseHandler.cursor.execute(
            """
               UPDATE {0} SET deleted = 1
               WHERE deleted = 0;
            """.format(DatabaseHandler.Messages.tablename)
         )
         
         DatabaseHandler.connection.commit()
