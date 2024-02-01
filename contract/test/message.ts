import {
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import { ethers } from "hardhat";


  describe('Messaging', () => {
    const deployMessageContract = async () => {

        const msg = 'Manoah here' 
        const Message = await ethers.getContractFactory('MyMessage');
        const message = await Message.deploy(msg);

        return {message, msg};
    }

    describe('Deployment', () => {
        it('should confirm constructor variables', async () => {
            const {message, msg} = await loadFixture(deployMessageContract);
            expect(await message.message()).to.eq(msg);
        })
    })

    describe('setMessage function', () => {
        it('should set a new message', async () => {
            const {message} = await loadFixture(deployMessageContract);
            await message.setMessage("manoah is not joking");
            expect(await message.getMessage()).to.eq("manoah is not joking");
        })
    })
  })