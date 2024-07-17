import { createThirdwebClient } from "thirdweb";
//import { ThirdwebSDK } from "@thirdweb-dev/sdk";



const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;
const secretKey = process.env.THIRDWEB_SECRET_KEY;



if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});
