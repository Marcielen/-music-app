import { useRouter } from "next/router";

export default function Genere() {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <h1>Post: {id}</h1>
    </>
  );
}
