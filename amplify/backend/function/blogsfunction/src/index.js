const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const resolver = {
  Mutation: {
    addBlog: async (ctx) => {
      const uid = uuidv4();
      var params = {
        Item: {
          id: uid,
          name: ctx.arguments.name,
        },
        TableName: process.env.STORAGE_BLOG_NAME,
      };
      return await docClient
        .put(params)
        .promise()
        .then((data) => {
          console.log("ctx arg ===", ctx.arguments);
          return { id: uid, name: ctx.arguments.name };
        })
        .catch((err) => {
          throw new Error(err);
        });
    },

    addPost: async (ctx) => {
      const uid = uuidv4();
      var params = {
        Item: {
          id: uid,
          title: ctx.arguments.title,
          blogId: ctx.arguments.blogId,
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
            blogId: ctx.arguments.blogId,
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
  },
  Query: {
    getBlogs: async (ctx) => {
      var params = {
        TableName: process.env.STORAGE_BLOG_NAME,
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

    getBlog: async (ctx) => {
      console.log(ctx);
      var params = {
        TableName: process.env.STORAGE_BLOG_NAME,
        Key: { id: ctx.arguments.id },
      };
      return await docClient
        .get(params)
        .promise()
        .then((data) => {
          console.log("data", data);
          return data;
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
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
        TableName: process.env.STORAGE__NAME,
        Key: { id: ctx.arguments.id },
      };
      return await docClient
        .get(params)
        .promise()
        .then((data) => {
          console.log("data", data);
          return data;
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
  },
  Blog: {
    posts: (ctx) => {
      console.log("ctx", ctx);
    },
  },
};
exports.handler = async (event, context) => {
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
