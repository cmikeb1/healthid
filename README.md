# HealthID

HealthID is a proof of concept for a blockchain-based health information sharing 
application, built for the ConsenSysAcademy's 2018 developer program.   
 
The premise of HealthID is that it would provide a way for a patient to publish critical
health information and make it available to providers without the need to include a trusted 
third party to facilitate the transfer.  The current implementation provides a way for
a patient to publish their name, birthdate, organ donor status and blood type.  It then
provides an interface where a provider could look up a patient's information.  In the future, 
this data could be expanded to include standard intake form data (demographics, allergies, 
conditions, ...) as well as providing one-off transfer of specific records.  This data
is stored directly on the blockchain, providing a storage mechanism that is extremely resistant
to downtime.

There are several limitations with this prototype, the most obvious being:

* **Data is stored directly on the blockchain** -  This is expensive, and also a bit unnecessary
as the data storage could be offloaded to a distributed file system such as IPFS or Swarm.  This
would allow the storage of more information, much cheaper, while still providing extremely 
high levels of redundancy/availability.  This model would also lends itself well to a model where
all this data is encrypted at rest, necessary for practical reasons as well as to satisfy HIPPA
requirements in the U.S. 

* **Data is stored unencrypted**

* **Data is not permissioned** - In the current state of the prototype, all published data is
directly accessible by an end user, assuming they know the public address of the account
creating it.  In future iterations, this can be avoided by using asymmetric encryption and
providing a way for patients to dictate certain users/provider who can decrypt their data. 
Such a system could be coded into a smart contract.


## Running HealthID

### Prerequisites

To run HealthID, the following are required:

