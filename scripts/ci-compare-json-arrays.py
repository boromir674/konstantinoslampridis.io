#!/usr/bin/env python3
import re
import typing as t
import sys
import json

runtime_data_file = sys.argv[1]
gold_standard_file = sys.argv[2]

exit_code = 0

runtime: t.List[t.Dict] = json.load(open(runtime_data_file))
gold_standard: t.List[t.Dict] = json.load(open(gold_standard_file))

# remove mainthread-work-breakdown from runtime and warn
for i, audit in enumerate(runtime):
    if audit['auditId'] == 'mainthread-work-breakdown':
        main_thread_work_breakdown = runtime.pop(i)
        print("\n[WARN] mainthread-work-breakdown is removed from runtime Assertion Results JSON")
        print(json.dumps(main_thread_work_breakdown, indent=2, sort_keys=True))
        print("This is an assertion that is only known to fail on the CI server, but not locally.")
        break


runtime_list: t.List[t.Dict] = sorted(runtime, key=lambda x: x['auditId'])
gold_standard_list: t.List[t.Dict] = sorted(gold_standard, key=lambda x: x['auditId'])



runtime_id_set = set([x['auditId'] for x in runtime])
gold_standard_id_set = set([x['auditId'] for x in gold_standard])

def key(audit: t.Dict) -> str:
    url_regex = re.compile(r"https?://[^/]+(.+)")
    # from ie http://localhost:33241/404.html key only the path (/404.html)
    url_key_part = url_regex.match(audit['url']).group(1)
    return audit['auditId'] + ' ' + audit['level'] + ' ' + url_key_part


# Print formatted runtime and gold standard as 2 columns
title_1 = "# Runtime #"
title_2 = "# Gold Standard #"
_bigger_list = runtime_list if len(runtime_list) > len(gold_standard_list) else gold_standard_list
# __lengthier_runtime_auditId_string = max(
#     [a['auditId'] for a in runtime_list] + [title_1], key=len)
# __max_len = len(__lengthier_runtime_auditId_string)
__lengthier_runtime_key = max(
    [key(a) for a in runtime_list] + [title_1], key=len
)
__max_len = len(__lengthier_runtime_key)
print(f"\n{title_1:<{__max_len}} {title_2}")
for i in range(len(_bigger_list)):
    # el1: str = runtime_list[i]['auditId'] if i < len(runtime_list) else ''
    # el2: str = gold_standard_list[i]['auditId'] if i < len(gold_standard_list) else ''
    el1: str = key(runtime_list[i]) if i < len(runtime_list) else ''
    el2: str = key(gold_standard_list[i]) if i < len(gold_standard_list) else ''
    # automatically append spaces to the first runtime auditId string
    print(f"{el1:<{__max_len}} {el2}")


# transform runtime and Gold Standard (GS) lists to dicts
data_runtime = {key(x): x for x in runtime}
data_gold_standard = {key(x): x for x in gold_standard}

assert set(data_runtime.keys()) == set(data_gold_standard.keys()), (
    "Keys are different between Runtime and Gold Standard:\n\n"
    f"Runtime: {sorted(data_runtime.keys())}\n"
    f"Gold Standard: {sorted(data_gold_standard.keys())}\n"
)

# # Failed Audit assertions to be at most the number of GS Fails: level errors + warn
# if len(runtime) > len(gold_standard):
#     print(f"[WARN] Audit assertions are more than the Gold Standard: {len(runtime)} <= {len(gold_standard)}")

#     # pretty print 2 columns of runtime and gs audidtId's
#     for i, (audit_id, k2) in enumerate(zip(sorted(data_runtime.keys()), sorted(data_gold_standard.keys()))):
#         print(f"{audit_id} {k2}")

#     # print rest of auditId's
#     for k in sorted(data_runtime.keys())[len(data_gold_standard):]:
#         print(f"{k} ")

#     sys.exit(exit_code)

# if len(runtime) == len(gold_standard):
#     # make sure they have the same keys
#     assert set(data_runtime.keys()) == set(data_gold_standard.keys()), "Keys are different between runtime and Gold Standard"

#### LIVE/RUNTIME better than Gold Standard ####
if len(runtime) < len(gold_standard):  # potential improvement over tracked GS
    # can signal for raising standards by updating the tracked GS
    print(
        f"[INFO] Audit assertions are less than the Gold Standard: {len(runtime)} <= {len(gold_standard)}\n"
        "[INFO] Live Audit passed more assertions than the Gold Standard!\n"
        "[INFO] Lighthouse Standards could be raised by updating the Gold Standard (GS) and"
        "and specifically by removing some failed assertion objects from the GS array JSON\n"
    )
    # pretty print the audit objects where live audit exceeded GS
    print("AuditId's where live audit exceeded GS:")
    for audit_id in sorted(set(data_gold_standard.keys()) - set(data_runtime.keys())):
        print(json.dumps(data_gold_standard[audit_id], indent=2, sort_keys=True))


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
    # 'url',
    'auditTitle',
    'auditDocumentationLink',
)

# for audit_id, v1 in data_runtime.items():
for audit_key, audit in data_runtime.items():
    for k in comparable:
        assert audit[k] == data_gold_standard[audit_key][k], (
            f"Audit '{audit['auditId']}' attribute '{k}': 'Runtime' and Gold Standard' missmatch!\n"
            f"Full Audits:\n"
            f"Runtime: {json.dumps(audit, indent=2, sort_keys=True)}\n"
            f"Gold Standard: {json.dumps(data_gold_standard[audit_key], indent=2, sort_keys=True)}\n"
            "Might happen if new Lighthouse version is used in CI."
            "Might happen if the Gold Standard was poorly updated.\n"
            " In both cases, please regenerate the Gold Standard lighthouse assertion results and commit.\n"
        )

    if audit['actual'] != data_gold_standard[audit_key]['actual']:
        print(f"[WARN] Values are different for Audit {audit_key} and attribute 'actual': {audit['actual']} != {data_gold_standard[audit_key]['actual']}")

    if audit['values'] != data_gold_standard[audit_key]['values']:
        print(f"[WARN] Values are different for key {audit_key} and attribute 'values': {audit['values']} != {data_gold_standard[audit_key]['values']}")

# Print Success !
print("\nAutomated Test PASSED !\n")
