import json
import boto3

# Define the CORS headers
cors_headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
    "Access-Control-Allow-Credentials": True,
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "*"
}

def lambda_handler(event, context):
    # Parse the incoming JSON data
    try:
        data = json.loads(event['body'])
        name = data['Name']
        url = data['URL']
    except KeyError as e:
        return {
            'statusCode': 400,
            'headers': cors_headers,
            'body': json.dumps('Invalid request data')
        }

    # Initialize the DynamoDB client
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('LinkTree')

    # Add the item to the DynamoDB table
    try:
        response = table.put_item(
            Item={
                'Name': name,
                'URL': url
            }
        )
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps('Item added successfully')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps('Error adding item to DynamoDB')
        }
