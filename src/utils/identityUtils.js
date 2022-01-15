import { Core } from '@self.id/core'
const SID = require('@self.id/web')

const caip10Links = {
    ethereum: "@eip155:1",
    bitcoin: '@bip122:000000000019d6689c085ae165831e93',
    cosmos: '@cosmos:cosmoshub-3',
    kusama: '@polkadot:b0a8d493285c2df73290dfb7e61f870f'
}

async function getRecord({
    ceramicNetwork = 'testnet-clay',
    network = 'ethereum',
    client = null,
    schema = 'basicProfile',
    address = null
} = {}) {
    let ethereum = window.ethereum;
    let record;

    if (!ethereum) return {
        error: "No ethereum wallet detected"
    }

    if (!client) {
        client = new Core({ ceramic: ceramicNetwork })
    }

    if (!address) {
        [address] = await ethereum.request({ method: 'eth_requestAccounts' })
    }
    const capLink = caip10Links[network]
    const did = await client.getAccountDID(`${address}${capLink}`)

    record = await client.get(schema, did)
    console.log('record: ', record)
    return {
        record, error: null
    }
}

export {
    getRecord
}