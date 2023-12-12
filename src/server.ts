import { createServer } from 'http';
import app from './app';
import configs from './configs';
import mongoConnect from './configs/dbConnect';
import catchEnvValidation from './utils/catchEnvValidation';

const main = async () => {
  try {
    // check env validation
    await catchEnvValidation();

    // create server
    const server = createServer(app);

    // database connection with mongoose(mongodb)
    mongoConnect();

    const { port } = configs;

    // listen server
    server.listen(port, () => {
      console.log(`Hello Boss! I am listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(`Server error: ${error}`);
  }
};

main();
