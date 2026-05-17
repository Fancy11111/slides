import { defineConfig, searchForWorkspaceRoot } from 'vite'

const cwd = process.cwd()
const parent = cwd.slice(0, cwd.lastIndexOf("/"))
console.log(searchForWorkspaceRoot(parent))
export default defineConfig({
    server: {
        fs: {
            allow: [
                // search up for workspace root
                searchForWorkspaceRoot(parent),
                
                // your custom rules
            ],
        },
    },
})
