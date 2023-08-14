import boto3
import json

def lambda_handler(event, context):
    # Replace 'YOUR-AWS-REGION' with your actual AWS region
    region = 'us-east-1'
    bucket_name = 'LinkTree'

    # Initialize the AWS DynamoDB client
    dynamodb = boto3.client('dynamodb', region_name=region)

    # Scan the DynamoDB table to retrieve all items
    try:
        response = dynamodb.scan(TableName=bucket_name)
        items = response['Items']

        # Build a list to store the items
        item_list = []
        for item in items:
            name = item['Name']['S']
            url = item['URL']['S']
            item_list.append({
                'Name': name,
                'URL': url
            })

        # Return the response in the format expected by API Gateway
        return {
            'statusCode': 200,
            'headers': {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods" : "OPTIONS,POST",
            "Access-Control-Allow-Credentials" : True,
            "Access-Control-Allow-Origin" : "*",
            "X-Requested-With" : "*"
        },
            'body': json.dumps(item_list)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods" : "OPTIONS,POST",
            "Access-Control-Allow-Credentials" : True,
            "Access-Control-Allow-Origin" : "*",
            "X-Requested-With" : "*"
        },
            'body': json.dumps({'message': f'Error retrieving items: {str(e)}'})
        }
