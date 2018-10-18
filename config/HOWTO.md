Using the public EFTG Docker image
==================================
 # Recommended requirments 
  Witness VM : 2 x vCPU, 8 GB RAM, 128 Gb SDD, Linux Ubuntu 18.04 LTS, Docker Installed, a dedicated user account (NOT root)
  FullRPCnode VM: 2x vCPU, 16 GB RAM, 256 GB SDD, Linux Ubuntu 18.04 LTS, Docker Installed, a dedicated user account (NOT root) 
 
 # Pull latest docker image from EFTG's public repository
  docker pull blkcc/eftg:latest
 ### If the machine does not have access to the internet we can provide access to a private repository

 # Clone EFTG git repository that contains the necessary config files
 git clone https://github.com/scr53005/eftg-steem.git

 # Create a local directory that will store the EFTG Blockchain configuration, block file and shared_memory file
 mkdir ~/eftg

 # Copy the configuration for the type of node you'll like to use into the directory we just created
 cp ~/eftg-steem/config/witness/config.ini ~/eftg/ # (for a seed+witness node - intermediate option for OAMs)
 # or
 cp ~/eftg-steem/config/full-node/config.ini ~/eftg/ # (for a seed+full RPC node - advanced option for OAMs)
 # or
 cp ~/eftg-steem/config/seed/config.ini ~/eftg/ # (only for a seed node - not available as a separate option in EFTG)
 
 # Edit the configuration and change the lines that contain the [replace] comment
 # In the case of a witness node you will replace the "seed-node" lines first, in order to connect to the network and to get the private key. 
 
vim ~/eftg/config.ini



 # Alternatively, we can provide a config.ini with the seed nodes, the witness username and private key

 # Finally, let's run the container !
 docker run -p 2001:2001 -p 8090:8090 -v ~/eftg:/eftg -d --name witness -t blkcc/eftg:latest /usr/local/eftgd-default/bin/steemd -d /eftg

Compiling from Source
=====================

  # The adapted Steem source is located in the steem directory inside the git repository
  - cd ~/eftg-steem/steem

  # Instructions on how to compile are not provided since the Docker image is the recommended way
  # Anyhow, you can have a look at the Dockerfile and continue from there.  
