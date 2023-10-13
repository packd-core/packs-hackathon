"use client";

import { useState, useRef, useEffect } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { toast } from "react-toastify";
import { usePackMainPackCreatedEvent } from "../abi/generated";

const Greeting = () => {
  type Pack = {
    tokenId: bigint
    owner: string
  }
  const [packs, setPacks] = useState<Pack[]>([]);

  usePackMainPackCreatedEvent({
    listener: (logs) => {
      const mapped: Pack[] = logs.map((log) => ({
        tokenId: log.args.tokenId!,
        owner: log.args.owner!
      }))
        .filter((log) => log.owner && log.tokenId)

      setPacks((events) => [...events, ...mapped])
    }
  })


  const { openConnectModal } = useConnectModal();

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <p className="text-sm text-gray-500 text-center">
          Greeting from the blockchain:
        </p>
        <p className="text-2xl font-bold text-center">
          {packs.map((pack) => (
            <div key={pack.tokenId.toString()}>
              <div>TokenId: {pack.tokenId.toString()}</div>
              <div>Owner: {pack.owner}</div>
            </div>
          ))}
        </p>
      </div>
    </div>
  );
};

export { Greeting };
