# Dungeon Crawler

## Making the game

1.  The developer environment:

    - Install the latest version of [Node.js](https://nodejs.org/en/). npm will be installed allongside Node.js.
    - Install Vite globally:

    ```bash
    npm i -g create vite@latest
    ```

2.  Create a new Vite project:

    ```bash
    npm create vite@latest project -- --template react-ts
    cd project
    ```

3.  Install Phaser 3 as a dependency:

    ```bash
    npm i phaser
    ```

4.  Create a Phaser component:

    Create a new file named PhaserGame.tsx inside the src folder. This file will contain the Phaser game component:

    ```typescript
    import React, { useEffect } from "react";
    import Phaser from "phaser";

    const PhaserGame: React.FC = () => {
      useEffect(() => {
        const config: Phaser.Types.Core.GameConfig = {
          type: Phaser.AUTO,
          width: 800,
          height: 600,
          parent: "phaser-game",
          scene: {
            create: createScene,
          },
        };

        new Phaser.Game(config);

        function createScene() {
          this.add.text(50, 50, "Hello Phaser!", {
            font: "48px Arial",
            fill: "#000000",
          });
        }
      }, []);

      return <div id="phaser-game" />;
    };

    export default PhaserGame;
    ```

5.  Use the Phaser component in your app:

    Open `src/App.tsx`, import and use the `PhaserGame` component:

    ```typescript
    import React from "react";
    import PhaserGame from "./PhaserGame";

    const App: React.FC = () => {
      return (
        <div>
          <PhaserGame />
        </div>
      );
    };

    export default App;
    ```

6.  Setup a Node.js server with Express and MongoDB:

    Create a new folder named `server` in the root of your project. Inside the `server` folder, initialize a new package.json file and install the required dependencies:

    ```bash
    cd server
    npm init -y
    npm install express mongoose
    npm install --save-dev typescript ts-node @types/express @types/mongoose
    ```

7.  Configure Typescript for the server:

    Create a new file named `tsconfig.json` in the `server` folder and add the following configuration:

    ```json
    {
      "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "outDir": "dist"
      },
      "include": ["src"]
    }
    ```

8.  Install MongoDB in your system:

    Follow the instructions in the [official MongoDB documentation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/#install-mongodb-community-edition) to install MongoDB in your system. This will install the DBMS alongside the MongoDB Shell, which is a command line tool to interact with the database. Alternatively, you can install MongoDB Compass, a GUI for MongoDB.

    MongoDB Compass will require this extra step to work properly:

    ```bash
    cd C:\
    md "\data\db"
    "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath="c:\data\db"
    ```

9.  Create a MongoDB database:

    Open the MongoDB Shell and create a new database named `dungeon-crawler`:

    ```bash
    use dungeon-crawler
    ```

    OR

    Open MongoDB Compass and create a new database named `dungeon-crawler`, it will require to create a new collection. A collection is a group of documents stored in MongoDB, and can be thought of as the equivalent of a table in a relational database.

10. Create the `server` entry point:

    Inside the `server` folder, create a new folder named `src` and a new file named `index.ts` inside it. This file will contain the entry point of the server:

    ```typescript
    import express from "express";
    import mongoose from "mongoose";

    const app = express();
    const PORT = process.env.PORT || 5000;
    const MONGO_URI = "<your-mongodb-connection-string>";

    mongoose
      .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("Connected to MongoDB"))
      .catch((error) => console.error("Error connecting to MongoDB:", error));

    app.get("/", (req, res) => {
      res.send("Hello from the Node.js server!");
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port \${PORT}`);
    });
    ```

    The `MONGO_URI` variable should contain the connection string to your MongoDB database. You can find it in MongoDB Compass by clicking on the `Connect` button in the top right corner of the window.

11. Add scripts to run the server:

    Open the `server/package.json` file and add the following scripts:

    ```json
    "scripts": {
    	"start": "ts-node src/index.ts",
    	"build": "tsc",
    	"serve": "node dist/index.js"
    }
    ```

    Now you can run the server with `npm start` from the `server` folder.

12. Run the Vite development server and the Node.js server simultaneously:

    To run both the Vite development server and the Node.js server at the same time, you can use a tool like `concurrently`. Install it as a development dependency in your main project folder:

    ```bash
    npm install --save-dev concurrently
    ```

    Then, open the `package.json` file in the root of your project and update the `scripts` section:

    ```json
    "scripts": {
    	"start": "concurrently \"npm run dev\" \"cd server && npm start\"",
    	"dev": "vite",
    	"build": "tsc && vite build",
    	"lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    	"serve": "vite preview"
    },
    ```

    Now you can run the development server with `npm start` from the root of your project.
