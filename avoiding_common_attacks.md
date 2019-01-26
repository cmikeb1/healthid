# Avoiding Common Attacks

Because the app at this point doesn't directly deal with the transfer of cryptocurrency, 
it is not directly susceptible to many common attacks seeking to steal these types of funds.

The more direct problem is one of data security:

* Can a user's HealthID be edited by another user?
* Can an unauthorized user access someone's HealthID?

The answer to the first question is **no**.  Since the contract only allows
one HealthID per ethereum address, it uses `msg.sender` to pull the identity of the end
user.  The `msg.sender` is guaranteed to be from the originating address since the message 
is signed by that addresses' private key.

The answer to the second question is **yes**.  We'll call this a "known 
vulnerability".   Not only is this encouraged through the use of the `public` modifier
on the object used to store user accounts:

```
// data structure holding all created HealthIds
mapping(address => Account) public accounts;
```

but since ths data is stored unencrypted on the blockchian, it is freely readable by anybody
savvy enough to look this information up.  

Future iterations of the application will handle this problem through asymmetric
encryption, see the `README.md` for more details.

Finally, the `HealthId.sol` smart contract was analyzed for vulnerabilities using
[MythX](https://mythx.io/).
