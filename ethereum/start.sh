#!/bin/bash
if [ ! -d "/root/.ethereum/geth" ]; then
    echo "writing new genesis block";
    /geth init /root/genesis.json;
    /geth --password /root/password account new
fi

/geth --mine \
    --minerthreads=1 \
    --bootnodes=enode://419826c720ee949c7efde76e53ab0403ff9b8feae94a6b128daf0a91fb1d69d8e3a36466acb587cc7315b33cce58ae913cb29d52e0a66f077b171624ac974aa9@185.110.174.70:30303;