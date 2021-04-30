import HeaderNav from 'components/Navigation/HeaderNav'
import links from 'components/Navigation/Links'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => (
  <>
    <main className='mx-auto pt-6 pb-16 px-6 max-w-screen-sm'>
      <HeaderNav links={links} />
      <div className=''>{children}</div>
    </main>
  </>
)

export default Layout
