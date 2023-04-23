const dotenv = require("dotenv");
dotenv.config();
const { v4: uuidv4 } = require("uuid");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  PutCommand,
  DeleteCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

const docClient = new DynamoDBClient({ regions: process.env.AWS_REGION });

exports.getComment = async (req, res) => {
  //   const post_id = req.params.post_id;
  //   console.log(post_id);
  //   const params = {
  //     TableName: process.env.aws_comment_table_name,
  //     FilterExpression: "post_id = :pid",
  //     ExpressionAttributeValues: {
  //       ":pid": { S: post_id },
  //     },
  //   };

  //   try {
  //     const data = await docClient.send(new ScanCommand(params));
  //     res.send(data.Items);
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).send(err);
  //   }
  const post_id = req.params.post_id;
  const params = {
    TableName: process.env.aws_comment_table_name,
  };
  try {
    const data = await docClient.send(new ScanCommand(params));
    res.send(data.Items);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

exports.addComment = async (req, res) => {
  const comment_id = uuidv4();
  const comment_date = getTime();
  const comment_like = 0;
  const comment_dislike = 0;
  const item = {
    comment_id: comment_id,
    ...req.body,
    comment_date: comment_date,
  };
  const params = {
    TableName: process.env.aws_comment_table_name,
    Item: item,
  };
  try {
    const data = await docClient.send(new PutCommand(params));
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

exports.deleteComment = async (req, res) => {
  const comment_id = req.params.comment_id;
  const params = {
    TableName: process.env.aws_comment_table_name,
    Key: {
      comment_id: comment_id,
    },
  };
  try {
    const data = await docClient.send(new DeleteCommand(params));
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

function getTime() {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hour = now.getHours().toString().padStart(2, "0");
  const minute = now.getMinutes().toString().padStart(2, "0");
  const second = now.getSeconds().toString().padStart(2, "0");
  return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
}
