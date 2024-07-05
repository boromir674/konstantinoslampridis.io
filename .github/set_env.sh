# Set Environment variables useful for a CI/CD Pipeline

# This script is designed to run inside a step of a Github Actions Workflow
# as the 'run' field of a step

# Output the environment variables to the $GIT_OUTPUT file
echo UNIT_TESTS_ON="${UNIT_TESTS_ON}" >> $GITHUB_OUTPUT
echo LINT_ON="${LINT_ON}" >> $GITHUB_OUTPUT
echo PUBLISH_ON="${PUBLISH_ON}" >> $GITHUB_OUTPUT
echo ALLOW_LINT_TO_FAIL="${ALLOW_LINT_TO_FAIL}" >> $GITHUB_OUTPUT
echo DEPLOY_ON="${DEPLOY_ON}" >> $GITHUB_OUTPUT
echo E2E_TESTS_ON="${E2E_TESTS_ON}" >> $GITHUB_OUTPUT
