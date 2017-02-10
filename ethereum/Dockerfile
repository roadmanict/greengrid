FROM ethereum/client-go

COPY genesis.json /root
COPY password /root

COPY start.sh /
RUN chmod +x /start.sh

ENTRYPOINT /start.sh
