import Link from 'next/link'
import { useRouter } from 'next/router'
import { Props } from 'components/Links'

const HeaderNav: React.FC<Props> = ({ links }) => {
  const router = useRouter()

  return (
    <header className=''>
      <nav className='w-full mb-6 flex items-center font-bold text-lg tracking-tight'>
        <div className='hidden sm:block'>
          {links &&
            links.map((link) => (
              <Link key={link.label} href={link.href}>
                <a
                  className={`ml-3 transition ${
                    router.route === link.href
                      ? 'text-gray-800 dark:text-gray-50'
                      : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
        </div>
      </nav>
    </header>
  )
}

export default HeaderNav
