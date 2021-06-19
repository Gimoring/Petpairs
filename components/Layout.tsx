import Head from 'next/head';

interface LayoutProps {
	children?: React.ReactNode;
	title?: string;
}

const Layout = ({ children, title = '' }: LayoutProps) => {
	return (
		<div className="container">
			<Head>
				<title>{title}</title>
			</Head>
			<header>헤더( 네비게이션 바 )</header>
			{children}
			<footer>푸터(발)</footer>
		</div>
	);
};
export default Layout;
