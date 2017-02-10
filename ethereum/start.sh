#!/bin/bash
if [ ! -d "/root/.ethereum/geth" ]; then
    echo "writing new genesis block";
    /geth init /root/genesis.json;
fi

/geth;