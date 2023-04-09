from inspect import getsourcefile
from os.path import dirname
import pathlib
import requests
import re

htmls = [
    "https://www.freecodecamp.org/news/free-python-crash-course/",
    "https://www.freecodecamp.org/news/learn-the-basics-of-the-linux-operating-system/",
    "https://www.freecodecamp.org/news/personal-digital-security-an-intro/",
    "https://www.freecodecamp.org/news/license-to-pentest-ethical-hacking-course-for-beginners/"
]
for i in range(1, len(htmls) + 1):
    html = htmls[i-1]
    course = requests.get(html)
    with open(pathlib.PurePath(dirname(getsourcefile(lambda: 0)), f"course_{i}.html"), "w", encoding="utf-8") as f:
        f.write(
            re.sub(r'<div class="ad(\s|.)*?ADVERTISEMENT(\s|.)*?div>', "", course.text))
