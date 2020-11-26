#!/bin/bash
set -e
IFS='|'
AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"general\",\
\"useProfile\":false,\
\"accessKeyId\":\"${AWSAccessKeyId}\",\
\"secretAccessKey\":\"${AWSSecretKey}\",\
\"region\":\"${region}\"\
}"

AMPLIFY="{\"envName\":\"${AMPLIFY_ENV}\", \"defaultEditor\":\"code\"}"
PROVIDERS="{\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG}"

echo 'Initializing Amplify'
amplify init \
--amplify $AMPLIFY \
--providers $PROVIDERS \
--yes
echo 'Amplify Initialized'