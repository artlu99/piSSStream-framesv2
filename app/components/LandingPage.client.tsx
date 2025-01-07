import sdk from "@farcaster/frame-sdk";
import { usePrivy } from "@privy-io/react-auth";
import { useLoginToFrame } from "@privy-io/react-auth/farcaster";
import { RiGithubLine } from "@remixicon/react";
import { useEffect } from "react";
import config from "~/config.json";
import useFrameSDK from "~/hooks/useFrameSDK";

interface Props {
  val?: number;
}
const LandingPage = ({ val = 69 }: Props) => {
  const { isSDKLoaded, context } = useFrameSDK();
  const { ready, authenticated, user } = usePrivy();
  const { initLoginToFrame, loginToFrame } = useLoginToFrame();

  // seamless Login to Frame with Privy. FYI this recipe only applies to this route
  useEffect(() => {
    if (ready && !authenticated) {
      const login = async () => {
        const { nonce } = await initLoginToFrame();
        const result = await sdk.actions.signIn({ nonce: nonce });
        await loginToFrame({
          message: result.message,
          signature: result.signature,
        });
      };
      login();
    }
  }, [authenticated, ready, initLoginToFrame, loginToFrame]);

  const name =
    user?.farcaster?.displayName ?? user?.farcaster?.username ?? "Fartcaster";

  return isSDKLoaded && ready ? (
    <div className="p-4">
      <article className="prose ">
        <h3 className="dark:text-slate-500">
          {context ? `Gm, ${name}!` : "pISSStream landing page"}
        </h3>

        <h1 className="dark:text-slate-100">🧑‍🚀🚽 {val}%</h1>
      </article>
      {context ? null : (
        <div className="my-8">
          <a href={config.githubUrl} target="_blank" rel="noreferrer">
            <RiGithubLine />
          </a>
        </div>
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default LandingPage;
