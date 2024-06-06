import { Config } from "../etc/config"
import { readYaml } from "../app/api/post/[...slug]/utils"

export const config = readYaml<Config>("./etc/config.yaml")
