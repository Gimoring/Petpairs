import Head from 'next/head';
import styles from '../styles/layout.module.scss';
import Image from 'next/image';
import mainLogo from '../images/unknown.png';

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
            <header className={styles.header}>
                <Image src={mainLogo} alt="headerIMG" width={70} height={70} />
            </header>
            {children}
            <footer>푸터(발)</footer>
        </div>
    );
};
export default Layout;