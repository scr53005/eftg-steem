Using the public EFTG Docker image
==================================

 # Pull latest docker image from EFTG's public repository
 docker pull blkcc/eftg:latest

 # Clone EFTG git repository that contains the necessary config files
 git clone https://github.com/scr53005/eftg-steem.git

 # Create a local directory that will store the EFTG Blockchain configuration, block file and shared_memory file
 mkdir ~/eftg

 # Copy the configuration for the type of node you'll like to use into the directory we just created
 cp ~/eftg-steem/config/seed/config.ini ~/eftg/ # (for a seed node - not available as a separate option in EFTG)
 # or
 cp ~/eftg-steem/config/witness/config.ini ~/eftg/ # (for a seed+witness node - basic option for OAMs)
 # or
 cp ~/eftg-steem/config/full-node/config.ini ~/eftg/ # (for a seed+witness node - basic option for OAMs)

 # Edit the configuration and change all lines that contain the [replace] comment
 # In order to be able to connect to our Infra, please provide us your public external IP address. You can contact us [here] 
 # (https://discord.gg/F4C3zBK "EFTG's discord server")
 vim ~/eftg/config.ini

 # Finally, let's run the container !
 - docker run -p 2001:2001 -p 8090:8090 -v ~/eftg:/eftg -d --name seed -t blkcc/eftg:latest
   /usr/local/eftgd-default/bin/steemd -d /eftg

Compiling from Source
=====================

  # The adapted Steem source is located in the steem directory inside the git repository
  - cd ~/eftg-steem/steem

  # Instructions on how to compile are not provided since the Docker image is the recommended way
  # Anyhow, you can have a look at the Dockerfile and continue from there.  
