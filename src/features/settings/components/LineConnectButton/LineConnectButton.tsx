"use client";

import { connectLineAccount } from "@/features/settings/actions/connectLineAccount";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { disconnectLineAccount } from "@/features/settings/actions/disconnectLineAccount";

export function LineConnectButton({
  isLineConnected,
  canDisconnectLine,
}: { isLineConnected: boolean; canDisconnectLine: boolean }) {
  const [, connectLineAccountAction, isConnectPending] = useActionState(
    connectLineAccount,
    undefined,
  );
  const [, disconnectLineAccountAction, isDisconnectPending] = useActionState(
    disconnectLineAccount,
    undefined,
  );

  return (
    <div className="flex items-center space-x-2">
      <form className="w-full" action={connectLineAccountAction}>
        <Button
          variant="outline"
          className={`flex-grow transition-all duration-200 ease-in-out w-full ${
            isLineConnected
              ? "bg-gray-100 text-gray-500 hover:bg-gray-200 border-gray-300"
              : "bg-white text-black hover:bg-[#06C755] hover:text-white hover:border-[#06C755]"
          } group`}
          disabled={isLineConnected || isConnectPending}
          aria-label={
            isLineConnected ? "LINEはすでに連携済みです" : "LINEと連携する"
          }
        >
          <Icons.line
            className={`w-5 h-5 mr-2 transition-all duration-200 ease-in-out ${
              isLineConnected
                ? "text-gray-500"
                : "text-[#06C755] group-hover:text-white"
            }`}
          />
          {isLineConnected ? "すでに連携済みです" : "LINEと連携する"}
        </Button>
      </form>
      {isLineConnected && canDisconnectLine && (
        <form action={disconnectLineAccountAction}>
          <Button
            variant="outline"
            size="sm"
            aria-label="LINE連携を解除する"
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            disabled={isDisconnectPending}
          >
            解除
          </Button>
        </form>
      )}
    </div>
  );
}
