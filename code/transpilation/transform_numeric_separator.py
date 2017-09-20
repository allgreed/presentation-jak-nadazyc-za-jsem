import sys
import re

def remove_numeric_separator(string):
    return re.sub(r'(\d)_(\d)',r'\1\2', string)

for line in sys.stdin:
    print(remove_numeric_separator(line), end='')
