
import { patract, network } from 'redspot';

const { getContractFactory } = patract;
const { createSigner, keyring, api } = network;

const uri =
    'bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice';

async function run() {
    await api.isReady;

    const signer = createSigner(keyring.createFromUri(uri));

    // deploy math
    console.log('Now deploy math contract');
    const mathContractFactory = await getContractFactory('math', signer);
    const balance1 = await api.query.system.account(signer.address);
    console.log('Balance: ', balance1.toHuman());

    const mathContract = await mathContractFactory.deployed('new', {
        gasLimit: '200000000000',
        value:    '1000000000000',
        salt: 'Coinversation Math'
    });

    console.log('');
    console.log('Deploy math contract successfully.');
    console.log(
        'The contract address: ',
        mathContract.address.toString()
    );
    console.log(
        'The contract code hash: ',
        mathContract.abi.project.source.hash.toString()
    );

    // deploy base
    console.log('Now deploy base contract');
    const baseContractFactory = await getContractFactory('base', signer);
    const balance2 = await api.query.system.account(signer.address);
    console.log('Balance: ', balance2.toHuman());

    const baseContract = await baseContractFactory.deployed('new', mathContract.address, {
        gasLimit: '200000000000',
        value:    '1000000000000',
        salt: 'Coinversation Base'
    });

    console.log('');
    console.log('Deploy base contract successfully.');
    console.log(
        'The contract address: ',
        baseContract.address.toString()
    );
    console.log(
        'The contract code hash: ',
        baseContract.abi.project.source.hash.toString()
    );

    // deploy factory
    // deploy token
    console.log('Now deploy token contract');
    const balance3 = await api.query.system.account(signer.address);
    console.log('Balance: ', balance3.toHuman());

    const tokenFactory = await getContractFactory('token', signer);
    const tokenContract = await tokenFactory.deployed('new', mathContract.address, {
        gasLimit: '200000000000',
        value:    '1000000000000',
        salt: 'Coinversation Token'
    });

    console.log('');
    console.log('Deploy token contract successfully.');
    console.log(
        'The contract address: ',
        tokenContract.address.toString()
    );
    console.log(
        'The contract code hash: ',
        tokenContract.abi.project.source.hash.toString()
    );

    // deploy pool
    console.log('Now deploy pool contract');
    const balance4 = await api.query.system.account(signer.address);
    console.log('Balance: ', balance4.toHuman());

    const poolFactory = await getContractFactory('pool', signer);
    const poolContract = await poolFactory.deployed('new', mathContract.address, baseContract.address, tokenContract.address, {
        gasLimit: '200000000000',
        value:    '1000000000000',
        salt: 'Coinversation Pool'
    });
    console.log('');
    console.log('Deploy pool contract successfully.');
    console.log(
        'The contract address: ',
        poolContract.address.toString()
    );
    console.log(
        'The contract code hash: ',
        poolContract.abi.project.source.hash.toString()
    );

    console.log('Now deploy factory contract');
    const balance5 = await api.query.system.account(signer.address);
    console.log('Balance: ', balance5.toHuman());

    const contractFactory = await getContractFactory('factory', signer);
    const contract = await contractFactory.deployed('new', 1, mathContract.address,
        baseContract.address, tokenContract.abi.project.source.hash, poolContract.abi.project.source.hash, {
        gasLimit: '200000000000',
        value:    '1000000000000',
        salt: 'Coinversation Factory'
    });

    console.log('');
    console.log('Deploy factory contract successfully.');
    console.log(
        'The contract address: ',
        contract.address.toString()
    );
    console.log(
        'The contract code hash: ',
        contract.abi.project.source.hash.toString()
    );
    console.log('');

    const balance6 = await api.query.system.account(signer.address);
    console.log('Balance: ', balance6.toHuman());

    api.disconnect();
}

run().catch((err) => {
    console.log(err);
});