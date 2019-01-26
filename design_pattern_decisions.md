# Design Pattern Decisions

Due to the simplistic nature of this application prototype and the fact that it doesn't deal 
directly with the transfer of cyrptocurrency, many of the design decisions
have been punted down to road to be dealt with as future features are added.  There are 
however a few interesting things happening in the currently:


### Circuit Breaker Pattern

As required by the assignment, the application contains a circuit-breaker machanism which
allows the creator of the contract to toggle an active/inactive state. When the contract
is in the inactive state, users may not create or update their HealthID.


### Library Consumption

As required by the assignment, the main smart contract consumes a library.  In this case the
library is titled `LibraryDemo.sol` and adds a method to do subtraction to all `uint` types
in the contract.


### Use of Function Modifiers

Serveral methods in the main smart contract are decorated with function modifiers.  The 
modifiers `stopInEmergency` and `isAdmin` are related to the circuit breaker implementation, 
while the `verifyAccountDoesNotExist` is used to ensure the end-user cannot create an account
once they have already defined their HealthID. 