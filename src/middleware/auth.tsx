import { Redirect } from 'umi'
import type { FC } from 'react'
import { Fragment } from 'react'

const Auth: FC = (props) => {
  console.log(props)
  const isLogin = false
  // const { isLogin } = useAuth();
  if (isLogin) return <Fragment>{props.children}</Fragment>
  return <Redirect to="/"/>
}

export default Auth
