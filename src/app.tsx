import type { SettingDrawerProps, Settings as LayoutSettings } from '@ant-design/pro-layout'
import { PageLoading } from '@ant-design/pro-layout'
import type { RequestConfig, RunTimeLayoutConfig } from 'umi'
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent'
import Footer from '@/components/Footer'
// import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons'
import { isDev, requestConfig } from '@/config'
import antdDefaultSetting from '../config/antd.default.setting'

const { responseErrorHandler } = requestConfig
const loginPath = '/user/login'

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading tip="正在加载..."/>,
}

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>
  settingDrawer?: SettingDrawerProps
}> {
  const fetchUserInfo = async () => {
    // try {
    //   const currentUser = await queryCurrentUser();
    //   return currentUser;
    // } catch (error) {
    //   history.push(loginPath);
    // }
    return undefined;
  };
  const defaultResult = {
    fetchUserInfo,
    settings: {},
    // settingDrawer: {
    //   hideCopyButton: true,
    //   hideHintAlert: true
    // }
  }
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    Object.assign(defaultResult, { currentUser });
  }
  return defaultResult
}

/**
 * @see  https://procomponents.ant.design/components/layout
 * */
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent/>,
    disableContentMargin: false,
    waterMarkProps: {
      content: antdDefaultSetting.title || undefined,
    },
    footerRender: () => <Footer/>,
    onPageChange: () => {
      // const { location } = history;
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
    },
    links: isDev
      ? [
        <Link to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined/>
          <span>openAPI 文档</span>
        </Link>,
        <Link to="/~docs">
          <BookOutlined/>
          <span>业务组件文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-request
 * */
export const request: RequestConfig = {
  errorHandler: responseErrorHandler
}
