const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const resolver = {
  Mutation: {
    addPost: async (ctx) => {
      const uid = uuidv4();
      var params = {
        Item: {
          id: uid,
          title: ctx.arguments.title,
          description: ctx.arguments.description,
        },
        TableName: process.env.STORAGE_POST_NAME,
      };
      return await docClient
        .put(params)
        .promise()
        .then((data) => {
          return {
            id: uid,
            title: ctx.arguments.title,
            description: ctx.arguments.description,
          };
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    updatePost: async (ctx) => {
      var params = {
        TableName: process.env.STORAGE_POST_NAME,
        Key: { id: ctx.arguments.id },
        UpdateExpression: "set title   = :title , description = :description",
        ExpressionAttributeValues: {
          ":title": ctx.arguments.title,
          ":description": ctx.arguments.description,
        },
      };
      return await docClient
        .update(params)
        .promise()
        .then((data) => {
          return {
            id: ctx.arguments.id,
            title: ctx.arguments.title,
            description: ctx.arguments.description,
          };
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    deletePost: async (ctx) => {
      var params = {
        TableName: process.env.STORAGE_POST_NAME,
        Key: { id: ctx.arguments.id },
      };
      return await docClient
        .delete(params)
        .promise()
        .then((data) => {
          console.log(data);
          return {
            id: ctx.arguments.id,
          };
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    addComment: async (ctx) => {
      const uid = uuidv4();
      var params = {
        Item: {
          id: uid,
          content: ctx.arguments.content,
          postId: ctx.arguments.postId,
        },
        TableName: process.env.STORAGE_COMMENT_NAME,
      };
      return await docClient
        .put(params)
        .promise()
        .then((data) => {
          return {
            id: uid,
            content: ctx.arguments.content,
            postId: ctx.arguments.postId,
          };
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    updateComment: async (ctx) => {
      var params = {
        TableName: process.env.STORAGE_COMMENT_NAME,
        Key: { id: ctx.arguments.id },
        UpdateExpression: "set content = :content",
        ExpressionAttributeValues: {
          ":content": ctx.arguments.content,
        },
      };
      return await docClient
        .update(params)
        .promise()
        .then((data) => {
          return {
            id: ctx.arguments.id,
            content: ctx.arguments.content,
          };
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    deleteComment: async (ctx) => {
      var params = {
        TableName: process.env.STORAGE_COMMENT_NAME,
        Key: { id: ctx.arguments.id },
      };
      return await docClient
        .delete(params)
        .promise()
        .then((data) => {
          return {
            id: ctx.arguments.id,
          };
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
  },
  Query: {
    getPosts: async () => {
      var params = {
        TableName: process.env.STORAGE_POST_NAME,
      };
      const scanResults = [];
      let items;
      do {
        items = await docClient.scan(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
      } while (typeof items.LastEvaluatedKey !== "undefined");
      return scanResults;
    },
    getPost: async (ctx) => {
      var params = {
        TableName: process.env.STORAGE_POST_NAME,
        Key: { id: ctx.arguments.id },
      };
      const scanResults = [];
      let items;
      do {
        items = await docClient.scan(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
      } while (typeof items.LastEvaluatedKey !== "undefined");
      return scanResults;
    },
  },
  Post: {
    comments: async (ctx) => {
      console.log("ctx source id", ctx.source.id);
      var params = {
        TableName: process.env.STORAGE_COMMENT_NAME,
        IndexName: "postId-index",
        KeyConditionExpression: "postId  = :hkey",
        ExpressionAttributeValues: {
          ":hkey": ctx.source.id,
        },
      };
      const scanResults = [];
      let items;
      do {
        items = await docClient.query(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
      } while (typeof items.LastEvaluatedKey !== "undefined");
      return scanResults;
    },
  },
};
exports.handler = async (event) => {
  // console.log("event===", event);
  const typeHandler = resolver[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return await resolver(event);
    }
  }
  throw new Error("Resolver not found.");
};
