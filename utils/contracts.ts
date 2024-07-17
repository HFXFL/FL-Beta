import { client } from "@/consts/client";
import { chain } from "@/consts/chain"
import { getContract } from "thirdweb";


const nftContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

export const contract = getContract({
    client: client,
    chain: chain, 
    address: nftContractAddress
})