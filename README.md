# European Financial Transparency Gateway based on Steem Blockchain
![eftg steem blockchain](https://user-images.githubusercontent.com/31005088/42443325-6c636a54-836d-11e8-8d75-fcd424adeecc.png)


This should be a simple project! Now let's make it complicated...because we like challenges! 

The scope of this project is to build a new web-based app for investors in european companies, with a simple to use frontend and useful search/reporting features. More details here: https://github.com/scr53005/eftg-steem/wiki/Introduction-to-European-Financial-Transparency-Gateway-(ETFG)


Firstly let's define the simple tasks:

Task 1 (documentation). How to build Private Steem Blockchain for corporate projects. [already assigned]

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


The exact number of each type of peer and the number of virtual machines needed will be discus after the first proposal of the architecure. The private steem network will have its own chainid, tokens supply and config files.
This private steem network will be used in corporate projects, so the proposed architecture should take into consideration the needed High Availability, Security, and Scalability features. (also the need of a VPN network)  
After the documentation is ready, we will follow all the stepts, using VMs in Azure, Amazon, and/or oher cloud provides and we will deploy the private steem network. Feedback will be provided to the contributor and possible additional details will be asked. 
After the private steem network will be up and running and the documenation will be reviewed, the contributor will publish a post on steemit using the title "The user guide for newby on how to build a private steem blockchain for corporate projects". In this way it could be helpful for the whole community and for everyone who wants to use the steem technology for corporate/enterprise/private projects.

Deadline: 1 week. 

Get in touch with us on : https://discord.gg/pV5hgDA

Task request: https://steemit.com/utopian-io/@utopian.tasks/how-to-build-a-private-steem-blockchain-european-financial-transparency-gateway-steem-bounty


Task solution: https://steemit.com/utopian-io/@jga/the-user-guide-for-a-newbie-on-how-to-build-a-private-steem-blockchain-for-corporate-projects
and 
https://steemit.com/utopian-io/@jga/the-user-guide-for-a-newbie-on-how-to-build-a-private-steem-blockchain-for-corporate-projects-part-2

___________________________________________________________________________________________________________


Task 2. How to use condenser with a private steem blockchain. 

The goal of this task is to provide a clear documentation on how to setup a steem condenser (steemit or busy) to work with a private steem blockhain network. As an example, it will be tested with our existing private network.  <a href= "https://github.com/scr53005/eftg-steem/blob/master/config/HOWTO.md"> You find here all the details to connect with. </a>

It is required to document all the steps needed to install, configure and start the steemit/busy condenser on this specific steem private network.

Deadline: 1 week starting for the decision to select someone to work on. 

Get in touch with us on : https://discord.gg/pV5hgDA

Steemit Post: https://steemit.com/utopian-io/@smartiot/task-2-how-to-use-condenser-with-a-private-steem-blockchain

____________________________________________________________________________________________________________


### Task3. How to use a BlockExplorer (steemdb) with a private Steem Blockchain from European Financial Transparency Gateway (EFTG) Project


#### Repository
Utopian is running this task request on behalf of the Blockchain Competence Centre of the European Commission for the European Financial Transparency Gateway initiative.

#### Rewards
Rewards generated by this task request will be sent as Liquid STEEM to the task solver once the task is completed.

Additional rewards will be generated by publishing "The user guide for a newbie on how to use the BlockExplorer (steemdb) with a private steem blockchain" using the tags utopian-io and tutorials on the task completed.

#### Details

The scope of this task is to adapt (configure and modify) the existing BlockExplorer - SteemDB to work with a private blockchain with custom chain ID and assets. It will be tested with our existing private network. You find here all the details to connect with.

#### Components

The existing documentation of steemdb in https://github.com/aaroncox/steemdb is describing how to run a local instance of steembd that automatically connects to the public steem network. We focus on having the tutorial on what it needs to be modified in source code and/or in the config files, in order to be able to connect the steemdb with a private steem blockchain network, like the one that we are running on EFTG project.

#### Communication

Get in touch with us on https://discord.gg/pV5hgDA
Before starting any work, please get in touch with us, to avoid tasks or subtasks overlap.

 

#### GitHub

https://github.com/scr53005/eftg-steem

_____________________________________________________________________________________________________________________

Task 4. TBD
- documenting all the steps needed to install, configure and start the steemconnect on this specific steem private network and how to create new accounts.

Deadline: 1 week. 

Get in touch with us on : https://discord.gg/pV5hgDA

Other tasks to be defined: 
1. Modity the condenser to accept [only] pdf upload + adding a security function to, in the URL, to be embedded the HASH of the pdf content. 
2. Modify the condenser to accept multiple filds input (company name, LEI, revenue, etc [brag-token....]. 
3. Design for UI/UX [the frontend for investors] - see the quasar folder and its readme.

Task x. Build the input web-based module. Details: comming soon...

Task x. Build the database for queries. Details: comming soon...

Task x. Build the reporting web-based module. Details: comming soon...


