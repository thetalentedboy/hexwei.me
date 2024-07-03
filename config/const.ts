import { Config } from "../etc/config"
import { readYaml } from "../app/api/post/[[...slug]]/utils"
import path from "path"

export const config = readYaml<Config>(path.resolve("./etc/config.yaml"))
