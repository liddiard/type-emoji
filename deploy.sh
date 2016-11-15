#!/bin/bash

bucket='s3://typeemoji.com/'

echo "Building release browserify bundle..."
browserify -t babelify -t reactify -t scssify -t uglifyify src/app.jsx | gzip | aws s3 cp --content-encoding=gzip - "${bucket}dist/bundle.js"
echo "Uploaded bundle to S3."
aws s3 cp index.html $bucket
gzip -c emoji.json | aws s3 cp --content-type=application/json --content-encoding=gzip - "${bucket}emoji.json"
