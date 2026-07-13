import fs from "fs"
import { parse } from "yaml"
import { installPlugins, parsePluginSource } from "./quartz/plugins/loader/gitLoader.js"

const cfg: any = parse(fs.readFileSync("./quartz.config.default.yaml", "utf-8"))
const sources: string[] = (cfg.plugins || [])
  .filter((p: any) => p.enabled)
  .map((p: any) => p.source)

console.log(`Installing ${sources.length} enabled plugin(s)...`)
const specs = sources.map((s) => parsePluginSource(s))
const installed = await installPlugins(specs, { verbose: true })
console.log(`\nDONE: ${installed.size}/${sources.length} plugins installed`)
if (installed.size !== sources.length) process.exit(1)
