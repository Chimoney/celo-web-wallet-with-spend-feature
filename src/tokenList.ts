import { config } from 'src/config'
import { Color } from 'src/styles/Color'
import { Token } from 'src/tokens'
import { areAddressesEqual } from 'src/utils/addresses'

/**
 * For now, lists of known supported ERC-20 comaptible tokens
 * are listed here. This will be moved to a separate repo eventually.
 */
const ERC20_TOKENS: Record<number, Token[]> = {
  // Mainnet
  42220: [
    {
      id: 'mCUSD',
      symbol: 'mCUSD',
      name: 'Moola cUSD',
      color: Color.primaryGreen,
      minValue: 0.01,
      displayDecimals: 2,
      address: '0x64dEFa3544c695db8c535D289d843a189aa26b98',
      decimals: 18,
      chainId: 42220,
    },
    {
      id: 'mCELO',
      symbol: 'mCELO',
      name: 'Moola CELO',
      color: Color.primaryGold,
      minValue: 0.001,
      displayDecimals: 3,
      address: '0x7037F7296B2fc7908de7b57a89efaa8319f0C500',
      decimals: 18,
      chainId: 42220,
    },
    {
      id: 'mCEUR',
      symbol: 'mCEUR',
      name: 'Moola cEUR',
      color: Color.primaryGreen,
      minValue: 0.001,
      displayDecimals: 3,
      address: '0xa8d0E6799FF3Fd19c6459bf02689aE09c4d78Ba7',
      decimals: 18,
      chainId: 42220,
    },
    {
      id: 'MOO',
      symbol: 'MOO',
      name: 'Moola Governance Token',
      color: Color.accentBlue,
      minValue: 0.001,
      displayDecimals: 3,
      address: '0x17700282592D6917F6A73D0bF8AcCf4D578c131e',
      decimals: 18,
      chainId: 42220,
    },
    {
      id: 'cETH',
      symbol: 'cETH',
      name: 'Wrapped Ethereum',
      color: Color.accentBlue,
      minValue: 0.001,
      displayDecimals: 3,
      address: '0x2DEf4285787d58a2f811AF24755A8150622f4361',
      decimals: 18,
      chainId: 42220,
    },
    {
      id: 'cBTC',
      symbol: 'cBTC',
      name: 'Wrapped Bitcoin',
      color: '#f7921c',
      minValue: 0.001,
      displayDecimals: 3,
      address: '0xD629eb00dEced2a080B7EC630eF6aC117e614f1b',
      decimals: 18,
      chainId: 42220,
    },
    {
      id: 'pUSD',
      symbol: 'pUSD',
      name: 'Pesabase Dollar',
      color: Color.accentBlue,
      minValue: 0.001,
      displayDecimals: 3,
      address: '0x041954f3f34422af8d1f11fd743f3a1b70c30271',
      decimals: 18,
      chainId: 42220,
    },
    {
      id: 'UBE',
      symbol: 'UBE',
      name: 'Ubeswap',
      color: '#8878C3',
      minValue: 0.001,
      displayDecimals: 3,
      address: '0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC',
      decimals: 18,
      chainId: 42220,
    },
    {
      id: 'POOF',
      symbol: 'POOF',
      name: 'Poof Governance Token',
      color: '#7c71fc',
      minValue: 0.001,
      displayDecimals: 3,
      address: '0x00400FcbF0816bebB94654259de7273f4A05c762',
      decimals: 18,
      chainId: 42220,
    },
    {
      id: 'vPOOF',
      symbol: 'vPOOF',
      name: 'Poof Voucher',
      color: '#7c71fc',
      minValue: 0.001,
      displayDecimals: 3,
      address: '0xbA58308D1784e06615EdDEB7c7a2340d64acAAf3',
      decimals: 18,
      chainId: 42220,
    },
    {
      id: 'sCELO',
      symbol: 'sCELO',
      name: 'Savings CELO',
      color: Color.primaryGold,
      minValue: 0.001,
      displayDecimals: 3,
      address: '0x2879BFD5e7c4EF331384E908aaA3Bd3014b703fA',
      decimals: 18,
      chainId: 42220,
    },
    {
      id: 'cMCO2',
      symbol: 'cMCO2',
      name: 'Celo Moss Carbon Credit',
      color: Color.accentBlue,
      minValue: 0.001,
      displayDecimals: 3,
      address: '0x32A9FE697a32135BFd313a6Ac28792DaE4D9979d',
      decimals: 18,
      chainId: 42220,
    },
    {
      id: 'cXOF',
      symbol: 'cXOF',
      name: 'Duniapay West African CFA franc',
      color: Color.accentBlue,
      minValue: 0.001,
      displayDecimals: 3,
      address: '0x832F03bCeE999a577cb592948983E35C048B5Aa4',
      decimals: 18,
      chainId: 42220,
    },
    {
      id: 'NTMX',
      symbol: 'NTMX',
      name: 'NetM Token',
      color: Color.accentBlue,
      minValue: 0.001,
      displayDecimals: 3,
      address: '0x123ED050805E0998EBEf43671327139224218e50',
      decimals: 18,
      chainId: 42220,
    },
    {
      id: 'rCELO',
      symbol: 'rCELO',
      name: 'Rewards CELO',
      color: Color.primaryGold,
      minValue: 0.001,
      displayDecimals: 3,
      address: '0x1a8Dbe5958c597a744Ba51763AbEBD3355996c3e',
      decimals: 18,
      chainId: 42220,
    },
    {
      id: 'MZPN',
      symbol: 'MZPN',
      name: 'Marzipan Finance',
      color: Color.accentBlue,
      minValue: 0.001,
      displayDecimals: 3,
      address: '0x9Ee153D4Fdf0E3222eFD092c442ebB21DFd346AC',
      decimals: 18,
      chainId: 42220,
    },
    {
      id: 'KEY',
      symbol: 'KEY',
      name: 'Keykoin',
      color: Color.accentBlue,
      minValue: 0.001,
      displayDecimals: 3,
      address: '0x39d6477522eb543d750af82537325fb2930c1aa6',
      decimals: 18,
      chainId: 42220,
    },
  ],
  // Alfajores
  44787: [
    {
      id: 'vPOOF',
      symbol: 'vPOOF',
      name: 'Poof Voucher',
      color: '#7c71fc',
      minValue: 0.001,
      displayDecimals: 3,
      address: '0xbA58308D1784e06615EdDEB7c7a2340d64acAAf3',
      decimals: 18,
      chainId: 42220,
    },
  ],
}

export function getKnownErc20Tokens() {
  return ERC20_TOKENS[config.chainId]
}

export function findTokenByAddress(address: string) {
  return getKnownErc20Tokens().find((t) => areAddressesEqual(t.address, address))
}

export function findTokenById(id: string) {
  return getKnownErc20Tokens().find((t) => t.id === id)
}
