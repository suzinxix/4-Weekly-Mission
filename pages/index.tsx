import Link from "next/link";

function HomePage() {
  return (
    <div>
      Home 페이지
      <ul>
        <li>
          <Link href="folder">폴더 페이지 이동</Link>
        </li>
        <li>
          <Link href="shared">공유 페이지 이동</Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
