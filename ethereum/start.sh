#!/bin/bash
if [ ! -d "/root/.ethereum/geth" ]; then
    echo "writing new genesis block";
    /geth init /root/genesis.json;
    /geth --password /root/password account new
fi

/geth --mine \
    --minerthreads=1 \
    --bootnodes=enode://29cddb14c597c2c285f3ccdb2505798777cf42c7b22ffad141f60185de93a6602b4f87a40ef5779a199c7b83772ee5edb2522b7ec35eac49f50efde3f92aafaf@185.110.174.70:30303;