This file describes in plain English important changes which need to be implemented in EFTG with respect to the steem code base
These changes refer to a certain idea of internal steem concepts as I am not aware of any architectural model of steem. 
Therefore, steem concepts are tentative, inferred from the functioning of the main blockchain

# Account
One of the central entities of steem is the account - it has an account name, a set of keys, authorities, etc.
However there is only one type of account, all accounts are created equal. The only differentiator is the ammount of assets they own.
Provided an account owns enough assets, it can execute any transaction.

## Role
However in the EFTG system certain actors will own the system and maybe also operate it, others will just operate it 
but would not be allowed ownership and yet others might at some point be allowed certain transactions but not owning nor operating.
This is typically addressed by introducing the concept of "role". This complexifies the code but is hard to avoid.
When executing a transaction, such as for instance transfer_to_vesting(), we'll need to assert account.has_role(owner)
This way, the "witnessing" and other operations can be outsourced to third parties who should not be able to use their rewards
in order to take control of the system by choosing to "power up"
  
