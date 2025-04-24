#!/bin/bash
set -e
echo "Initializing LocalStack resources..."
echo "Creating S3 bucket: invisible-data-hand-data-lake"
awslocal s3 mb s3://invisible-data-hand-data-lake
echo "S3 bucket created successfully!"