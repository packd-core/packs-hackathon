export default function formatAddress(address?: string | null) {
    if (!address) {
        return address;
    }
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
}
