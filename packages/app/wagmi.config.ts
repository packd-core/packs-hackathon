import { defineConfig } from '@wagmi/cli'
import { hardhat, react } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'app/abi/generated.ts',
  // contracts: [
  //   {
  //     name: 'PackMain',
  //     abi: [

  //     ],
  //   }
  // ],
  plugins: [
    hardhat({
      project: '../contracts',
    }),
    react()
  ],
})
