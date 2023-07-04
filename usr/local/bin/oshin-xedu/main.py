from unicodedata import name
from PyQt5.Qt import QUrl, QDesktopServices
from PyQt5.QtWidgets import QMainWindow, QApplication, QLabel, QPushButton, QFrame, QStackedWidget, QVBoxLayout, QWidget, QFileDialog, QGridLayout
from PyQt5 import uic
from PyQt5.QtGui import QPixmap
from PyQt5 import QtGui, QtCore
from PyQt5.QtGui import QCursor
from PyQt5 import QtWebEngineWidgets
from PyQt5.QtWebEngineWidgets import QWebEngineSettings
from PyQt5 import QtWidgets
from PyQt5.QtCore import Qt
import json
import random
import sys
import os


# for Opening links in a new window with QWebEngineView - landing_page - "Enjoyed using it? share"
from PyQt5.QtCore import QUrl
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage

# *********************************************
#                  FRAME 1
# *********************************************


class LandingPage(QMainWindow):
    def __init__(self):
        super(LandingPage, self).__init__()
        uic.loadUi("/usr/local/bin/oshin-xedu/ui/landing_page.ui", self)

        # Finding the button
        # button8  -> Share
        # button9  -> Course_1
        # button10 -> Course_2
        # button11 -> Course_3

        self.shareButton = self.findChild(QPushButton, "pushButton_8")
        self.shareButton.clicked.connect(self.share)

        self.findChild(QPushButton, f"course_no_1").clicked.connect(
            lambda: self.goto_rp(1))
        self.findChild(QPushButton, f"course_no_2").clicked.connect(
            lambda: self.goto_rp(2))
        self.findChild(QPushButton, f"course_no_3").clicked.connect(
            lambda: self.goto_rp(3))
        self.findChild(QPushButton, f"course_no_4").clicked.connect(
            lambda: self.goto_rp(4))

    def share(self):
        url = QUrl("")
        QDesktopServices.openUrl(url)

    def goto_rp(self, courseNumber=1):
        screen2 = ReadingPage(courseNumber)
        widget.addWidget(screen2)
        widget.setCurrentIndex(widget.currentIndex()+1)

# *********************************************
#                  FRAME 2
# *********************************************


class ReadingPage(QMainWindow):
    def __init__(self, courseNumber):
        super(ReadingPage, self).__init__()
        uic.loadUi("/usr/local/bin/oshin-xedu/ui/course_reading.ui", self)

        self.button = self.findChild(QPushButton, "pushButton")
        self.button.clicked.connect(self.back)

        # Course material
        self.text = self.findChild(QLabel, "Para1")

        # HTML Embedding
        self.htmlV = QtWebEngineWidgets.QWebEngineView(self)
        containing_layout = self.text.parent().layout()
        containing_layout.replaceWidget(self.text, self.htmlV)
        # Loading HTML
        with open(f"/usr/local/bin/oshin-xedu/reading/course_{courseNumber}.html", "r", encoding="utf-8") as f:
            html = f.read()
        self.htmlV.setHtml(html, QtCore.QUrl("https://www.freecodecamp.org"))

    def back(self):
        screen1 = LandingPage()
        widget.addWidget(screen1)
        widget.setCurrentIndex(widget.currentIndex()+1)


if __name__ == '__main__':
    # Initialize the program
    app = QApplication(sys.argv)
    widget = QStackedWidget()
    mainwindow = LandingPage()
    widget.addWidget(mainwindow)
    widget.setWindowTitle("StudyBlu - OshinOS")
    widget.setWindowIcon(QtGui.QIcon("/usr/local/bin/oshin-xedu/media/oshin_logo.png"))
    widget.setFixedSize(1344, 714)
    # fixed sizing causes window to be un resizable and the values used are too big
    # widget.setFixedHeight(1000)
    # widget.setFixedWidth(1900)
    widget.show()
    try:
        sys.exit(app.exec_())
    except:
        print("Exiting...")
