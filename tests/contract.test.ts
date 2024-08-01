import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { AllowedSeaDropUpdated } from "../generated/schema"
import { AllowedSeaDropUpdated as AllowedSeaDropUpdatedEvent } from "../generated/Contract/Contract"
import { handleAllowedSeaDropUpdated } from "../src/contract"
import { createAllowedSeaDropUpdatedEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let allowedSeaDrop = [
      Address.fromString("0x0000000000000000000000000000000000000001")
    ]
    let newAllowedSeaDropUpdatedEvent =
      createAllowedSeaDropUpdatedEvent(allowedSeaDrop)
    handleAllowedSeaDropUpdated(newAllowedSeaDropUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AllowedSeaDropUpdated created and stored", () => {
    assert.entityCount("AllowedSeaDropUpdated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AllowedSeaDropUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "allowedSeaDrop",
      "[0x0000000000000000000000000000000000000001]"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
