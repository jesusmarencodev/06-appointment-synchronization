import * as AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();
export const appointmentHandler = async (event) => {
  console.log("estoy desde la lambda que ejecutara appointment-Synchronization");

  console.log(event);

  return {
    statusCode: 200,
    event
  };
};
