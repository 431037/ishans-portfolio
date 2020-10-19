dbPassword =
  "mongodb+srv://ishan:ishan@cluster.1cyed.mongodb.net/<dbname>?retryWrites=true&w=majority";

secretKey = "secret";
module.exports = {
  mongoURI: dbPassword,
  secret: secretKey,
};
