import json
import boto3

# Define the CORS headers
cors_headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods": "OPTIONS,POST,DELETE",
    "Access-Control-Allow-Credentials": True,
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "*"
}

def lambda_handler(event, context):
    try:
        if event['httpMethod'] == 'OPTIONS':
            # Handle OPTIONS request for CORS preflight
            return {
                'statusCode': 204,
                'headers': cors_headers
            }

        if isinstance(event['body'], str):
            data = json.loads(event['body'])
        else:
            data = event['body']

        name = data['Name']
    except KeyError as e:
        return {
            'statusCode': 400,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Invalid request data'})
        }

    # Initialize the DynamoDB client
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('LinkTree')

    try:
        # Delete the item from the DynamoDB table
        response = table.delete_item(
            Key={
                'Name': name,
            }
        )
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps('Item deleted successfully')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Error deleting item from DynamoDB', 'details': str(e)})
        }
