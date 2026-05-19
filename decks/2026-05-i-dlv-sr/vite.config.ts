import { defineConfig, searchForWorkspaceRoot } from 'vite'

const cwd = process.cwd()
const parent = cwd.slice(0, cwd.lastIndexOf("/"))
export default defineConfig({
    server: {
        fs: {
            allow: [
                // search up for workspace root
                searchForWorkspaceRoot(parent),
                // your custom rules
                searchForWorkspaceRoot(cwd),
            ],
        },
    },
})
