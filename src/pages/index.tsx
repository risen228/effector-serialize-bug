import { createStore, fork, serialize } from 'effector'
import { useUnit } from 'effector-react'
import { NextPageContext } from 'next'

const $cookie = createStore<string | null>(null, { serialize: 'ignore' })

export default function HomePage() {
  const cookie = useUnit($cookie)
  return <p>Cookie: {cookie}</p>
}

HomePage.getInitialProps = (context: NextPageContext) => {
  const scope = fork({
    values: [[$cookie, context.req?.headers.cookie ?? '']],
  })

  return { values: serialize(scope) }
}
