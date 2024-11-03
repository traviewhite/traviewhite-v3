import Link from 'next/link'
import { useRouter } from 'next/router'

import Tnav from 'components/Navigation/tNav'
import MoreMenu from 'components/Navigation/MoreMenu'
import { Props, P } from 'components/Navigation/Links'

const HeaderNav = ({ links }: Props) => {
  const router = useRouter()
  return (
    <header className='mx-auto pt-6 px-6 max-w-screen-sm'>
      <nav className='w-full mb-6 flex items-center font-semibold text-md tracking-tight'>
        <Tnav />
        <div className='hidden sm:block'>
          {links &&
            links.slice(0, 2).map((link: P) => (
              <Link key={link.label} href={link.href}>
                <p
                  className={`inline ml-3 transition ${
                    router.route === link.href
                      ? 'text-gray-800 dark:text-gray-50'
                      : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                  }`}
                >
                  {link.label}
                </p>
              </Link>
            ))}
        </div>
        <MoreMenu links={links} />
      </nav>
    </header>
  )
}

export default HeaderNav
