import '../styles/globals.css';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import wrapper from '../store/configure';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};
export default wrapper.withRedux(MyApp);
