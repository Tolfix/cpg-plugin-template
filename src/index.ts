require("dotenv").config();
const BuildDir = process.cwd() + "/build";
import config from "../config.json";

// Change name of the class.
export = async function main()
{
    const Logger = await import(`${BuildDir}/lib/Logger`) as ILoggingTypes;

}