* [NodeJS](https://nodejs.org/en/)
* [Truffle Suite](https://truffleframework.com/), globally installed
* [Ganache](https://truffleframework.com/ganache) (optional)


### Steps

#### Download Source Code

```
$ git clone https://github.com/cmikeb1/healthid.git
```

Let's call the directory you cloned the project into `<project_root>/`.  The `<project_root>/`
directory should contain this `README.md` and the `truffle-config.js`, along with other 
documentation files and project directories.


#### Compile Smart Contracts

With truffle installed, run the following command in `<project_root>/`:

```
$ truffle compile
``` 

This will compile the contracts stored in `<project_root>/contracts`, publishing
their build artifacts to `<project_root>/client/src/contracts` where they will
be consumed by web3 during app runtime.


#### Deploy to Local Testnet

In order to test & run the application locally, a local development chain is
required.  The `<project_root>/truffle-config.js` file is currently configured
to publish to ganache running locally on port `7545` **and** the `truffle develop` 
  testnet running on port `9545`.  Run both of these locally, or update
  `<project_root>/truffle-config.js` to publish to the local testnet of your choosing.
  
Once a testnet is running and with `<project_root>/truffle-config.js` configured to 
point to it, run the following command to deploy the smart contracts:

```
$ truffle migrate
```

#### Test

Once deployed locally, you can run unit tests on the smart contracts with the command:

```
$ truffle test
```

This will execute the tests defined in `<project_root>/test/healthid.js`, using the 
instances we just deployed to our local testnet.  


#### Run App

The application front-end is based on the [React Truffle Box](https://github.com/truffle-box/react-box).

You can run it locally by navigating to `<project_root>/client` and using the command:

```
$ npm run
```

This will install all necessary dependencies before firing up a local development 
server on port `30000`.  A browser window should automatically open, if not you 
can navigate directly to `localhost:30000` and use your web3 provider of choice to
interact with HealthID.


## Epics & User Stories

### User Definitions
* **App User** - The person actually using the app. 
* **Data Owner** - This is the person who is the subject of the data and can be 
  thought of as the **Patient**.  For the purposes of this project we assume 
  the **Data Owner** is always the **App User**, even though in practice this 
  will not always be the case, for instance:
	* Parent/guardian managing the data of one of their dependents
	* Someone who is legally allowed to manage the data of another person, such 
	  as caring for the disabled or elderly.
  In these scenarios it would be useful to abstract away the **App User** identity 
  from the **Data Owner** identity, but we’ll explicitly leave this out of the current 
  project and assume that the **Data Owner** is /always/ the **App User**.
* **Data Consumer** - The entity consuming the shared data. This is likely a 
  **Practitioner** or someone else involved in providing healthcare services to 
  the **Data Owner**.

### Other Definitions
* *Critical Data*
	* Stored on the blockchain
	* Rarely changes
	* High availability
	* Medium access frequency
	* Data needed to provide emergency care or to identify you within an external system: 
		* Blood type
		* Donor status
		* Name
		* Birthdate
		
		
### Epic: "On boarding"
* As an **App User**, I can authenticate with HealthID using a web3 provider.
* As an **App User**, I am free to switch between *Data Owner* and *Data Consumer* roles.

## Epic: "Critical Data Sharing"
As a **Data Owner**, I can share *critical data* with **Data Consumers** so that they can 
  reliably know my most critical health details.

### "Data Owner" Centric User Stories
* As a **Data Owner**, authenticating for the first time prompts me to set up my *critical data*.
	* These help surface critical information in the event of emergencies and also provide a way for 
	  providers to match this identity to existing records.
* As a **Data Owner** I can manage my *critical data* through a structured form 
  provided by HealthID. 


### "Data Consumer" Centric User Stories
* As a **Data Consumer**, I can view a specific *critical data* for a specific **Data Owner**, 
  identified by their public ethereum address.


## Future Epics

### "Encrypt All the Things"

Encryption at rest for all stored data.

### "Permissioning system"

Allow **Data Owners** to decide what **Data Consumers** can decrypt and view their data.


### "Common Data Sharing"
As a **Data Owner**, I can share *common data* with approved **Data Consumers** so 
  that they can get access to common demographic and intake-form data, reducing 
  patient check-in and on-boarding.


### "Snapshot Data Sharing"

As a **Data Owner** I can share arbitrary data files with approved **Data Consumers**, 
  allowing them to view or import this data into their apps or EMR.   These data files 
  generally represent a snapshot of a subset of the **Data Owners** medical record.  


### "Verified Data Consumers"

* Allow **Data Consumers** to be "verified" by a trusted third party.
* Give **Data Owners** the option to allow all "verified" **Data Consumers** access 
  to their critical data.


### "Authorization Requests"

* Allow **Data Consumers** to request access to critical data, common data or a 
  particular snapshot data instance.
* The **Data Consumer** would need to know the address/identity of the 
	**Data Owner** being requested
* The **Data Owner** would accept, reject or ignore a request


### "Multi-sig App Accounts"

* The end-user has multiple identities associated with a single HealthID account.  
* All **Data Owner** identities must participate to create new authorizations
* All **Data Consumer** identities must participate in order to decrypt (is this possible?)
* Could this be used to mitigate the possibility of the **Data Consumer** exposing their 
  private and releasing the contents of every authorization with them as the target?  
  Like they’d have to lose all their keys instead of just one?


### "Many **Data Owner** instances allowed per **App User**"
This facilitates the use case where an **App User** may be managing the data of one or 
more dependents.


### "Data Requests"
* Provide the ability for **Data Consumers** to define the information they require 
  from the **Data Owner**, then send the **Data Owner** a request for that information.
* This would likely end up as *snapshot data*, but could be supplementing *common data*.  


### "Self Destruct"
* For authorizations and accounts
* Does what it can to remove data, but no gaurentees


### "Data Adapters"
* Framework for an extensible set of data adapters which:
    * **Data Owners** Transform the data before it is shared
    * **Data Consumers** transform the data as it is read


### "Data Validators"
Validate snapshot data conforms to some standard (FHIR, HL7 v2, etc.)






