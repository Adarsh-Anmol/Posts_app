import logo from '@/assets/logo.png';
import Link from 'next/link';
import Image from 'next/image'

export default function Header() {

  console.log(logo);
  return (
    <header id="main-header">
      <Link href="/">
        <Image
        src={logo} 
        width ={100} 
        height={100} 
        //sizes = '10vw'
        priority
        alt="Mobile phone with posts feed on it" 
        />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/feed">Feed</Link>
          </li>
          <li>
            <Link className='cta-link' href="/new-post">New Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
