FROM phusion/baseimage:0.9.19

ARG STEEM_STATIC_BUILD=ON
ENV STEEM_STATIC_BUILD ${STEEM_STATIC_BUILD}

ENV LANG=en_US.UTF-8

RUN \
    apt-get update && \
    apt-get install -y \
        autoconf \
        automake \
        autotools-dev \
        bsdmainutils \
        build-essential \
        cmake \
        doxygen \
        git \
        libboost-all-dev \
        libreadline-dev \
        libssl-dev \
        libtool \
        liblz4-tool \
        ncurses-dev \
        pkg-config \
        python3 \
        python3-dev \
        python3-jinja2 \
        python3-pip \
        nginx \
        fcgiwrap \
        awscli \
        jq \
        wget \
        gdb \
		libboost-chrono-dev \
		libboost-context-dev \
		libboost-coroutine-dev \
		libboost-date-time-dev \
		libboost-filesystem-dev \
		libboost-iostreams-dev \
		libboost-locale-dev \
		libboost-program-options-dev \
		libboost-serialization-dev \
		libboost-signals-dev \
		libboost-system-dev \
		libboost-test-dev \
		libboost-thread-dev \
		g++ \
		git \
		libbz2-dev \
		libsnappy-dev \
		make \
    && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    pip3 install gcovr

ADD . /usr/local/src/steem

RUN \
    cd /usr/local/src/steem && \
	git checkout stable && \
    git submodule update --init --recursive && \
    mkdir build_eftg && \
    cd build_eftg && \
    cmake \
        -DCMAKE_BUILD_TYPE=Release \
        -DLOW_MEMORY_NODE=OFF \
        -DCLEAR_VOTES=ON \
        -DSKIP_BY_TX_ID=ON \
        -DSTEEM_STATIC_BUILD=${STEEM_STATIC_BUILD} \
        .. && \
    make -j$(nproc) steemd cli_wallet && \
	make install && \
    rm -rf /usr/local/src/steem/build_eftg

RUN \
    apt-get remove -y \
        automake \
        autotools-dev \
        bsdmainutils \
        build-essential \
        cmake \
        doxygen \
        dpkg-dev \
        git \
        libboost-all-dev \
        libc6-dev \
        libexpat1-dev \
        libgcc-5-dev \
        libhwloc-dev \
        libibverbs-dev \
        libicu-dev \
        libltdl-dev \
        libncurses5-dev \
        libnuma-dev \
        libopenmpi-dev \
        libpython-dev \
        libpython2.7-dev \
        libreadline-dev \
        libreadline6-dev \
        libssl-dev \
        libstdc++-5-dev \
        libtinfo-dev \
        libtool \
        linux-libc-dev \
        m4 \
        make \
        manpages \
        manpages-dev \
        mpi-default-dev \
        python-dev \
        python2.7-dev \
        python3-dev \
    && \
    apt-get autoremove -y && \
    rm -rf \
        /var/lib/apt/lists/* \
        /tmp/* \
        /var/tmp/* \
        /var/cache/* \
        /usr/include \
        /usr/local/include

RUN useradd -s /bin/bash -m -d /var/lib/steemd steemd

RUN mkdir /var/cache/steemd && \
    chown steemd:steemd -R /var/cache/steemd

ENV HOME /var/lib/steemd
RUN chown steemd:steemd -R /var/lib/steemd

VOLUME ["/var/lib/steemd"]

# rpc service:
EXPOSE 8090
# p2p service:
EXPOSE 2001

# the following adds lots of logging info to stdout
#ADD contrib/config-for-docker.ini /etc/steemd/config.ini
#ADD contrib/fullnode.config.ini /etc/steemd/fullnode.config.ini
#ADD contrib/config-for-broadcaster.ini /etc/steemd/config-for-broadcaster.ini
#ADD contrib/config-for-ahnode.ini /etc/steemd/config-for-ahnode.ini

# add normal startup script that starts via sv
#ADD contrib/steemd.run /usr/local/bin/steem-sv-run.sh
#RUN chmod +x /usr/local/bin/steem-sv-run.sh

# add nginx templates
#ADD contrib/steemd.nginx.conf /etc/nginx/steemd.nginx.conf
#ADD contrib/healthcheck.conf.template /etc/nginx/healthcheck.conf.template

# add PaaS startup script and service script
#ADD contrib/startpaassteemd.sh /usr/local/bin/startpaassteemd.sh
#ADD contrib/paas-sv-run.sh /usr/local/bin/paas-sv-run.sh
#ADD contrib/sync-sv-run.sh /usr/local/bin/sync-sv-run.sh
#ADD contrib/healthcheck.sh /usr/local/bin/healthcheck.sh
#RUN chmod +x /usr/local/bin/startpaassteemd.sh
#RUN chmod +x /usr/local/bin/paas-sv-run.sh
#RUN chmod +x /usr/local/bin/sync-sv-run.sh
#RUN chmod +x /usr/local/bin/healthcheck.sh

# new entrypoint for all instances
# this enables exitting of the container when the writer node dies
# for PaaS mode (elasticbeanstalk, etc)
# AWS EB Docker requires a non-daemonized entrypoint
#ADD contrib/steemdentrypoint.sh /usr/local/bin/steemdentrypoint.sh
#RUN chmod +x /usr/local/bin/steemdentrypoint.sh
#CMD /usr/local/bin/steemdentrypoint.sh
