import { Hero } from '@/components/hero';
import { Work } from '@/components/work';
import { About } from '@/components/about';
import { Contact } from '@/components/contact';
export default function Home() {
  return <main id="main" className="container"><Hero /><Work /><About /><Contact /></main>;
}
