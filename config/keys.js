dbPassword =
  "mongodb+srv://ishan:ishan@cluster.1cyed.mongodb.net/<dbname>?retryWrites=true&w=majority";

secret = "secret";
module.exports = {
  mongoURI: dbPassword,
  secret: this.secret,
};
