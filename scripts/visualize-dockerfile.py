#!/usr/bin/env python

import sys
import re


def parse_dockerfile(dockerfile_path):
    stages = {}
    current_stage = None

    with open(dockerfile_path, 'r') as f:
        lines = f.readlines()

        for line in lines:
            line = line.strip()

            # Check if it's a new stage
            # each stage has a unique alias in the Dockerfile
            stage_name_reg = r'[\w:\.\-]+'
            stage_match = re.match(rf'^FROM\s+(?P<stage>{stage_name_reg})\s+[Aa][Ss]\s+(?P<alias>{stage_name_reg})', line)
            if stage_match:
                current_stage = stage_match.group('alias')
                # we create an empty list for pointing to "next" stages
                stages[current_stage] = []
                try:
                    previous_stage = stage_match.group('stage')
                except AttributeError as error:
                    print(f'[DEBUG] Line: {line}')
                    print(f"Error: {error}")
                    raise error
                # Add instructions to current stage
                if current_stage:
                    stages[current_stage].append(previous_stage)

    return stages


def generate_mermaid_flow_chart(stages):
    chart = "graph TB;\n"

    for stage, prev_stages in stages.items():
        # chart += f"  {stage}({stage})\n"

        # Connect to next stages if any
        for prev_stage in prev_stages:
            chart += f"  {prev_stage} --> {stage}\n"

    return chart


def generate_markdown(dockerfile_path, output_path):
    stages = parse_dockerfile(dockerfile_path)
    flow_chart = generate_mermaid_flow_chart(stages)

    markdown = (
        "## Dockerfile Flow Chart\n\n"
        f"**Dockerfile: {dockerfile_path}**\n\n"
        f"```mermaid\n{flow_chart}```\n"
    )
    
    with open(output_path, 'w') as f:
        f.write(markdown)

    print(f"Markdown generated and saved to {output_path}")


def parse_cli_args():
    if len(sys.argv) != 3:
        print(f"Usage: {sys.argv[0]} <dockerfile_path> <output_path>")
        sys.exit(1)

    dockerfile_path = sys.argv[1]
    output_path = sys.argv[2]

    return dockerfile_path, output_path


if __name__ == '__main__':
    dockerfile_path, output_path = parse_cli_args()
    generate_markdown(dockerfile_path, output_path)
