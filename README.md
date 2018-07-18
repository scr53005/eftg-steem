# European Financial Transparency Gateway based on Steem Blockchain
![eftg steem blockchain](https://user-images.githubusercontent.com/31005088/42443325-6c636a54-836d-11e8-8d75-fcd424adeecc.png)


This should be a simple project! Now let's make it complicated...because we like challenges! 

The scope of this project is to build a new web-based app for investors in european companies, with a simple to use frontend and useful search/reporting features. More details here: https://github.com/scr53005/eftg-steem/wiki/Introduction-to-European-Financial-Transparency-Gateway-(ETFG)


Firstly let's define the simple tasks:

Task 1 (documentation). How to build Private Steem Blockchain for corporate projects. 
Details: the goal is to provide an extensive documentation on how to build a private steem network [mainnet flag, not testnet flag] with multiple peers (withnesses, full nodes, seed nodes, client CLI) on different virtual machines with public IPs. 
The contributor should provide:
- the architecture, 
- minimum requirments for the VMs computing power and storage, 
- firewall setup (opened ports and protocols) requirements for operating system and also for all dependencies, 
- step by step instructions (command lines) on how to start and connect different type of peers, 
- step by step instructions (command lines) on how to generate the genesis block (first block) and the first key pair. 
- specifying how to modify the number of minimum/maximum witnesses based on different network topologies. 
- specifying how to modify the blocksize (if needed for some specific projects). 
- all the config files. 
- documenting all the steps needed to install, configure and start the steemit condenser on this specific steem private network.
- documenting all the steps needed to install, configure and start the steemdb blockexplorer on this specific steem private network.
- documenting all the steps needed to install, configure and start the steemconnect on this specific steem private network and how to create new accounts.

The exact number of each type of peer and the number of virtual machines needed will be discus after the first proposal of the architecure. The private steem network will have its own chainid, tokens supply and config files.
This private steem network will be used in corporate projects, so the proposed architecture should take into consideration the needed High Availability, Security, and Scalability features. (also the need of a VPN network)  
After the documentation is ready, we will follow all the stepts, using VMs in Azure, Amazon, and/or oher cloud provides and we will deploy the private steem network. Feedback will be provided to the contributor and possible additional details will be asked. 
After the private steem network will be up and running and the documenation will be reviewed, the contributor will publish a post on steemit using the title "The user guide for newby on how to build a private steem blockchain for corporate projects". In this way it could be helpful for the whole community and for everyone who wants to use the steem technology for corporate/enterprise/private projects.  
Deadline: 1 week. 
Get in touch with us on : https://discord.gg/bw8Uyj


Task 2. Build the input web-based module. Details: comming soon...
Task 3. Build the database for queries. Details: comming soon...
Task 4. Build the reporting web-based module. Details: comming soon...


