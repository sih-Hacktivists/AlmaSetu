import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./db/connect.js";
import { server } from "./app.js"; // Import only the server
import axios from "axios";

// for render
const url = `${process.env.RENDER_URL}`;
const interval = 30000; // Interval in milliseconds (30 seconds)

function reloadWebsite() {
    axios
        .get(url)
        .then((response) => {
            console.log(
                `Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`
            );
        })
        .catch((error) => {
            console.error(
                `Error reloading at ${new Date().toISOString()}:`,
                error.message
            );
        });
}

setInterval(reloadWebsite, interval);

// Connect to the database
connectDB()
    .then(() => {
        server.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(`MONGODB connection failed: `, err);
    });
