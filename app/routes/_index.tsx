import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";
import LandingPage from "~/components/LandingPage.client";
import PrivyWrapper from "~/components/PrivyWrapper.client";
import SpaceZoom from "~/components/SpaceZoom.client";
import config from "~/config.json";
import { ogImageUrl } from "~/lib/og";
import { getPissStream } from "~/lib/redis";

export const meta: MetaFunction = () => {
  const { val = 42 } = useLoaderData<typeof loader>();

  const appUrl = config.appUrl;
  const { title, description, name } = config.meta;

  const frame = {
    version: "next",
    imageUrl:
      config.dynamicOgImages && val ? ogImageUrl(val) : `${appUrl}/splash.png`,
    button: {
      title: config.button.title,
      action: {
        type: "launch_frame",
        name: name,
        url: `${appUrl}/`,
        splashImageUrl: `${appUrl}/splash.png`,
        splashBackgroundColor: "#f7f7f7",
      },
    },
  };

  return [
    { title },
    { description },
    { "og:title": title },
    { "og:type": "website" },
    { "og:image": `${appUrl}/icon.png` },
    { "og:url": appUrl },
    { name: "fc:frame", content: JSON.stringify(frame) },
  ];
};

interface LoaderData {
  val?: number;
}
export async function loader({
  request,
  context,
}: LoaderFunctionArgs): Promise<LoaderData> {
  const val = await getPissStream(context.cloudflare.env);
  return { val };
}

export default function Index() {
  const { val } = useLoaderData<typeof loader>();

  return (
    <div className="w-[300px] mx-auto py-4 px-2">
      <ClientOnly fallback={<div>Loading...</div>}>
        {() => (
          <PrivyWrapper>
            <SpaceZoom>
              <LandingPage val={val} />
            </SpaceZoom>
          </PrivyWrapper>
        )}
      </ClientOnly>
    </div>
  );
}
