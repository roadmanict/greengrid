FROM ethereum/client-go

COPY genesis.json /root
COPY password /root
COPY static-nodes.json /root/static-nodes.json
COPY start.sh /
RUN chmod +x /start.sh

ENTRYPOINT /start.sh
