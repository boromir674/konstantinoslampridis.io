#!/usr/bin/env python3

import sys
import json

runtime_data_file = sys.argv[1]
gold_standard_file = sys.argv[2]

exit_code = 0

runtime = json.load(open(runtime_data_file))
gold_standard = json.load(open(gold_standard_file))

# transform runtime and Gold Standard (GS) lists to dicts
data_runtime = {x['auditId']: x for x in runtime}
data_gold_standard = {x['auditId']: x for x in gold_standard}

# Failed Audit assertions to be at most the number of GS Fails: level errors + warn
if len(runtime) > len(gold_standard):
    print(f"[WARN] Audit assertions are more than the Gold Standard: {len(runtime)} <= {len(gold_standard)}")

    # pretty print 2 columns of runtime and gs audidtId's
    for i, (audit_id, k2) in enumerate(zip(sorted(data_runtime.keys()), sorted(data_gold_standard.keys()))):
        print(f"{audit_id} {k2}")

    # print rest of auditId's
    for k in sorted(data_runtime.keys())[len(data_gold_standard):]:
        print(f"{k} ")

    sys.exit(exit_code)

if len(runtime) < len(gold_standard):  # potential improvement over tracked GS
    # can signal for raising standards by updating the tracked GS
    print(f"[INFO] Audit assertions are less than the Gold Standard: {len(runtime)} <= {len(gold_standard)}")
    print(f"[INFO] Gold Standard could be improved by removing some of the audit assertions it contains")


# Compare dict1 and dict2
# assert set(data_runtime.keys()) == set(data_gold_standard.keys()), f"Keys are different between dict1 and dict2: {sorted(data_runtime.keys())} != {sorted(data_gold_standard.keys())}"

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

for audit_id, v1 in data_runtime.items():
    for k in comparable:
        assert v1[k] == data_gold_standard[audit_id][k], (
            f"Audit '{audit_id}' attribute '{k}': 'Runtime' and Gold Standard' missmatch!\n"
            "Might happen if new Lighthouse version is used in CI."
            "Might happen if the Gold Standard was poorly updated.\n"
            " In both cases, please regenerate the Gold Standard lighthouse assertion results and commit.\n"
        )

    if v1['actual'] != data_gold_standard[audit_id]['actual']:
        print(f"[WARN] Values are different for key {audit_id} and attribute 'actual': {v1['actual']} != {data_gold_standard[audit_id]['actual']}")

    if v1['values'] != data_gold_standard[audit_id]['values']:
        print(f"[WARN] Values are different for key {audit_id} and attribute 'values': {v1['values']} != {data_gold_standard[audit_id]['values']}")
