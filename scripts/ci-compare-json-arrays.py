#!/usr/bin/env python3

import sys
import json

f1 = sys.argv[1]
f2 = sys.argv[2]

array1 = json.load(open(f1))
array2 = json.load(open(f2))

# print(type(array1), type(array2))
# print('\n', array1, '\n')
# print(array1[0], '\n')
# print(array2)

assert len(array1) == len(array2), "Length of arrays are different"

# transform arrays/lists to dicts
dict1 = {x['auditId']: x for x in array1}
dict2 = {x['auditId']: x for x in array2}

# Compare dict1 and dict2
assert set(dict1.keys()) == set(dict2.keys()), "Keys are different between dict1 and dict2"


# Find keys that are in both dict1 and dict2
for key in dict1:

    assert dict1[key] == dict2[key], f"Key {key} is in both dict1 and dict2 but values are different. dict1: {dict1[key]}, dict2: {dict2[key]}"
