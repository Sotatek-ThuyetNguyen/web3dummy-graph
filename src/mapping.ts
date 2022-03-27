import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  Deposit,
  EmergencyWithdraw,
  OwnershipTransferred,
  Withdraw
} from "../generated/Contract/Contract"
import { Ahihi } from "../generated/schema"

export function handleDeposit(event: Deposit): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Ahihi.load(event.transaction.hash.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new Ahihi(event.transaction.from.toHex())
  }

  // entity.user = event.params.user
  entity.user = event.params.user.toHex();
  entity.amount = event.params.amount;
  entity.block = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.type = 'Deposit';

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.dd2(...)
  // - contract.dd2PerBlock(...)
  // - contract.getBlocks(...)
  // - contract.owner(...)
  // - contract.pendingDD2(...)
  // - contract.userInfo(...)
  // - contract.weth(...)
}

export function handleEmergencyWithdraw(event: EmergencyWithdraw): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleWithdraw(event: Withdraw): void {
  let entity = Ahihi.load(event.transaction.hash.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new Ahihi(event.transaction.from.toHex())
  }

  // entity.user = event.params.user
  entity.user = event.params.user.toHex();
  entity.amount = event.params.amount;
  entity.block = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.type = 'Withdraw';

  // Entities can be written to the store with `.save()`
  entity.save()
}
