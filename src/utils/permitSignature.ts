import { signTypedData } from 'wagmi/actions';
import { Address, parseUnits } from 'viem';

export interface PermitSignature {
  deadline: bigint;
  v: number;
  r: `0x${string}`;
  s: `0x${string}`;
}

export const createPermitSignature = async (
  config: any,
  tokenAddress: Address,
  owner: Address,
  spender: Address,
  value: string,
  nonce: bigint,
  name: string,
  version: string,
  chainId: number
): Promise<PermitSignature> => {
  // 设置deadline为当前时间 + 1小时
  const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600);
  
  // 将value转换为bigint，假设confirmationFee已经是正确的单位
  const valueAmount = BigInt(value);
  
  // ERC2612 Permit的TypedData结构
  const domain = {
    name,
    version,
    chainId,
    verifyingContract: tokenAddress,
  };

  const types = {
    Permit: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  };

  const message = {
    owner,
    spender,
    value: valueAmount,
    nonce,
    deadline,
  };

  try {
    const signature = await signTypedData(config, {
      domain,
      types,
      primaryType: 'Permit',
      message,
    });

    // 解析签名
    const r = signature.slice(0, 66) as `0x${string}`;
    const s = `0x${signature.slice(66, 130)}` as `0x${string}`;
    const v = parseInt(signature.slice(130, 132), 16);

    return {
      deadline,
      v,
      r,
      s,
    };
  } catch (error) {
    console.error('Error creating permit signature:', error);
    throw error;
  }
};
