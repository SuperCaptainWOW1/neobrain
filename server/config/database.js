module.exports = (mongoose, config) => {
  const db = mongoose.connection;
  mongoose.Promise = Promise;
  mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    promiseLibrary: global.Promise
  });
  db.on("error", err =>
    console.log(`Connection to Neobrain database failed: ${err}`)
  );
  db.on("connected", () => console.log("Connected to Neobrain database"));
  db.on("disconnected", () =>
    console.log("Disconnected from Neobrain database")
  );
  process.on("SIGINT", () => {
    db.close(() => {
      console.log("Neobrain terminated API, connection closed");
      process.exit(0);
    });
  });
};
