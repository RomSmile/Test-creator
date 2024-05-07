import { MainPage } from "@/forPages";

export default function Home({ params }) {
  return <MainPage pageNumber={params.page || 1} />;
}
