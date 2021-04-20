import HeaderNav from 'components/HeaderNav'
import BottomNav from 'components/BottomNav'
import links from 'components/Links'

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => (
  <>
    <main className='mx-auto pt-6 pb-16 px-6 max-w-screen-sm'>
      <HeaderNav links={links} />
      <div className=''>{children}</div>
    </main>
    <BottomNav links={links} />
  </>
)

export default Layout
