import * as AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
export const appointmentHandler = async (event) => {
  console.log("estoy desde la lambda que ejecutara appointment-Synchronization");

  const objS3 = event.Records[0].s3;//del evento obtenemos la info necesaria del s3
  const bucketName = objS3.bucket.name; //obtenemos el nombre del bucket
  const key = objS3.object.key;//obtenemos el nombre del key
  const paramenters = { Bucket:bucketName, Key:key }; //armamos los parametros necesarios para obtener la data
  const data = await s3.getObject(paramenters).promise();//obtenemos el archivo
  const body = data.Body.toString("utf-8");// asi se combierte un buffer a string
  // partimos la cadena en filas por el \n, el split nos devuelve un array
  const lines = body.split("\n");
  const listPromises = [];

  lines.forEach((line: string) => {
    const dataMedic = line.split(",");
    const newMedic = {
      id: dataMedic[0],
      name: dataMedic[1],
      lastname: dataMedic[2],
      speciality: dataMedic[3],
    };
    listPromises.push(
      dynamodb
        .put({
          TableName: "Medic-dev",
          Item: newMedic,
        })
        .promise()
    );
  });
  await Promise.all(listPromises);
  return {
    statusCode: 200,
    event
  };
};
