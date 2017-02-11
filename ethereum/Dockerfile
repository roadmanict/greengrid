FROM ethereum/client-go

RUN apt-get update && \
    apt-get install -y software-properties-common python-software-properties && \
    add-apt-repository ppa:ethereum/ethereum && \
    apt-get update && \
    apt-get install -y solc

COPY genesis.json /root
COPY password /root
COPY static-nodes.json /root/static-nodes.json
COPY start.sh /
RUN chmod +x /start.sh

ENTRYPOINT /start.sh
