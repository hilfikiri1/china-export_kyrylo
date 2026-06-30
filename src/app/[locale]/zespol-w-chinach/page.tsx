import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LegacyChinaRoute({ params }: Props) {
  const { locale } = await params;
  redirect(`/${locale}/dzialamy-w-chinach`);
}
