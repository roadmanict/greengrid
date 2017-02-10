#!/bin/bash
if [ ! -d "/root/.ethereum/geth" ]; then
    echo "writing new genesis block";
    /geth init /root/genesis.json;
    /geth --password /root/password account new
    mv /root/static-nodes.json /root/.ethereum/static-nodes.json
fi

/geth --mine \
    --minerthreads=1 \
    --rpc \
    --rpcaddr=0.0.0.0;