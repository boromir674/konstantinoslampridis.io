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

# transform arrays/lists to dicts
dict1 = {x['auditId']: x for x in array1}
dict2 = {x['auditId']: x for x in array2}

assert len(array1) == len(array2), f"Length of arrays are different: {len(array1)} != {len(array2)}. Keys: {sorted(dict1.keys())} != {sorted(dict2.keys())}"


# Compare dict1 and dict2
assert set(dict1.keys()) == set(dict2.keys()), f"Keys are different between dict1 and dict2: {sorted(dict1.keys())} != {sorted(dict2.keys())}"

# Comparable attributes
comparable = (
    'name',
    'expected',
    # actual',
    # values',
    'operator',
    'passed',
    'auditId',
    'level',
    'url',
    'auditTitle',
    'auditDocumentationLink',
)

for k1, v1 in dict1.items():
    for k in comparable:
        assert v1[k] == dict2[k1][k], f"Values are different for key {k1} and attribute {k}: {v1[k]} != {dict2[k1][k]}"
    
    if v1['actual'] != dict2[k1]['actual']:
        print(f"[WARN] Values are different for key {k1} and attribute actual: {v1['actual']} != {dict2[k1]['actual']}")
    if v1['values'] != dict2[k1]['values']:
        print(f"[WARN] Values are different for key {k1} and attribute values: {v1['values']} != {dict2[k1]['values']}")
